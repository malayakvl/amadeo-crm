import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Filters, List } from '../../components/orders';

// import { showFormSelector } from '../../redux/chatbot/selectors';
// import { setEmptyFormAction, showFormAction } from '../../redux/chatbot';

export default function Index({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    // const dispatch = useDispatch();
    // const showForm = useSelector(showFormSelector);

    // const handleShowForm = () => {
    //     dispatch(setEmptyFormAction());
    //     dispatch(showFormAction(!showForm));
    // };

    return (
        <>
            <Head>
                <title>Amadeo CRM - Orders</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Orders')}</h1>
                </div>
                <div className="shadow-border relative mt-5">
                    <i className="info absolute left-3 top-3.5" />
                    <div
                        className="pl-5 inline-block"
                        dangerouslySetInnerHTML={{
                            __html: t('orders_descr')
                        }}
                    />
                </div>
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
                <Filters />
                <List />
            </div>
        </>
    );
}
export async function getServerSideProps(context: any) {
    const { locale } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

    return {
        props: {
            session,
            locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
