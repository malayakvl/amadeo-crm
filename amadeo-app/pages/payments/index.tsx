import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { userSelector } from '../../redux/user/selectors';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import {
    PaymentInfo,
    PaymentMethods,
    ListTransactions,
    Filters,
    FilterValues
} from '../../components/payments';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { PaginationType } from '../../constants';

export default function Payments({ session }: { session: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    // const dispatch = useDispatch();
    const user = useSelector(userSelector);

    const [filterOpen, setFilterOpen] = useState(false);
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.PAYMENTS)
    );

    const handleHideFilter = useCallback(() => {
        setFilterOpen(false);
    }, []);

    return (
        <>
            <Head>
                <title>Amadeo CRM - Payments</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <PaymentInfo />
            </div>

            <div className="block-white-8 white-shadow-medium mt-8">
                <div className="md:flex">
                    {user.role_id === 2 && (
                        <div className="mb-4 md:mb-0 w-80 p-4 bg-gray-100 rounded-lg shadow-inner">
                            <div className="font-bold text-gray-350 text-lg pb-4">
                                {t('Payment Methods')}
                            </div>
                            <PaymentMethods />
                        </div>
                    )}

                    <div className="md:ml-8 md:flex-1">
                        <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10 relative">
                            {/*{t('Transactions')}*/}
                            <h2 className="dark-blue-header">{t('Transactions')}</h2>

                            <FilterValues />

                            <Filters handleHideFilter={handleHideFilter} filterOpen={filterOpen} />
                            <button
                                onClick={() => {
                                    // if (filterOpen) {
                                    //     dispatch(showDateSelectorAction(false));
                                    // }
                                    setFilterOpen(!filterOpen);
                                }}
                                className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                                <Image width={16} height={16} src={'/images/filter.svg'} />
                                <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                                <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                                    {filters.payment_id.length +
                                        !!filters.created_at.length +
                                        filters.seller_id.length +
                                        !!filters.total_amount.length +
                                        !!filters.order_number.length +
                                        !!filters.created_at.length}
                                </div>
                            </button>
                        </div>

                        {/* <FilterValues /> */}

                        <ListTransactions />
                    </div>
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
