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

  const images = output.generic
    .filter(o => o.response_type === 'image')
    .map(img => {
      const desc  = img.description;
      const limit = desc.search('-');

      if (limit < 0) {
        // default image
        return {
          title: 'Human Rights Watch',
          photo: 'http://poat.org/wp-content/uploads/2013/09/Assistance-2.jpg',
          text: 'Defending human rights worldwide',
          link: 'https://www.hrw.org/'
        };
      }

      return {
        title: img.title,
        photo: img.source,
        text:  desc.substring(0, limit).trim(),
        link:  desc.substring(limit + 1).trim()
      };
    });

  const buttons = buttonOptions && buttonOptions.length ?
    buttonOptions.map(o => o.options.map(p => ({label: p.label, value: p.value.input.text})))[0]
    : null;

  res.json({context, texts, buttons, images});
});

// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
