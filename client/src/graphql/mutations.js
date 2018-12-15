import gql from 'graphql-tag';

export const addTask = gql`
mutation createTask($title: String!, $content: String!) {
  createTask(title: $title, content: $content) {
    id
    title
    content
  }
}
`;

export const updateTask = gql`
mutation updateTask($id: ID!, $title: String!, $content: String!) {
  updateTask(id: $id, title: $title, content: $content)
}
`;

export const removeTask = gql`
mutation deleteTask($id: ID!) {
  deleteTask(id: $id)
}
`;