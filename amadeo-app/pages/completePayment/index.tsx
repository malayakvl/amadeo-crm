import FullLayout from '../../components/layout/FullLayout';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { providers, signIn } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { checkPaymentStatusAction } from '../../redux/user';
import { paymentIntentSelector } from '../../redux/user/selectors';

// http://localhost:3000/completePayment?email=ddddd@1.com&payment_intent=pi_3KfWqYDBSh7ykoyW0jA6yT1L&payment_intent_client_secret=pi_3KfWqYDBSh7ykoyW0jA6yT1L_secret_fbAk6c8DHMCO0ZkbMyH7lBt2C&redirect_status=succeeded
export default function Signup({
    paymentIntentSecret,
    paymentIntent
}: {
    paymentIntentSecret: any;
    paymentIntent: any;
}) {
    const dispatch = useDispatch();
    const t = useTranslations();
    const { query } = useRouter();
    const stripePaymentIntent = useSelector(paymentIntentSelector);

    useEffect(() => {
        dispatch(checkPaymentStatusAction(paymentIntent, paymentIntentSecret));
    }, [paymentIntent]);

    useEffect(() => {
        if (stripePaymentIntent) {
            signIn('credentials_subscription_login', {
                email: stripePaymentIntent?.email,
                seller_email: stripePaymentIntent?.email,
                callbackUrl: `${window.location.origin}/dashboard`
            });
        }
    }, [stripePaymentIntent?.email]);

    return (
        <div className="flex justify-center">
            <div className="mt-10 rounded-lg bg-white w-96 p-10 pb-24">
                <div className="mb-8 font-bold text-3xl line-height-105percent">
                    {t('Payment Confirmation')}
                </div>
                <div className="error-el">{query.message}</div>
            </div>
        </div>
    );
}

Signup.Layout = FullLayout;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    // const session = await getSession({ req });
    const paymentIntentSecret = req.__NEXT_INIT_QUERY.payment_intent_client_secret
        ? req.__NEXT_INIT_QUERY.payment_intent_client_secret
        : null;
    const paymentIntent = req.__NEXT_INIT_QUERY.payment_intent
        ? req.__NEXT_INIT_QUERY.payment_intent
        : null;

    return {
        props: {
            providers: await providers(),
            locale: locale,
            paymentIntentSecret,
            paymentIntent,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
