import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React, { useEffect, Fragment, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckIcon, BanIcon } from '@heroicons/react/solid';
import { showLoaderAction } from '../../redux/layouts/actions';
import { fetchFormAction } from '../../redux/paymentPlans';
import { useDispatch, useSelector } from 'react-redux';
import { itemsSelector } from '../../redux/paymentPlans/selectors';
import { parseTranslation } from '../../lib/functions';
import { submitFormAction } from '../../redux/paymentPlans/actions';
import ConfirmDialog from '../../components/_common/ConfirmDialog';

export default function Index({ session, locale }: { session: any; locale: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    const dispatch = useDispatch();
    const plans = useSelector(itemsSelector);

    const [selectedItem, setSelectedItem] = useState<any | null>();

    useEffect(() => {
        dispatch(showLoaderAction(true));
        dispatch(fetchFormAction());
    }, []);

    useEffect(() => {
        dispatch(showLoaderAction(false));
    }, [plans?.header?.length]);

    const changeStatus = (planId: number, optionId: number, optionName: any, status: boolean) => {
        setSelectedItem({ status: status, name: optionName, planId: planId, optionId: optionId });
        // dispatch(submitFormAction({ optionId: optionId, planId: planId }));
    };

    const parsePlanValues = (plans: any, optionId: number, optionName: string) => {
        return (
            <>
                {plans.map((option: any) => (
                    <td key={option.plan.id}>
                        <div
                            className="plan-status"
                            role="presentation"
                            onClick={() =>
                                changeStatus(option.plan.id, optionId, optionName, option.value)
                            }>
                            {option.value ? (
                                <CheckIcon width={20} height={20} />
                            ) : (
                                <BanIcon width={20} height={20} />
                            )}
                        </div>
                    </td>
                ))}
            </>
        );
    };

    const parseOptions = (data: any, locale: string) => {
        return (
            <>
                {data.map((data: any) => (
                    <Fragment key={data.option.id}>
                        <tr>
                            <td>{parseTranslation(data.option, 'name', locale)}</td>
                            {parsePlanValues(
                                data.values,
                                data.option.id,
                                parseTranslation(data.option, 'name', locale)
                            )}
                        </tr>
                    </Fragment>
                ))}
            </>
        );
    };

    const handlerConfirm = useCallback(() => {
        if (!selectedItem) return;

        dispatch(
            submitFormAction({ optionId: selectedItem.optionId, planId: selectedItem.planId })
        );
        setSelectedItem(null);
    }, [dispatch, selectedItem]);

    return (
        <>
            <Head>
                <title>Amadeo CRM - Payment Plans</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Payment Plans')}</h1>
                </div>
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
                {plans?.header.length > 0 && (
                    <div className="overflow-x-scroll">
                        <table className="w-full float-table">
                            <thead>
                                <tr>
                                    <th />
                                    {plans.header.map((header: any) => (
                                        <th key={header.id}>{header.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plans.values.map((values: any) => (
                                    <Fragment key={values.group.id}>
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="bg-gray-300"
                                                style={{ paddingLeft: '8px' }}>
                                                {parseTranslation(values.group, 'name', locale)}
                                            </td>
                                        </tr>
                                        {parseOptions(values.values, locale)}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ConfirmDialog
                show={!!selectedItem}
                text={t('Are you sure you want to {status} {name} method?', {
                    status: selectedItem?.status ? t('disable') : t('enable'),
                    name: selectedItem?.name
                })}
                titleConfirm={t('Yes')}
                titleCancel={t('Cancel')}
                onConfirm={handlerConfirm}
                onClose={() => setSelectedItem(null)}
            />
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
