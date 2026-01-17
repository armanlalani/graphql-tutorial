
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.js";

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
