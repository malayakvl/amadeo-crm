declare namespace Profile {
    interface Root {
        profile: Profile;
        crudStatus: string | null;
        validEmail: string | null;
    }

    interface Profile {
        id: number;
        role_id: number;
        email: string;
        photo: string | null;
        first_name: string | null;
        last_name: string | null;
        company_name: string | null;
        identification_number: string | null;
        phone: string | null;
        address: Address;
        created_at: any;
        updated_at: any;
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
