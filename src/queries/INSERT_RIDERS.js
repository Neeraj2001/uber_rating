import { gql } from '@apollo/client';

export const INSERT_RIDER = gql`
mutation MyMutation($password: String!, $ridername: String!, $ridermobileno: bigint!) {
    insert_rider(objects: {password: $password, ridermobileno: $ridermobileno, ridername: $ridername}) {
      affected_rows
    }
  }
  `;

