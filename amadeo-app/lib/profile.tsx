// import axios from 'axios';
import getConfig from "next/config";
import { authHeader } from "./functions";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export async function getProfile(email: string|null|undefined) {
    const res = await fetch(`${baseUrl}/profile`, {
        method: 'get',
        headers: authHeader(email||'')
    });
    const resp = await res.json();
    if (res.ok && resp.user) {
        return resp;
    } else {
        return {}
    }
}
