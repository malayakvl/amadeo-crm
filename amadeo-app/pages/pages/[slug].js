import Head from 'next/head';
import { getAllPages, getPageData } from '../../lib/pages';
import fs from 'fs';
import path from 'path';
import FullLayout from '../../components/layout/FullLayout';

const postsDirectory = path.join(process.cwd(), '/pages/pages/data');

export default function Page({ pageData }) {
    return (
        <>
            <Head>
                <title>Amadeo CRM - Terms and Conditions</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
            <div className="flex justify-center">
                <div
                    className="container bg-white rounded-lg flex flex-wrap
                    pt-4 pb-10 m-auto mt-6 md:mt-15 lg:px-12 xl:px-16">
                    <div
                        className="w-full max-w-full"
                        dangerouslySetInnerHTML={{ __html: pageData[0].content }}
                    />
                </div>
            </div>
        </>
    );
}
Page.Layout = FullLayout;

export async function getStaticPaths() {
    const paths = await getAllPages();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const pageData = await getPageData(params.slug);
    const fullPath = path.join(postsDirectory, `${params.slug}.html`);
    pageData[0].content = fs.readFileSync(fullPath, 'utf8');
    return {
        props: {
            pageData
        }
    };
}
