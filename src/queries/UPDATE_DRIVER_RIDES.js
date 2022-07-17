import { gql } from '@apollo/client';

export const UPDATE_DRIVER_RIDES = gql`
mutation MyMutation($driverid: uuid!, $driverrides: String!, $drivertrips: Int! ) {
    update_driver(where: {driverid: {_eq: $driverid}}, _set: {driverrides: $driverrides, drivertrips: $drivertrips}) {
      affected_rows
    }
  }
  `; 
  