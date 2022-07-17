import { gql } from '@apollo/client';

export const INSERT_DRIVER = gql`
mutation Driver($drivermobileno: bigint!, $drivername: String!, $drivervehical: String!, $password: String!) {
    insert_driver(objects: {drivermobileno: $drivermobileno, drivername: $drivername, password: $password, drivervehical: $drivervehical}) {
      affected_rows
    }
  }`;

