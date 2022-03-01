import { useTranslations } from 'next-intl';
import FullLayout from '../../components/layout/FullLayout';
import { Password as PasswordFormik } from '../../components/account';
import { getSession } from 'next-auth/client';
import Image from 'next/image';

export default function Password() {
    const t = useTranslations();

    return (
        <div className="flex justify-center">
            <div className="rounded-lg border shadow-xl mt-10 bg-white w-96 p-10 pb-16">
                <div className="flex">
                    <div className="font-bold text-3xl line-height-105percent mb-2">
                        Restore Password
                    </div>
                    <Image
                        className=""
                        width={64}
                        height={64}
                        src="/images/keys.svg"
                        layout="fixed"
                        alt=""
                    />
                </div>

                <div className="text-sm mb-10">{t('Please, type new password')}</div>

                <PasswordFormik />
            </div>
        </div>
    );
}

Password.Layout = FullLayout;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

    return {
        props: {
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
