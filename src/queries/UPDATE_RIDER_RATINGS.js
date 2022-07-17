import { gql } from '@apollo/client';

export const UPDATE_RIDER_RATINGS = gql`
mutation MyMutation($riderid: uuid!, $riderrating: bigint!, $ridertrips: Int!) {
    update_rider(where: {riderid: {_eq: $riderid}}, _set: {riderrating: $riderrating, ridertrips: $ridertrips}) {
      affected_rows
    }
  }
  `; 
  