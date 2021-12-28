import Head from 'next/head';
import FullLayout from '../components/layout/FullLayout';
import { getSession } from 'next-auth/client';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Amadeo CRM</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
        </div>
    );
}
Home.Layout = FullLayout;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    } else {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}dashboard` }
        };
    }
}
