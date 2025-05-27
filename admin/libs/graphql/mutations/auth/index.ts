import { gql, useMutation } from "@apollo/client";

export const LOGIN = gql`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
    user {
      bussinessRegNo
      createdAt
      email
      emailVerified
      id
      name
      password
      phone
      phoneVerified
      refreshToken
      role
      updatedAt
    }
  }
}
`;
