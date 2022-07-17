import { gql } from '@apollo/client';

export const UPDATE_DRIVER_RATINGS = gql`
mutation MyMutation($driverid: uuid!, $driverrating: bigint!, $drivertrips: Int!, $driverentry: Int!) {
    update_driver(where: {driverid: {_eq: $driverid}}, _set: {driverrating: $driverrating, drivertrips: $drivertrips, driverentry: $driverentry}) {
      affected_rows
    }
  }
  `; 
  