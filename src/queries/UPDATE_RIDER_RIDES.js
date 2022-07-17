import { gql } from '@apollo/client';

export const UPDATE_RIDER_RIDES = gql`
mutation MyMutation($riderid: uuid!, $riderrides: String!, $ridertrips: Int! ) {
    update_rider(where: {riderid: {_eq: $riderid}}, _set: {riderrides: $riderrides, ridertrips: $ridertrips}) {
      affected_rows
    }
  }
  `; 
  