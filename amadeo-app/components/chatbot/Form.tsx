import React from 'react';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { Formik } from 'formik';
import { InputText } from '../_form';
// import { useDispatch, useSelector } from 'react-redux';

function ChatbotForm({ formData }: { formData: any }) {
    const t = useTranslations();
    // const dispatch = useDispatch();

    const SubmitSchema = Yup.object().shape({
        name: Yup.string()
            .max(140, t('Must be less characters', { charNumber: 140 }))
            .required(t('Required field'))
    });
    return (
        <>
            <h2 className="dark-blue-header w-full pl-2">{t('Create a new reply')}</h2>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={SubmitSchema}
                onSubmit={(values) => {
                    console.log(values);
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
                                            style={{ width: 'calc(100% - 60px);' }}>
                                            <InputText
                                                icon={null}
                                                label={null}
                                                name={'trigger'}
                                                placeholder={'Missing Message'}
                                                style={null}
                                                props={props}
                                                tips={null}
                                            />
                                        </div>
                                    </div>
                                    <div className="clear-both mt-7">
                                        <i className="trans-en" />
                                        <div
                                            className="float-left ml-5 mb-5"
                                            style={{ width: 'calc(100% - 60px);' }}>
                                            <InputText
                                                icon={null}
                                                label={null}
                                                name={'trigger'}
                                                placeholder={'Missing Message'}
                                                style={null}
                                                props={props}
                                                tips={null}
                                            />
                                        </div>
                                    </div>
                                    <div className="float-right">
                                        <button type="button" className="cancel mr-4">
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
