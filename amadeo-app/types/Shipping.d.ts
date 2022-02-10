interface Shipping {
    countries: Array<{ id: number; price: number; iso: string }>;
    id: number;
    name: string;
    image: string;
    status: boolean;
}
