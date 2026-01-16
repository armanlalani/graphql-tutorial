import express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/schema");

const app = express();
const PORT = 4000;

app.use(
  "/graphql",
  createHandler({
    schema,
  })
);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
