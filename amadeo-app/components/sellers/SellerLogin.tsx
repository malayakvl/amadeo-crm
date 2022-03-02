import React, { useEffect } from 'react';
import { toggleModalPopup } from '../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginFormSelector, selectedSellerSelector } from '../../redux/sellers/selectors';
import { showLoginFormAction } from '../../redux/sellers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputPassword } from '../_form';
import { signIn } from 'next-auth/client';
import { userSelector } from '../../redux/user/selectors';

const SellerLogin: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showLoginFormSelector);
    const selectedSeller = useSelector(selectedSellerSelector);
    const user = useSelector(userSelector);
    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-seller-login');
        }
    }, [dispatch, showModal]);

    const SubmitSchema = Yup.object().shape({
        password: Yup.number().required(t('Required field'))
    });

    return (
        <div className="modal modal-seller-login opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
            <div className="modal-container bg-white w-12/12 md:max-w-screen-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div
                    className="modal-content py-4 text-left px-6 overflow-auto"
                    style={{ maxHeight: '90vh' }}>
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{t('Input Password')}</p>
                        <div
                            className="modal-close cursor-pointer z-50"
                            role="presentation"
                            onClick={() => {
                                dispatch(showLoginFormAction(false));
                                toggleModalPopup('.modal-seller-login');
                            }}>
                            <img
                                src="/images/close-modal.svg"
                                className="fill-current text-black"
                                alt={''}
                            />
                        </div>
                    </div>

                    {/*Body*/}
                    <div>
                        <div className="flex">
                            <Formik
                                initialValues={{ password: '' }}
                                validationSchema={SubmitSchema}
                                onSubmit={(values, { resetForm }) => {
                                    signIn('credentials_seller_login', {
                                        email: user.email,
                                        seller_email: selectedSeller,
                                        password: values.password,
                                        callbackUrl: `${window.location.origin}/dashboard`
                                    });

                                    resetForm();
                                }}>
                                {(props) => {
                                    return (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="grid grid-cols-1">
                                                <InputPassword
                                                    style={null}
                                                    icon={'f-password'}
                                                    label={null}
                                                    name={'password'}
                                                    placeholder={'Password'}
                                                    props={props}
                                                />
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    className="cancel mr-2.5"
                                                    onClick={() => {
                                                        dispatch(showLoginFormAction(false));
                                                        toggleModalPopup('.modal-seller-login');
                                                        props.resetForm();
                                                    }}>
                                                    {t('Cancel')}
                                                </button>
                                                <button className="gradient-btn">
                                                    {t('Login')}
                                                </button>
                                            </div>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;
