import React, { useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useRouter } from 'next/router';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
    orderFetchedSelector,
    orderFileNameFetchedSelector
} from '../../../redux/orders/selectors';
import { fetchOrderPdfAction } from '../../../redux/orders';
import { showLoaderAction } from '../../../redux/layouts/actions';
import { baseApiUrl } from '../../../constants';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Index() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const dispatch = useDispatch();
    const orderFetched: boolean = useSelector(orderFetchedSelector);
    const fileName: string = useSelector(orderFileNameFetchedSelector);

    const {
        query: { id }
    } = useRouter();

    console.log(fileName);

    useEffect(() => {
        dispatch(showLoaderAction(true));
        dispatch(fetchOrderPdfAction(id));
    }, []);

    useEffect(() => {
        if (orderFetched) {
            dispatch(showLoaderAction(false));
        }
    }, [orderFetched]);

    return (
        <>
            {orderFetched && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
                    <div style={{ height: '750px' }}>
                        <Viewer
                            fileUrl={`${baseApiUrl}${fileName}`}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </div>
                </Worker>
            )}
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
                ...require(`../../../messages/${locale}.json`)
            }
        }
    };
}
