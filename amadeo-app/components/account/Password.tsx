import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { TogglePassword } from '../_form';
import { Formik } from 'formik';
import { getSession } from 'next-auth/client';
import { crudStatusSelector } from '../../redux/profile/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { alertService } from '../../services';
import { setCrudStatusAction, changePasswordAction } from '../../redux/profile';

export default function Password({ session }: { session: any }) {
    const t = useTranslations();
    const dispatch = useDispatch();
    const crudStatus = useSelector(crudStatusSelector);

    useEffect(() => {
        if (crudStatus === 'yes') {
            alertService.success(t('Data update successful'), { keepAfterRouteChange: true });
        } else if (crudStatus && crudStatus !== 'yes') {
            alertService.error(crudStatus, {});
        }
        dispatch(setCrudStatusAction(null));
    }, [dispatch, crudStatus, t]);

    const SubmitSchema = Yup.object().shape({
        // old_password: Yup.string()
        //     .required(t('Required field')),
        password: Yup.string()
            .required(t('Required field'))
            .min(3, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('Passwords must match')
        )
    });
    return (
        <Formik
            enableReinitialize
            initialValues={{}}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                dispatch(changePasswordAction(values, session.user.email));
            }}>
            {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-5">
                    {/*<TogglePassword name={'old_password'} label={'Current Password'} props={props}  />*/}

                    <TogglePassword
                        label={null}
                        icon={'f-key'}
                        name={'password'}
                        placeholder={'New Password'}
                        style={'lg:w-1/4'}
                        props={props}
                    />

                    <TogglePassword
                        label={null}
                        icon={'f-key'}
                        name={'password_confirmation'}
                        placeholder={'Confirm Password'}
                        style={'lg:w-1/4'}
                        props={props}
                    />
                    <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
                    <button type="submit" className="gradient-btn">
                        {t('Save')}
                    </button>
                </form>
            )}
        </Formik>
    );
}

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

    return {
        props: {
            session: session,
            locale: locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
