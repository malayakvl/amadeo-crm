import React from 'react';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { Formik } from 'formik';
import { InputText, InputTextarea } from '../_form';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector } from '../../redux/chatbot/selectors';
import { setEmptyFormAction, showFormAction } from '../../redux/chatbot';
import { submitFormAction } from '../../redux/chatbot/actions';

function ChatbotForm() {
    const t = useTranslations();
    const dispatch = useDispatch();
    const item = useSelector(itemSelector);

    const SubmitSchema = Yup.object().shape({
        name: Yup.string()
            .max(140, t('Must be less characters', { charNumber: 140 }))
            .required(t('Required field')),
        trigger: Yup.string().required(t('Required field')),
        description_fr: Yup.string().required(t('Required field')),
        description_en: Yup.string().required(t('Required field'))
    });
    return (
        <>
            <h2 className="dark-blue-header w-full pl-2">{t('Create a new reply')}</h2>
            <Formik
                enableReinitialize
                initialValues={item}
                validationSchema={SubmitSchema}
                onSubmit={(values) => {
                    const formData = new FormData();
                    Object.keys(values).forEach((key: string) => {
                        formData.append(key, (values as any)[key]);
                    });
                    dispatch(submitFormAction(formData, values.id));
                }}>
                {(props) => {
                    return (
                        <form onSubmit={props.handleSubmit} className="mt-5">
                            <div className="w-full pl-2 pr-2">
                                <div>
                                    <InputText
                                        icon={null}
                                        label={'Product Name'}
                                        name={'name'}
                                        placeholder={'Product Name'}
                                        style={null}
                                        props={props}
                                        tips={t('count_characters', { charNumber: 140 })}
                                    />

                                    <InputText
                                        icon={null}
                                        label={'Trigger Words'}
                                        name={'trigger'}
                                        placeholder={'Trigger Words'}
                                        style={null}
                                        props={props}
                                        tips={t('count_characters', { charNumber: 140 })}
                                    />

                                    <div className="clear-both mt-7">
                                        <i className="trans-fr" />
                                        <div
                                            className="float-left ml-5 mb-5"
                                            style={{ width: 'calc(100% - 60px)' }}>
                                            <InputTextarea
                                                icon={null}
                                                label={null}
                                                name={'description_fr'}
                                                placeholder={'Missing Message'}
                                                style={null}
                                                props={props}
                                            />
                                        </div>
                                    </div>
                                    <div className="clear-both mt-7">
                                        <i className="trans-en" />
                                        <div
                                            className="float-left ml-5 mb-5"
                                            style={{ width: 'calc(100% - 60px)' }}>
                                            <InputTextarea
                                                icon={null}
                                                label={null}
                                                name={'description_en'}
                                                placeholder={'Missing Message'}
                                                style={null}
                                                props={props}
                                            />
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        <button
                                            type="button"
                                            className="cancel mr-4"
                                            onClick={() => {
                                                dispatch(setEmptyFormAction());
                                                dispatch(showFormAction(false));
                                            }}>
                                            {t('Cancel')}
                                        </button>
                                        <button type="submit" className="gradient-btn">
                                            {t('Save')}
                                        </button>
                                    </div>
                                    <div className="clear-both" />
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
}

export default ChatbotForm;
