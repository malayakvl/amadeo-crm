// import axios from 'axios';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export async function getProfile(email: string|null|undefined) {
    const res = await fetch(`${baseUrl}/profile?email=${email}`, {
        method: 'get',
        headers: { "Content-Type": "application/json" }
    });
    const resp = await res.json();
    if (res.ok && resp.user) {
        return resp.user;
    } else {
        return {}
    }
}

export async function updateProfile(data: any) {
    const res = await fetch(`${baseUrl}/profile`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
    const resp = await res.json();
    if (res.ok && resp.user) {
        return resp.user;
    } else {
        return {}
    }
}
