interface Shipping {
    countries: Array<{ id: number; price: number; iso: string }>;
    id: number;
    name: string;
    image: string;
    status: boolean;
}

interface ShippingMethod {
    id: number;
    name: string;
    price: number;
    image: string;
    status: boolean;
}
