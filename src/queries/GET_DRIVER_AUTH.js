import { gql } from '@apollo/client';

export const GET_DRIVER_AUTH= gql`
query get_driver_auth {
    driver {
      drivername
      password
      driverid
    }
  }`;
  