import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "../../../components/_form";
import { fetchShippingAction } from "../../../redux/shipping/actions";
import { shippingSelector } from "../../../redux/shipping/selectors";
import { updateShippingAction } from '../../../redux/shipping/actions';
import { deleteShippingAction } from '../../../redux/shipping/actions';
import * as Yup from 'yup';
import Image from 'next/image';
import { baseApiUrl } from '../../../constants';

export default function EditMethod() {
    //Hooks conts
    const t = useTranslations();
    const router = useRouter();
    const dispatch = useDispatch();
    const shipping = useSelector(shippingSelector);

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
    })

    useEffect(() => {
        dispatch(fetchShippingAction(id))

    }, [id]);

    return (
        <>
            {shipping &&
                <div className="page-title">
                    <h1>{t('Edit Shipping Method')}</h1>
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
                            <form onSubmit={props.handleSubmit} className="w-1/2 p-4 mt-10 bg-gray-100 rounded-lg shadow-inner mb-6">
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

                                <button className="mt-8 gradient-btn mr-4" type="submit">{t('Save')}</button>

                            </form>
                        }
                    />
                    <button onClick={deleteCallback} className="mt-8 gradient-btn">{t('Delete')}</button>

                </div>

            }

        </>
    )
}