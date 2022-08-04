import { IsNumber, IsObject, IsString, MinLength } from 'class-validator';

export namespace CustomerDto {
  class Location {
    @IsNumber()
    lat: number;
    @IsNumber()
    lng: number;
  }

  export class CreateCustomer {
    @IsString()
    @MinLength(3)
    fullName: string;

    @IsObject()
    currentLocation: Location;

    @IsNumber()
    numberOfRides: number;

    @IsNumber()
    rating: number;
  }

  export class UpdateCustomer {
    @IsNumber()
    id: number;

    @IsString()
    @MinLength(3)
    fullName: string;

    @IsObject()
    currentLocation: Location;

    @IsNumber()
    numberOfRides: number;

    @IsNumber()
    rating: number;
  }

  export class DeleteCustomer {
    @IsNumber({}, { each: true })
    customerIds: number[];
  }
}
