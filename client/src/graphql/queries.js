import gql from 'graphql-tag';

export const getTasks = gql`
query {
  tasks {
    id
    title
    content
  }
}
`;

