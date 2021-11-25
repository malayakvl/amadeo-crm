declare module State {
  interface Root {
    router: Type.RouterRootState;
    addresses: Addresses;
  }

  type Addresses = Addresses.Root;
}
