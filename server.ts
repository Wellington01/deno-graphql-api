import { Application } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import UserRepository from "./repositories/user.ts";

const userRepository = new UserRepository();
const app = new Application();

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    id: ID!
  }
  input UserInput {
    name: String!
    email: String!
  }
  type Query {
    user: [User!]!
    getUser(id: ID!): User
  }
  type Mutation {
    addUser(input: UserInput): User!
  }
`;

const resolvers = {
  Query: {
    user: async () => {
      return await userRepository.getAll();
    },
    getUser: async (_: any, { id }: any) => {
      const user = await userRepository.getById(id);

      return { ...user, id };
    },
  },
  Mutation: {
    addUser: async (_: any, { input: { name, email } }: any) => {
      const id = await userRepository.create({ name, email });

      return { name, email, id };
    },
  },
};

const GraphQLService = await applyGraphQL({
  typeDefs,
  resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

const port = 8080;

console.log(`Server started on http://localhost:${port}`);
await app.listen({ port });
