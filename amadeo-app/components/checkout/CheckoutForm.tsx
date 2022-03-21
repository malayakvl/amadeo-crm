import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';
import { showLoaderAction } from '../../redux/layouts/actions';
import { useDispatch } from 'react-redux';

const CheckoutUnregisteredForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const t = useTranslations();
    const dispatch = useDispatch();

    const handleSubmitPayment = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        //
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        dispatch(showLoaderAction(true));
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/completePayment`
            }
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmitPayment}>
            <PaymentElement />
            <button disabled={!stripe} className="gradient-btn w-full mt-4">
                {t('Confirm Payment')}
            </button>
        </form>
    );
};

export default CheckoutUnregisteredForm;
// http://localhost:3000/complete?payment_intent=pi_3KfSI7DBSh7ykoyW1gVE9PYB&payment_intent_client_secret=pi_3KfSI7DBSh7ykoyW1gVE9PYB_secret_4TEHqYGEFBgtZhKMADW9cf3vn&redirect_status=succeeded
