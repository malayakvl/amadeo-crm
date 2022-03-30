import React from 'react';
import FullLayout from '../../components/layout/FullLayout';
import getConfig from 'next/config';
import BuyerRegistration from '../../components/form/BuyerRegistration';
import SellerRegistration from '../../components/form/SellerRegistration';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

function Registration(invitation: any, locale: string) {
    let Form = <></>;

    if (invitation.role_id === 1) {
        Form = <BuyerRegistration email={invitation.email} locale={locale} />;
    }

    if (invitation.role_id === 2) {
        Form = <SellerRegistration email={invitation.email} />;
    }

    return <div className="flex justify-center">{Form}</div>;
}
Registration.Layout = FullLayout;

export default Registration;

export async function getServerSideProps(context: any) {
    const {
        query: { hash },
        locale
    } = context;
    const res = await fetch(`${baseUrl}/invitation/${hash}`);

    if (res.status !== 200) {
        return {
            redirect: { destination: '/' }
        };
    }

    const json = await res.json();

    if (!json.active) {
        return {
            locale,
            invitation: json,
            redirect: { destination: '/' }
        };
    }

    return {
        props: json
    };
}
