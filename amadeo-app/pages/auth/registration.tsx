import React from 'react';
import FullLayout from '../../components/layout/FullLayout';
import getConfig from 'next/config';
import BuyerRegistration from '../../components/form/BuyerRegistration';
import SellerRegistration from '../../components/form/SellerRegistration';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

function Registration(invitation: any) {
    let Form = <></>

    if (invitation.role_id === 1) {
        Form = <BuyerRegistration email={invitation.email}/>

    }

    if (invitation.role_id === 2) {
        Form = <SellerRegistration email={invitation.email} />

    }

    return (
        <div className="flex justify-center">
            {Form}
        </div>
    )
}
Registration.Layout = FullLayout;

export default Registration;

export async function getServerSideProps(context: any) {
    const { hash } = context.query;
    const res = await fetch(`${baseUrl}/invitation/${hash}`);

    if (res.status !== 200) {
        return {
            redirect: { destination: '/' }
        };

    }

    const json = await res.json();

    if (!json.active) {
        return {
            invitation: json,
            redirect: { destination: '/' }
        };
    }

    return {
        props: json
    };
}
