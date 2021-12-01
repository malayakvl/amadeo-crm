import Header from '../header/Header';
import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction, setUserAction } from '../../redux/user';
import { userSelector } from '../../redux/user/selectors';

export default function Layout({ children }: { children: any }) {
    const [session] = useSession();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    useEffect(
        function () {
            if (session?.user && !window.localStorage.getItem('user')) {
                dispatch(fetchUserAction(session.user.email));
            } else {
                dispatch(setUserAction(JSON.parse(window.localStorage.getItem('user') || '{}')));
            }
        },
        [dispatch, session?.user]
    );

    useEffect(
        function () {
            if (Object.keys(user).length) {
                const storeUser = window.localStorage.getItem('user')
                    ? JSON.parse(window.localStorage.getItem('user') || '')
                    : {};
                if (storeUser.id !== user.id) {
                    window.localStorage.setItem('user', JSON.stringify(user));
                    console.log('Need setup storage');
                }
            }
        },
        [dispatch, user]
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <Header />
            <main className="flex items-center justify-center">{children}</main>
        </div>
    );
}
