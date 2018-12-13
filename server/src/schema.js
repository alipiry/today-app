export default `
  type Task {
    id: ID!
    title: String!
    content: String!
  }
  type Query {
    tasks: [Task!]!
    task(title: String!): Task!
  }
  type Mutation {
    createTask(title: String!, content:String!): Task!
    updateTask(id: ID!, title: String!, content:String!): [Boolean!]!
    deleteTask(id: ID!): Boolean!
  }
`;
