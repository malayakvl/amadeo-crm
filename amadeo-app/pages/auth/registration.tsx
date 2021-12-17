import React from 'react';
import FullLayout from '../../components/layout/FullLayout';
import getConfig from 'next/config';
import BuyerRegistration from '../../components/form/BuyerRegistration';
import SellerRegistration from '../../components/form/SellerRegistration';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

function Registration(props: any) {
    let Form = <></>

    if (props.role_id === 1) {
        Form = <BuyerRegistration />

    }

    if (props.role_id === 2) {
        Form = <SellerRegistration />

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
    const json = await res.json();

    if (!json.active) {
        return {
            redirect: { destination: '/' }
        };
    }

    return {
        props: json
    };
}
