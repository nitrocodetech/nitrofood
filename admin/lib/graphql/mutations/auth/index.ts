import { gql, useMutation } from "@apollo/client";

export const LOGIN = gql`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
    user {
      businessRegNo
      createdAt
      email
      emailVerified
      id
      name
      phone
      phoneVerified
      role
      updatedAt
    }
  }
}
`;
