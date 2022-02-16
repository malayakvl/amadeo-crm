import React from 'react';
import { getSession } from 'next-auth/client';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Index() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
            <div style={{ height: '750px' }}>
                <Viewer
                    fileUrl="/pdf-open-parameters.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </Worker>
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
