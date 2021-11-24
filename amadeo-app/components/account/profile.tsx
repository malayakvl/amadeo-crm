import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useTranslations } from "next-intl";
import {useState} from "react";
import { alertService } from '../../services';
import { updateProfile } from "../../lib/profile";

interface Props {
    value: string|null,
    label: string|"text";
    type: string;
    name: string;
    register: any;
    errors: any;
}

function Profile({userData} : {userData: any}) {
    const t = useTranslations();
    const [profileData] = useState(userData);

    const handleChangeProfile = (e:React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        profileData[target.name] = target.value;
    }

    const InputText: React.FC<Props> = ({ value,label, type, name, register, errors } ) => {
        const t = useTranslations();

        return (
            <div className="mb-4">
                <label htmlFor="email">{t(label)}</label>
                <input
                    {...register(name)}
                    type={type}
                    id={name}
                    placeholder={t(label)}
                    className="txt-input"
                    onChange={handleChangeProfile}
                    defaultValue={value ? value : ''}
                />
                <div className="error-el">{errors[name]?.message}</div>
            </div>
        )
    }

    const validationSchemaProfile = Yup.object().shape({
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
    const formOptionsProfile = { resolver: yupResolver(validationSchemaProfile) };

    const { register, handleSubmit, formState } = useForm(formOptionsProfile);
    const { errors } = formState;

    const onSubmitProfile = () => {
        return updateProfile(profileData)
            .then(() => {
                alertService.success(t('Profile update successful'), { keepAfterRouteChange: true });
            })
            .catch((e) => {
                alertService.error(e.message, {});
            });
    }

    return (
        <form className="lg:w-1/3 mt-5" onSubmit={handleSubmit(onSubmitProfile)}>
            <InputText
                value={profileData.email}
                label={'Email Address'}
                type={'text'} name={"email"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.first_name}
                label={'Name'}
                type={'text'} name={"first_name"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.last_name}
                label={'Sername'}
                type={'text'} name={"last_name"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.company_name}
                label={'Company Name'}
                type={'text'} name={"company_name"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.full_address}
                label={'Full Address'}
                type={'text'} name={"full_address"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.identification_number}
                label={'Identificator Number'}
                type={'text'} name={"identification_number"}
                register={register}
                errors={errors}
            />

            <InputText
                value={profileData.vat}
                label={'Vat'}
                type={'text'} name={"vat"}
                register={register}
                errors={errors}
            />

            <InputText
                value={userData.phone}
                label={'Phone'}
                type={'text'} name={"phone"}
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
                    {t('Save Changes')}
                </button>
            </div>
        </form>
    )
}

export default Profile;
