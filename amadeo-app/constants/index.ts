// Each table pagination and controls meta stored to redux separately
import classNames from 'classnames';
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
        { titleKey: null, className: 'option-switcher' },
        { titleKey: null, className: 'inventory-color' },
        { titleKey: null, className: 'inventory-size' },
        { titleKey: null, className: 'inventory-qty' },
        { titleKey: 'Price', className: 'inventory-price' },
        // { titleKey: 'Options' },
        { titleKey: 'Actions', className: 'Actions' }
    ],
    [PaginationType.NOTIFICATIONS]: [],
    [PaginationType.SHIPPING]: [
        { className: 'shipping-dropdown' },
        { className: 'shipping-number' },
        { className: 'shipping-logo' },
        { titleKey: 'Shipping Method' },
        { className: 'option-switcher' },
        { className: 'shipping-countries' },
        {}
    ]
};
