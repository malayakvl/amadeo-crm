// eslint-disable-next-line no-unused-vars
declare module Addresses {
    // eslint-disable-next-line no-unused-vars
    interface Root {
        addresses: Address[];
        address: Address;
        crudStatus: string | null;
    }

    interface Address {
        id: number | null;
        user_id: number | null;
        country_id: number | null;
        state: string | null;
        post_code: string | null;
        address_type: string | null;
        city: string | null;
        address_line_1: string | null;
        address_line_2: string | null;
        created_at: any;
        updated_at: any;
    }
}
