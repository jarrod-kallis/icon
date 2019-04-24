import express from 'express';

import environments from '../../../.env.json';

let router = express.Router();

// Get all environments
router.get('/', (request, response) => {
  const dbNames = environments.map(env => env.name);
  response.json(dbNames);
});

export default router;