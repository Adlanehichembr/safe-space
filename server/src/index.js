const config = require('config');

const assistant   = require('./assistant');
const interpreter = require('./watsonOutputInterpreter');

// -- Instantiate app --
const express = require('express');
const app     = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/ping', (req, res) => {
  res.json({ping: 'pong'});
});

app.post('/message', async (req, res) => {
  const {context, output} = await assistant.query(req.body.context || {}, req.body.message);

  res.json({
    context,
    texts:   interpreter.getTexts(output),
    buttons: interpreter.getButtons(output),
    images:  interpreter.getImages(output),
  });
});

// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
