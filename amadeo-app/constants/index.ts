// Each table pagination and controls meta stored to redux separately
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

export enum PaginationType {
    NOTIFICATIONS = 'notifications',
    PRODUCTS = 'products',
    SHIPPING = 'shipping'
}

export const TableHeaders: { [key in PaginationType]: Type.DataTableHeader[] } = {
    [PaginationType.PRODUCTS]: [
        { sortKey: 'photo', titleKey: 'Photo' },
        { sortKey: 'name', titleKey: 'Reference | Name | Description' },
        { titleKey: 'Options' },
        { titleKey: 'Actions', className: 'Actions' }
    ],
    [PaginationType.NOTIFICATIONS]: [],
    [PaginationType.SHIPPING]: [
        { sortKey: 'method', titleKey: 'Method' },
        { sortKey: 'price', titleKey: 'Price' },
        { titleKey: 'Enabled' },
        { titleKey: 'Actions', className: 'Actions' }
    ]
};
