const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(4000, () => {
  console.log("Listening");
});
