import { gql } from "@apollo/client";

export const GET_ZONES = gql`
  query GetZones {
    zones {
      id
      title
      description
      location
      createdAt
      updatedAt
    }
  }
`;
