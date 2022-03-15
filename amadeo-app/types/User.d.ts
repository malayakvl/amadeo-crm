declare namespace User {
    interface Root {
        user: User;
        hideRegisterFrom: boolean;
    }

    interface User {
        id: number;
        role_id: number;
        email: string;
        photo: string | null;
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
