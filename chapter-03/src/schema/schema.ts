import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';
import _ from 'lodash';

interface Company {
  id: number;
  name: string;
  countryCode: string;
  market_cap: string;
}

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    countryCode: {
      type: GraphQLString,
    },
    market_cap: {
      type: GraphQLString,
    },
  },
});

interface User {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: string;
  companyId: number;
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
    lastName: {
      type: GraphQLString,
    },
    countryCode: {
      type: GraphQLString,
    },
    companyId: {
      type: GraphQLInt,
    },
    company: {
      type: CompanyType,
      async resolve(parentValue: User) {
        const res = await fetch(
          `https://testapi.devtoolsdaily.com/companies/${parentValue.companyId}`,
        );

        const data = (await res.json()) as Company;

        return data;
      },
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
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      async resolve(_parentValue, args: UserArgs): Promise<User> {
        const res = await fetch(
          `https://testapi.devtoolsdaily.com/users/${args.id}`,
        );

        const data = (await res.json()) as User;

        return data;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
