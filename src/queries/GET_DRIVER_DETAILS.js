import { gql } from '@apollo/client';

export const GET_DRIVER_DETAILS = gql`
query get_driver_details {
    driver(order_by: {driverrating: desc, drivertrips: asc}) {
      drivername
      driverid
      drivermobileno
      driverrating
      drivertrips
      driverentry
      drivervehical
      driverrides
    }
  }`;
  