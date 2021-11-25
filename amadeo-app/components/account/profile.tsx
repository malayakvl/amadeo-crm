import * as Yup from 'yup';
import { useTranslations } from "next-intl";
import {useState} from "react";
import { alertService } from '../../services';
import { updateProfile } from "../../lib/profile";
import {Formik} from "formik";
import { InputText } from "../_form";

function Profile({userData} : {userData: any}) {
    const t = useTranslations();
    const [profileData] = useState(userData);

    const SubmitSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email'))
            .required(t('You must enter your email')),
        last_name: Yup.string()
            .required(t('You must enter your family name')),
        first_name: Yup.string()
            .required(t('You must enter your first name')),
        identification_number: Yup.string()
            .required(t('You must enter your tax-ID')),
        full_address: Yup.string()
            .required(t('You must enter your address')),
        phone: Yup.string()
            .required(t('You must enter your phone number')),
    });

    return (
        <Formik
            initialValues={profileData}
            validationSchema={SubmitSchema}
            onSubmit={values => {
                return updateProfile(values)
                    .then(() => {
                        alertService.success(t('Profile update successful'), { keepAfterRouteChange: true });
                    })
                    .catch((e) => {
                        alertService.error(e.message, {});
                    });
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit} className="lg:w-1/3 mt-5">
                    <InputText name={'email'} label={'Email Address'} props={props} />

                    <InputText name={'first_name'} label={'Name'} props={props} />

                    <InputText name={'last_name'} label={'Sername'} props={props} />

                    <InputText name={'company_name'} label={'Company Name'} props={props} />

                    <InputText name={'full_address'} label={'Full Address'} props={props} />

                    <InputText name={'identification_number'} label={'Identificator Number'} props={props} />

                    <InputText name={'vat'} label={'Vat'} props={props} />

                    <InputText name={'phone'} label={'Phone'} props={props} />

                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            )}
        </Formik>

    )
}

export default Profile;
