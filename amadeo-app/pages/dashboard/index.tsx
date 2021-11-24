import Head from 'next/head'
import { getSession } from 'next-auth/client'
// import Link from 'next/link'

export default function Index({session} : {session:any}) {
    if (!session) return <></>

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <Head>
                <title>Amadeo CRM - Dashboard</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

        </div>
    )
}

export async function getServerSideProps(context:any) {
    const { locale } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` },
        };
    }

    return {
        props: {
            session,
            locale,
            messages: {
                ...require(`../../messages/auth/${locale}.json`),
            },
        }
    }
}
