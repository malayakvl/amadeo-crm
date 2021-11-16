import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { providers, getSession } from "next-auth/client";
import LangSwitcher from "../../components/lang/switcher";
import { useTranslations } from "next-intl";
import ProviderBtns from '../../components/auth/ProviderBtns';
import { userService, alertService } from '../../services';

interface Props {
    label: string|"text";
    type: string;
    name: string;
    register: any;
    errors: any;
}
const InputText: React.FC<Props> = ({ label, type, name, register, errors } ) => {
    const t = useTranslations();

    return (
        <div className="mb-4">
            <label htmlFor="email">{t(label)}</label>
            <input
                {...register(name)}
                type={type}
                name={name}
                id={name}
                placeholder={t(label)}
                className="txt-input"
            />
            <div className="error-el">{errors[name]?.message}</div>
        </div>
    )
}

export default function Registration({providers} : {providers:any}) {
    const t = useTranslations();

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email'))
            .required(t('Required field')),
        last_name: Yup.string()
            .required(t('Required field')),
        first_name: Yup.string()
            .required(t('Required field')),
        password: Yup.string()
            .required(t('Required field'))
            .min(6, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], t('Passwords must match'))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (user:any) => {
        return userService.register(user)
            .then(() => {
                alertService.success('Success', { keepAfterRouteChange: true });
                // router.push('login');
            })
            .catch(e => {
                console.log(123)
                alertService.error(e.message, {})
            });
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
                <LangSwitcher />
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">{t('Sign Up')}</h1>
                </div>
                <div className="m-6">
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <InputText
                            label={'Email Address'}
                            type={'text'} name={"email"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Name'}
                            type={'text'} name={"first_name"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Sername'}
                            type={'text'} name={"last_name"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Company Name'}
                            type={'text'} name={"company"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Identificator Number'}
                            type={'text'} name={"identification_number"}
                            register={register}
                            errors={errors}
                        />

                        <div className="mb-6">
                            <label htmlFor="email">Vat</label>
                            <input
                                type="email"
                                name="email" id="email"
                                placeholder="Your email address"
                                className="txt-input"
                            />
                        </div>

                        <InputText
                            label={'Full Address'}
                            type={'text'} name={"address"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Phone'}
                            type={'text'} name={"phone"}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Password'}
                            type={'password'} name={"password"}
                            register={register}
                            errors={errors}
                        />
                        <InputText
                            label={'Confirm Password'}
                            type={'password'} name={"password_confirmation"}
                            register={register}
                            errors={errors}
                        />

                        <div className="mb-6">
                            <button
                                className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                                disabled={formState.isSubmitting}
                            >
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
                                Registration
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center mb-8">
                        <span className="absolute bg-white px-4 text-gray-500">or sign-up with</span>
                        <div className="w-full bg-gray-200 mt-3 h-px" />
                    </div>

                    <ProviderBtns Providers={providers} />

                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context:any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }

    return {
        props: {
            providers: await providers(),
            locale: locale,
            messages: {
                ...require(`../../messages/auth/${locale}.json`),
                ...require(`../../messages/errors/${locale}.json`),
            },
        },
    };
}
