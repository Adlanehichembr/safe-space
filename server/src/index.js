const config = require('config');

const assistant = require('./assistant');

// -- Instantiate app --
const express = require('express');
const app     = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ping: 'pong'});
});

app.post('/message', async (req, res) => {
  const {context, output} = await assistant.query(req.body.context || {}, req.body.message);

  const texts = output.generic
    .filter(o => o.response_type === 'text')
    .map(o => o.text);

  const buttonOptions = output.generic
    .filter(o => o.response_type === 'option');

  console.log(buttonOptions)

  const buttons = buttonOptions && buttonOptions.length ?
    buttonOptions.map(o => o.options.map(p => ({label: p.label, value: p.value.input.text})))[0]
    : null;

  const image = {
    link:  'http://open-this-on-click.com',
    photo: 'http://download-this-for-preview.img',
    text:  'display this'
  }; // TODO implement

  res.json({context, texts, buttons, image});
});

// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
