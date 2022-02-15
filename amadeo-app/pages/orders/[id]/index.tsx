import React from 'react';
import Invoice from '../../../components/orders/reports/Invoice';
import invoice from '../../../components/orders/data/invoice';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { getSession } from 'next-auth/client';
import PDFViewer from 'pdf-viewer-reactjs';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export default function Index() {
    return (
        // <Document>
        //     <Page size="A4" style={styles.page}>
        //         <Invoice invoice={invoice} />
        //     </Page>
        // </Document>
        <PDFViewer
            document={{
                url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
            }}
        />
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
