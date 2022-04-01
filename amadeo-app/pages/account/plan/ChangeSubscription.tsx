import React, { useEffect, useState } from 'react';
import { toggleModalPopup } from '../../../lib/functions';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    clientSecretSelector,
    showChangeSubscriptionSelector,
    userSubscriptionSelector
} from '../../../redux/user/selectors';
import { showChangeSubscriptionFormAction } from '../../../redux/user';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import getConfig from 'next/config';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../../../components/checkout';
const { publicRuntimeConfig } = getConfig();
const stripeKey = publicRuntimeConfig.stripeKey;

const stripePromise = loadStripe(stripeKey);

const ChangeSubscription: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const showModal = useSelector(showChangeSubscriptionSelector);
    const stripeClientSecret = useSelector(clientSecretSelector);
    const subscription = useSelector(userSubscriptionSelector);

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (showModal) {
            toggleModalPopup('.modal-seller-change-subscription');
        }
    }, [dispatch, showModal]);

    useEffect(() => {
        if (subscription) {
            setClientSecret(stripeClientSecret);
        }
    }, [subscription]);

    const appearance: any = {
        theme: 'stripe',
        fontFamily: 'Montserrat',
        borderRadius: '8px',
        colorText: '#ccc'
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance
    };

    return (
        <div className="modal modal-seller-change-subscription opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
            <div className="modal-container bg-white w-12/12 md:max-w-screen-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div
                    className="modal-content py-4 text-left px-6 overflow-auto"
                    style={{ maxHeight: '90vh' }}>
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{t('Change Plan')}</p>
                        <div
                            className="modal-close cursor-pointer z-50"
                            role="presentation"
                            onClick={() => {
                                dispatch(showChangeSubscriptionFormAction(false));
                                toggleModalPopup('.modal-seller-change-subscription');
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
                            <div className="flex justify-center">
                                {clientSecret !== '' && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeSubscription;
