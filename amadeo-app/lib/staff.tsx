import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

export async function getCountries() {
    const res = await fetch(`${baseUrl}/countries`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });
    const resp = await res.json();
    if (res.ok && resp.countries) {
        return resp.countries;
    } else {
        return {};
    }
}
