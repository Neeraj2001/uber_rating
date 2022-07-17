import { gql } from '@apollo/client';

export const GET_RIDER_DETAILS = gql`
query get_rider_details {
    rider(order_by: {riderrating: desc, ridertrips: asc}) {
      ridername
      riderid
      ridermobileno
      riderrating
      ridertrips
      riderrides
    }
  }`;
