import graphql from "graphql";
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
import _ from "lodash";
import { users } from "../data.js";

// How to define not null
const UserType = new GraphQLObjectType({
  name: "User",
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
  name: "RootQueryType2",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      async resolve(parentValue, args) {
        return fetch(`https://dummyjson.com/users/${args.id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("data", data);
            return data;
          });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
