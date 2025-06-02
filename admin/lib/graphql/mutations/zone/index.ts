import { gql } from "@apollo/client";

export const CREATE_ZONE = gql`
  mutation CreateZone($createZoneInput: CreateZoneInput!) {
    createZone(createZoneInput: $createZoneInput) {
      id
      title
      description
      location
      createdAt
      updatedAt
    }
  }
`;
