import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from 'graphql';
import _ from 'lodash';

interface User {
  id: number;
  firstName: string;
  age: number;
}

interface UserArgs {
  id: number;
}

// How to define not null
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt,
    },
    firstName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType2',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(_parentValue, args: UserArgs): Promise<User> {
        const res = await fetch(`https://dummyjson.com/users/${args.id}`);

        const data = (await res.json()) as User;

        return data;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
