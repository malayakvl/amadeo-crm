import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { TogglePassword } from "../../components/_form";
import { Formik } from "formik";
import { getSession } from "next-auth/client";
import { LockClosedIcon } from "@heroicons/react/solid";
import { crudStatusSelector } from "../../redux/profile/selectors";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { alertService } from "../../services";
import { setCrudStatusAction, changePasswordAction } from "../../redux/profile";

export default function ChangePassword({session} : {session:any}) {
    const t = useTranslations();
    const dispatch = useDispatch();
    const crudStatus = useSelector(crudStatusSelector);

    useEffect(() => {
        if (crudStatus === 'yes') {
            alertService.success(t('Password change successful'), { keepAfterRouteChange: true });
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
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], t('Passwords must match'))
    });
    return (
        <div className="container bg-white rounded-lg
                    pt-4 pb-10 m-auto mt-6 md:mt-15 lg:px-12 xl:px-16">
            <div
                className="px-4 py-4 border-b lg:py-6 lg:pl-5 dark:border-primary-darker">
                <h1 className="text-2xl">
                    <LockClosedIcon className="h-10 text-black" />
                    <span className="ml-3">{t('Change Password')}</span>
                </h1>
            </div>
            <div className="flex flex-col sm:flex-row">
                <Formik
                    enableReinitialize
                    initialValues={{}}
                    validationSchema={SubmitSchema}
                    onSubmit={values => {
                        dispatch(changePasswordAction(values, session.user.email));
                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} className="lg:w-1/3 mt-5">
                            {/*<TogglePassword name={'old_password'} label={'Current Password'} props={props}  />*/}

                            <TogglePassword name={'password'} label={'New Password'} props={props}  />

                            <TogglePassword name={'password_confirmation'} label={'Confirm Password'} props={props} />

                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-indigo-500 rounded-md
                                            hover:bg-indigo-600
                                            focus:outline-none duration-100 ease-in-out"
                            >
                                {t('Submit')}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export async function getServerSideProps(context:any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` },
        };
    }

    return {
        props: {
            session: session,
            locale: locale,
            messages: {
                ...require(`../../messages/auth/${locale}.json`),
                ...require(`../../messages/account/${locale}.json`),
                ...require(`../../messages/shared/${locale}.json`),
                ...require(`../../messages/errors/${locale}.json`),
            },
        },
    };
}
