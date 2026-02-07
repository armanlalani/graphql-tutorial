import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';
import { CONFIG } from './config/env.js';

const app = express();
const PORT = CONFIG.PORT;

app.use(
  '/graphql',
  createHandler({
    schema,
  }),
);

app.use('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.info(`Listening at port ${PORT}`);
});
