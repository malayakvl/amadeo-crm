interface Shipping {
    countries: Array<{ id: number; price: number }>;
    id: number;
    name: string;
    image: string;
    status: boolean;
}
