import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { InputText } from '../../components/_form';
import * as Yup from 'yup';
import { createShippingAction } from '../../redux/shipping/actions';
import { useDispatch } from 'react-redux';

export default function Shipping() {
    const t = useTranslations();
    const dispatch = useDispatch();

    const submitSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, t('Must be more characters'))
            .required(t('Required field')),
        logo: Yup.mixed()
            .required(t('Required field'))
    })

    return (
        <>
            <div className="mb-6 font-bold text-gray-350 text-lg border-gray-200">
                {t('Add new shipping method')}
            </div>

            <Formik
                enableReinitialize
                initialValues={{ name: '', logo: '' }}
                validationSchema={submitSchema}
                onSubmit={(values) => {
                    const formData = new FormData();

                    formData.append('logo', values.logo);
                    formData.append('name', values.name);
                    
                    dispatch(createShippingAction(formData))

                }}
                render={(props) => {
                    return (
                        <form onSubmit={props.handleSubmit} className="w-1/2 p-4 mt-10 bg-gray-100 rounded-lg shadow-inner mb-6">
                            <label className="text-xs text-blue-350 font-bold">
                                {t('Method name')}
                                <InputText
                                    style="mt-4 w-52"
                                    icon={''}
                                    label={null}
                                    name={'name'}
                                    placeholder={'Name'}
                                    props={props}
                                    tips={null}
                                />
                            </label>
                            <label className="block text-xs text-blue-350 font-bold">
                                <div>{t('Method image')}</div>
                                <input className="mt-4 w-52" name="logo" type="file" onChange={(event) => {
                                    props.setFieldValue("logo", event.currentTarget.files?.[0]);

                                }} />

                                {props.errors.hasOwnProperty('logo') &&
                                    <h2>
                                        <div className="error-el">{props.errors?.logo}</div>
                                    </h2>
                                }
                            </label>

                            <button className="mt-8 gradient-btn" type="submit">Create</button>
                        </form>
                    )
                }}
            />

        </>
    )
}