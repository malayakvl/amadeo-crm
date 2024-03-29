declare namespace State {
    interface Root {
        router: Type.RouterRootState;
        address: Address.Root;
        profile: Profile;
        user: User;
        notifications: Notifications;
        layouts: Layouts;
        products: Products;
        countries: Countries;
    }

    type Address = Address.Root;
    type Profile = Profile.Root;
    type User = User.Root;
    type Notifications = User.Notifications;
    type Layouts = Layouts.Root;
    type Products = Products.Root;
    type Countries = any;
}
