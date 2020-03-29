import gql from "graphql-tag";

export const CREATE_ACCOUNT = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(
            data: {
                name: $name,
                email: $email,
                password: $password
            }
        ) {
            token
            user {
                id
                name
                email
                password
            }
        }
    }
`;