declare module User {
    interface Root {
        user: User;
    }

    interface User {
        id: number;
        role_id: number;
        email: string;
        first_name: string | null;
        last_name: string | null;
        company_name: string | null;
        full_address: string | null;
        identification_number: string | null;
        vat: string | null;
        phone: string | null;
        created_at: any;
        updated_at: any;
    }
}
