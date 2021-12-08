import { getSession } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { restorePasswordAction, setValidEmailStatusAction } from '../../redux/profile';
import { InputText } from '../../components/_form';
import { useDispatch, useSelector } from 'react-redux';
import { validEmailSelector } from '../../redux/profile/selectors';
import { useEffect } from 'react';
import { alertService } from '../../services';
import FullLayout from '../../components/layout/FullLayout';

function Restore({ locale }: { locale: string }) {
    const t = useTranslations();
    const dispatch = useDispatch();
    const validEmail = useSelector(validEmailSelector);

    useEffect(() => {
        if (validEmail === 'yes') {
            alertService.success(t(`Check your email`), { keepAfterRouteChange: true });
        } else if (validEmail && validEmail !== 'yes') {
            alertService.error(t(`No registered email`), { keepAfterRouteChange: true });
        }
        dispatch(setValidEmailStatusAction(null));
    }, [dispatch, locale, validEmail, t]);

    const SubmitSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email')).required(t('Required field'))
    });

    return (
        <div className="flex justify-center min-h-screen">
            <div className="container sm:mt-10 mt-10 my-auto max-w-md rounded-lg p-3 bg-white">
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        {t('Restore Password')}
                    </h1>
                </div>
                <div className="w-full">
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={SubmitSchema}
                        onSubmit={(values) => {
                            dispatch(restorePasswordAction(values));
                        }}>
                        {(props) => (
                            <form onSubmit={props.handleSubmit} className="mt-5 mb-10">
                                <InputText name={'email'} label={'Email Address'} props={props} />

                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out">
                                    {t('Send Email')}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
Restore.Layout = FullLayout;

export default Restore;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : locale}` }
        };
    }
    return {
        props: {
            locale: locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
