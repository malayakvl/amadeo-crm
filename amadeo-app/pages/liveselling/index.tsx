import Head from 'next/head';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { List } from '../../components/liveselling';
import { accountService } from '../../_services';
import SchedulePopup from '../../components/liveselling/SchedulePopup';
import { showPopupAction } from '../../redux/livesessions';
import { useDispatch } from 'react-redux';
import { fetchScenariosAction } from '../../redux/livesessions';

export default function Index({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    const dispatch = useDispatch();

    const fbSync = () => {
        accountService.syncFB();
    };
    useEffect(() => {
        dispatch(fetchScenariosAction());
    }, []);

    return (
        <>
            <Head>
                <title>Amadeo CRM - Liveselling</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1 className="float-left">{t('Live Selling')}</h1>
                    <div className="float-left text-right">
                        <button className="btn-sync-fb" onClick={() => fbSync()}>
                            <span>{t('Sync account')}</span>
                        </button>
                    </div>
                    <div className="clear-both" />
                </div>
                <div className="block">
                    <div className="w-full bg-white">
                        <div className="md:flex justify-between">
                            <span className="text-blue-400 underline text-base max-w-[800px]">
                                <Link href={'/guides/liveselling'}>{t('liveselling_descr')}</Link>
                            </span>
                            <button
                                className="btn-big md:ml-4 mt-4 md:mt-0"
                                onClick={() => dispatch(showPopupAction(true))}>
                                {t('Schedule new session')}
                            </button>
                        </div>
                    </div>
                    <div className="clear-both" />
                </div>
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
                <List />
            </div>
            <SchedulePopup />
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
