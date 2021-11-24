import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import { useTranslations } from "next-intl";
import {useState} from "react";

interface Props {
    value: string|null,
    label: string|"text";
    type: string;
    name: string;
    register: any;
    errors: any;
}

function Address({userAddress} : {userAddress: any}) {
    const t = useTranslations();
    const [addressData] = useState(userAddress);

    const handleChangeProfile = (e:React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        addressData[target.name] = target.value;
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
        country_id: Yup.string()
            .required(t('Required field')),
        state: Yup.string()
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
    const formOptionsProfile = { resolver: yupResolver(validationSchemaProfile) };

    const { register, handleSubmit, formState } = useForm(formOptionsProfile);
    const { errors } = formState;

    const onSubmitAddress = () => {
    }

    return (
        <form className="lg:w-1/3 mt-5" onSubmit={handleSubmit(onSubmitAddress)}>
            <InputText
                value={addressData.country_id}
                label={'Country'}
                type={'text'} name={"country_id"}
                register={register}
                errors={errors}
            />

            <InputText
                value={addressData.state}
                label={'State'}
                type={'text'} name={"state"}
                register={register}
                errors={errors}
            />

            <InputText
                value={addressData.post_code}
                label={'Post Code'}
                type={'text'} name={"post_code"}
                register={register}
                errors={errors}
            />

            <div className="mb-4">
                <label htmlFor="email">{t('Address Type')}</label>
                <select
                    {...register('address_type')}
                    className="txt-input"
                    defaultValue=""
                >
                    <option value="home address">{t('home address')}</option>
                    <option value="email adderss">{t('email adderss')}</option>
                </select>
                <div className="error-el">{errors.address_type?.message}</div>
            </div>

            <InputText
                value={addressData.city}
                label={'City'}
                type={'text'} name={"city"}
                register={register}
                errors={errors}
            />

            <InputText
                value={addressData.address_line_1}
                label={'Address Line 1'}
                type={'text'} name={"address_line_1"}
                register={register}
                errors={errors}
            />

            <InputText
                value={addressData.address_line_2}
                label={'Address Line 2'}
                type={'text'} name={"address_line_2"}
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

export default Address;
