import Head from 'next/head';
import { getSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, ListProducts, EditProduct, SyncProduct } from '../../components/inventory';
import { fetchAdditionalAction, importProductAction } from '../../redux/products/actions';
import { activeTabSelectorFactory } from '../../redux/layouts/selectors';
import { setSwitchHeaderAction } from '../../redux/layouts/actions';

export default function Index({ session, locale }: { session: any; locale: string }) {
    if (!session) return <></>;
    const t = useTranslations();
    const dispatch = useDispatch();
    const activeTabLayout = useSelector(activeTabSelectorFactory('inventory'));
    const hiddenFileInput = React.useRef(null);
    useEffect(() => {
        dispatch(fetchAdditionalAction());
        dispatch(setSwitchHeaderAction(null));
    }, []);

    const handleClick = () => {
        (hiddenFileInput as any).current.click();
    };

    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        const formData = new FormData();
        if (fileUploaded) {
            formData.append('file', fileUploaded);
        }
        dispatch(importProductAction(formData));
    };

    return (
        <>
            <Head>
                <title>Amadeo CRM - Inventory</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="block-white-8 mr-10 white-shadow-big">
                <div className="page-title">
                    <h1>{t('Inventory')}</h1>
                    <div className="md:float-right md:text-right">
                        <button className="mt-4 mb:0 btn-export" onClick={handleClick}>
                            <span>{t('upload_csv')}</span>
                        </button>
                        <input
                            type="file"
                            onChange={handleChange}
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                        />
                        <span className="block text-gray-350 text-base font-bold pb-2">
                            {t('Read rules and download csv template here')}
                        </span>
                    </div>
                    <div className="clear-both" />
                </div>
            </div>
            <div className="block-white-8 mr-10 white-shadow-medium mt-10">
                <div className="tabs-content">
                    <div className={`w-full ${activeTabLayout.tab !== 'products' ? 'hidden' : ''}`}>
                        <ListProducts locale={locale} />
                    </div>
                    <div
                        className={`w-full ${
                            !['add', 'edit'].includes(activeTabLayout.tab) ? 'hidden' : ''
                        }`}>
                        {activeTabLayout.tab === 'add' && <AddProduct locale={locale} />}
                        {activeTabLayout.tab === 'edit' && <EditProduct locale={locale} />}
                    </div>
                    <div className={`w-full ${activeTabLayout.tab !== 'sync' ? 'hidden' : ''}`}>
                        <SyncProduct />
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
