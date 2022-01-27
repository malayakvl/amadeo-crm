import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { ChatbotForm, DefaultMessages, ListMessages } from '../../components/chatbot/index';
import { useSelector, useDispatch } from 'react-redux';
import { showFormSelector } from '../../redux/chatbot/selectors';
import { showFormAction } from '../../redux/chatbot';

export default function Index({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    const dispatch = useDispatch();
    const showForm = useSelector(showFormSelector);

    const handleShowForm = () => {
        dispatch(showFormAction(!showForm));
    };

    return (
        <>
            <Head>
                <title>Amadeo CRM - Chatbot</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Chatbot')}</h1>
                </div>
                <div className="shadow-border relative mt-5">
                    <i className="info absolute left-3 top-3.5" />
                    <div
                        className="pl-5 inline-block"
                        dangerouslySetInnerHTML={{
                            __html: t('how_to_use_cahtbot')
                        }}
                    />
                </div>
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
                <DefaultMessages />

                <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10 mt-10">
                    <h2 className="dark-blue-header w-full">
                        {t('User created Replies')}
                        <span className="text-gray-180 font-normal text-sm">
                            {' '}
                            (987,652 Results)
                        </span>
                        <div className="float-right text-right">
                            <button className="gradient-btn" onClick={() => handleShowForm()}>
                                <span>{t('Add a new Reply')}</span>
                            </button>
                        </div>
                    </h2>
                </div>

                {showForm && (
                    <div className="shadow-border">
                        <ChatbotForm />
                    </div>
                )}

                <ListMessages />
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