declare namespace User {
    interface Root {
        user: User;
        hideRegisterFrom: boolean;
        subscription: any;
        clientSecret: string;
        paymentIntent: any;
        showChangeSubscription: boolean;
    }

    interface User {
        id: number;
        role_id: number;
        subscription_expired: boolean;
        email: string;
        photo: string | null;
        first_name: string | null;
        last_name: string | null;
        company_name: string | null;
        full_address: string | null;
        identification_number: string | null;
        subscription_id: string | null;
        vat: string | null;
        phone: string | null;
        status: string | null;
        created_at: any;
        updated_at: any;
        plan_id: number | null;
    }
}
