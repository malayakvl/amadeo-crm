import { Formik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import {TogglePassword} from '../_form/TogglePassword';
import InputTextDisabled from '../_form/InputTextDisabled';

export default function SellerRegistration() {
    const t = useTranslations();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Must be a valid2 email'))
            .required(t('You must enter your email')),
        terms: Yup.boolean().oneOf([true], t('Confirm terms')),
        password: Yup.string()
            .required(t('Required field'))
            .min(3, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('Passwords must match')
        )
    });

    const onSubmit = (values: any) => {
        console.log(values)
    };

    return (
        <div className="mt-10 rounded-lg border shadow-xl bg-white w-96 p-10 pb-10">
            <div className="flex items-center mb-4">
                <div className="mr-2.5 font-bold text-3xl line-height-105percent w-60">Your email has been verified!</div>
                <Image
                    src="/images/tick.svg"
                    width="52"
                    height="40"
                    layout="fixed"
                />
            </div>


            <Formik
                enableReinitialize
                initialValues={{}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(props) => (
                    <form>
                        <InputTextDisabled name="email" icon="f-email" value="email@email.com" />

                        <div className="mt-8 mb-5 font-xs text-sm text-blue-350">
                            Please create a Password
                            </div>

                        <TogglePassword
                            icon={'f-key'}
                            style={null}
                            label={null}
                            name={'password'}
                            placeholder={'Password'}
                            props={props}
                        />
                        <TogglePassword
                            icon={'f-key'}
                            style={null}
                            label={null}
                            name={'confirm_parssword'}
                            placeholder={'Confirm password'}
                            props={props}
                        />
                        <div className="border-t pt-9">
                            <button type="submit" className="uppercase pt-9 gradient-btn w-full">
                                continue
                                </button>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    );

}
