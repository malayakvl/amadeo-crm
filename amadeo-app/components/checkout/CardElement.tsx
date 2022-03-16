import React, { useMemo } from 'react';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from '@stripe/react-stripe-js';

const useOptions = () => {
    const fontSize = '14px';
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: '#424770',
                    letterSpacing: '0.025em',
                    fontFamily: 'Source Code Pro, monospace',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#9e2146'
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const CardElement = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // const payload = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardNumberElement)
        // });
        console.log('[PaymentMethod]', elements.getElement(CardNumberElement));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
                Card number
                <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event: any) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
                Expiration date
                <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event: any) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
                CVC
                <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log('CardNumberElement [ready]');
                    }}
                    onChange={(event: any) => {
                        console.log('CardNumberElement [change]', event);
                    }}
                    onBlur={() => {
                        console.log('CardNumberElement [blur]');
                    }}
                    onFocus={() => {
                        console.log('CardNumberElement [focus]');
                    }}
                />
            </label>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CardElement;
