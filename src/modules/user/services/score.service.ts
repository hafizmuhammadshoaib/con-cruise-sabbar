import { Injectable } from '@nestjs/common';
import { Customer, Driver } from '../entities';

@Injectable()
export class ScoreService {
  public calculateScore(customer: Customer, driver: Driver) {
    const MAX_SCORE = 14; // max score  driver and customer relation can achieve in a matrix
    const distance = this.getDistanceFromLatLonInKm(
      customer.locationLatitude,
      customer.locationLongitude,
      driver.locationLatitude,
      driver.locationLongitude,
    );
    const distancePoints = this.getPointsByDistance(distance);
    const ratingPoints = this.getPointsByRating(customer.rating, driver.rating);
    const numberOfRides = this.getPointsByNumberOfRides(
      customer.numberOfRides,
      driver.numberOfRides,
    );
    return distancePoints + ratingPoints + numberOfRides - MAX_SCORE;
  }

  public getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  public deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  public getPointsByDistance(distance: number) {
    if (distance <= 3) {
      return 7;
    }
    if (distance <= 5) {
      return 3;
    }
    return 0;
  }

  public getPointsByRating(customerRating: number, driverRating: number) {
    if (customerRating >= driverRating) {
      return 2;
    }
    return 0;
  }

  public getPointsByNumberOfRides(customersRide: number, driversRide: number) {
    if (customersRide <= 2 && driversRide >= 3) {
      return 5;
    }
    if (customersRide > 2 && driversRide < 3) {
      return 2;
    }
    return 0;
  }
}
