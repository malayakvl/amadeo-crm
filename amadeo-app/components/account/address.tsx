import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from "next-intl";
import { addAddress } from "../../lib/profile";
import { alertService } from "../../services";
import { addressSelector } from "../../redux/addresses/selectors";
import { InputText, InputSelect } from "../_form";

interface CountryProps {
    id: number,
    code: string,
    name: string;
    translations: any;
}


function Address({email, countriesData, locale} : {email:string, userAddress:any, countriesData:CountryProps[], locale:string}) {
    const t = useTranslations();
    const addressData = useSelector(addressSelector);

    const SubmitSchema = Yup.object().shape({
        country_id: Yup.string()
            .required(t('Required field')),
        post_code: Yup.string()
            .required(t('Required field')),
        address_type: Yup.string()
            .required(t('Required field')),
        city: Yup.string()
            .required(t('Required field')),
        address_line_1: Yup.string()
            .required(t('Required field')),
    });

    const addressTypeData = [
        {id: 'home address', name: t('home address')},
        {id: 'email adderss', name: t('email adderss')},
    ]

    return (
        <Formik
            enableReinitialize
            initialValues={addressData}
            validationSchema={SubmitSchema}
            onSubmit={values => {
                console.log(values);
                return addAddress(values, email)
                    .then(() => {
                        alertService.success(t('Address add successful'), { keepAfterRouteChange: true });
                    })
                    .catch((e) => {
                        alertService.error(e.message, {});
                    });
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit} className="lg:w-1/3 mt-5">
                    <InputSelect locale={locale} name={'country_id'}
                         label={'Country'} options={countriesData} props={props} />

                    <InputText name={'state'} label={'State'} props={props} />

                    <InputText name={'post_code'} label={'Post Code'} props={props} />

                    <InputSelect locale={locale} name={'address_type'}
                         label={'Address Type'} options={addressTypeData} props={props} />

                    <InputText name={'city'} label={'City'} props={props} />

                    <InputText name={'address_line_1'} label={'Address Line 1'} props={props} />

                    <InputText name={'address_line_2'} label={'Address Line 2'} props={props} />

                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="ml-4 px-4 py-2 text-white bg-gray-200 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default Address;
