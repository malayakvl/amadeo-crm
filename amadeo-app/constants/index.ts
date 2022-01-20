// Each table pagination and controls meta stored to redux separately
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export const baseApiUrl = publicRuntimeConfig.apiUrl;

export enum PaginationType {
    NOTIFICATIONS = 'notifications',
    PRODUCTS = 'products',
    CHATBOT = 'chatbot'
}

export const TableHeaders: { [key in PaginationType]: Type.DataTableHeader[] } = {
    [PaginationType.PRODUCTS]: [
        { sortKey: 'photo', titleKey: 'Photo' },
        { sortKey: 'name', titleKey: 'Reference | Name | Description' },
        { titleKey: null, className: 'option-switcher' },
        { titleKey: null, className: 'inventory-color' },
        { titleKey: null, className: 'inventory-size' },
        { titleKey: null, className: 'inventory-qty' },
        { titleKey: 'Price', className: 'inventory-price' },
        { titleKey: 'Actions', className: 'Actions' }
    ],
    [PaginationType.NOTIFICATIONS]: [],
    [PaginationType.CHATBOT]: [
        { titleKey: null, className: '' },
        { titleKey: null, className: 'option-switcher' },
        { sortKey: 'scenario', titleKey: 'Scenario', iconClass: 'scenario' },
        { titleKey: 'Trigger', iconClass: 'message' },
        { titleKey: null, iconClass: 'eye', className: 'chat-eye' }
    ]
};
