declare namespace State {
    interface Root {
        router: Type.RouterRootState;
        address: Address.Root;
        profile: Profile;
        user: User;
        notifications: Notifications;
        layouts: Layouts;
        products: Products;
        chatbot: Chatbot;
        countries: Countries;
        shippings: Shippings;
        livesessions: Livesessions;
    }

    type Address = Address.Root;
    type Profile = Profile.Root;
    type User = User.Root;
    type Notifications = User.Notifications;
    type Layouts = Layouts.Root;
    type Products = Products.Root;
    type Chatbot = Chatbot.Root;
    type Countries = any;
    type Shippings = Array<Shipping>;
    type Livesessions = Livesessions.Root;
}
