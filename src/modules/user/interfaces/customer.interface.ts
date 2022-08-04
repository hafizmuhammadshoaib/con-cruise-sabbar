export interface CreateCustomerParams {
  name: string;
  currentLocation: { lat: number; lng: number };
  numberOfRides: number;
  rating: number;
}

export interface UpdateCustomerParams {
  id: number;
  name: string;
  currentLocation: { lat: number; lng: number };
  numberOfRides: number;
  rating: number;
}

export interface DeleteCustomerParams {
  customerIds: number[];
}
