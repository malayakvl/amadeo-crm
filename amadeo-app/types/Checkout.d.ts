declare namespace Checkout {
    interface Root {
        order: Orders.DataItem;
        address: Profile.Address;
        shippingMethods: ShippingMethod[];
        isFetched: boolean;
        loading: boolean;
    }
}
