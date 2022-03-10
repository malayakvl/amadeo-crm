import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { List } from '../../components/waitingList';

export default function Index({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();

    return (
        <>
            <Head>
                <title>Amadeo CRM - Waiting List</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Waiting List')}</h1>
                </div>
                <div
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                        __html: t('waiting_descr')
                    }}
                />
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
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
