const config = require('config');

const assistant = require('./assistant');

// -- Instantiate app --
const express = require('express');
const app     = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const msg = await assistant.query('what is my balance?');
  console.log(JSON.stringify(msg));
  res.json(msg);
});

app.post('/message', async (req, res) => {
  const msg = await assistant.query(req.body.message);
  res.json(msg);
});

// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
