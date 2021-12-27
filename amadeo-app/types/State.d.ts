declare namespace State {
    interface Root {
        router: Type.RouterRootState;
        address: Addresses.Address;
        profile: Profile;
        user: User;
        notifications: Notifications;
        layouts: Layouts;
        products: Products;
    }

    type Addresses = Addresses.Root;
    type Profile = Profile.Root;
    type User = User.Root;
    type Notifications = User.Notifications;
    type Layouts = Layouts.Root;
    type Products = Products.Root;
}
