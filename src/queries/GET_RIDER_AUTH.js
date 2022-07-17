import { gql } from '@apollo/client';

export const GET_RIDER_AUTH = gql`
query get_rider_auth {
    rider {
      ridername
      password
      riderid
    }
  }`;
