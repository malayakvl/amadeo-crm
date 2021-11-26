import Header from "../header/Header";
// import {useSession} from "next-auth/client";

export default function Layout({ children } : {children:any}) {
    // const [session] = useSession();
    // if (typeof window !== "undefined") {
    //     console.log("SESSION", session);
    //     console.log("Local storage", localStorage.getItem('user'));
    // }
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <Header />
            <main className="flex items-center justify-center">
                    {children}
            </main>
        </div>
    )
}
