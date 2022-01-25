import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "../../../components/_form";
import { fetchShippingAction } from "../../../redux/shipping/actions";
import { shippingSelector } from "../../../redux/shipping/selectors";
import { updateShippingAction } from '../../../redux/shipping/actions';
import { deleteShippingAction } from '../../../redux/shipping/actions';
import * as Yup from 'yup';
import Image from 'next/image';
import { baseApiUrl } from '../../../constants';
import Country from "../../../components/shipping/Country";

export default function EditMethod() {
    //Hooks conts
    const t = useTranslations();
    const router = useRouter();
    const dispatch = useDispatch();
    const shipping = useSelector(shippingSelector);
    const [countries, setCountries] = useState([{price: 100}, {price: 50}, {price: 80}, {price: 1230}])

    const id = router.query.id;
    const deleteCallback = () => {
        let sure = confirm(t('Are you sure ?'))

        if (sure) {
            dispatch(deleteShippingAction(id)).then(router.push('/shipping/list'))

        }
    };
    const submitSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, t('Must be more characters'))
            .required(t('Required field')),
    });

    useEffect(() => {
        dispatch(fetchShippingAction(id))

    }, [id]);

    return (
        <>
            <div className="page-title">
                <h1 >{t('Edit Shipping Method')}</h1>
            </div>
            <div className="flex mt-10">
                {shipping &&
                    <Formik
                        enableReinitialize
                        initialValues={{ name: shipping.name, logo: '' }}
                        validationSchema={submitSchema}
                        onSubmit={(values) => {
                            const formData = new FormData();

                            formData.append('logo', values.logo);
                            formData.append('name', values.name);

                            dispatch(updateShippingAction(id, formData))

                        }}
                        render={(props) =>
                            <form onSubmit={props.handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-inner mb-6">
                                <label className="text-xs text-blue-350 font-bold">
                                    {t('Method name')}
                                    <InputText
                                        style="mt-4 w-52"
                                        icon={null}
                                        label={null}
                                        name={'name'}
                                        placeholder={'Method Name'}
                                        props={props}
                                        tips={null}
                                    />
                                </label>
                                <label className="block text-xs text-blue-350 font-bold">
                                    <div>{t('Method image')}</div>
                                    <div className="mt-4">
                                        <Image src={`${baseApiUrl}/${shipping.image}`} width={60} height={60} />
                                    </div>
                                    <input className="mt-4 w-52" name="logo" type="file" onChange={(event) => {
                                        props.setFieldValue("logo", event.currentTarget.files?.[0]);

                                    }} />

                                    {props.errors.hasOwnProperty('logo') &&
                                        <h2>
                                            <div className="error-el">{props.errors?.logo}</div>
                                        </h2>
                                    }

                                </label>

                                <button className="mt-8 gradient-btn w-full" type="submit">{t('Save')}</button>

                                <div onClick={deleteCallback} className="cursor-pointer mt-1 gradient-btn">{t('Delete')}</div>

                            </form>
                        }
                    />
                }

                <div className="ml-8 w-full p-4 bg-gray-100 rounded-lg shadow-inner">
                    <div className="mb-4 font-bold text-gray-350 text-lg py-4 border-b border-gray-200">
                        {t('Apply Countries')}
                    </div>

                    <div className="mb-2">
                        {countries.map((item, listIndex) =>
                            <Country
                                country={item}
                                deleteCallback={() => {
                                    const array = countries.filter((item, index) => index !== listIndex )
                                    setCountries(array)
                                }}
                            />)
                        }
                    </div>

                    <button onClick={() => setCountries([...countries, {}])} className="gradient-btn">{t('Add')}</button>
                </div>
            </div>

        </>
    )
}