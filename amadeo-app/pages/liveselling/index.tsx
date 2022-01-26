import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Filters } from '../../components/liveselling';
import { accountService } from '../../_services';
// import { useDispatch } from 'react-redux';

export default function Index({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    // const dispatch = useDispatch();

    const fbSync = () => {
        accountService.syncFB();
    };

    return (
        <>
            <Head>
                <title>Amadeo CRM - Chatbot</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Live Selling')}</h1>
                    <div className="float-right text-right">
                        {/*<div*/}
                        {/*    className="fb-login-button"*/}
                        {/*    data-width=""*/}
                        {/*    data-size="large"*/}
                        {/*    data-button-type="continue_with"*/}
                        {/*    data-layout="default"*/}
                        {/*    data-auto-logout-link="false"*/}
                        {/*    data-use-continue-as="false" />*/}
                        <button className="btn-sync-fb" onClick={() => fbSync()}>
                            <span>{t('Sync account')}</span>
                        </button>
                    </div>
                    <div className="clear-both" />
                </div>
                <div className="block">{<Filters />}</div>
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
                <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10 mt-10">
                    <h2 className="dark-blue-header w-full">
                        {t('Live sessions')}
                        <span className="text-gray-180 font-normal text-sm">
                            {' '}
                            (987,652 Results)
                        </span>
                    </h2>
                </div>
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
