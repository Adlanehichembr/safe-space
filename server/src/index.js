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

  res.json({
    context,
    texts:   extractTexts(output),
    buttons: extractButtons(output),
    images:  extractImages(output),
  });
});

// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// --- Helper functions ---

function extractTexts(watsonOutput) {
  return watsonOutput.generic
    .filter(o => o.response_type === 'text')
    .map(o => o.text);
}

function extractButtons(watsonOutput) {
  const watsonOptionsResponse = watsonOutput.generic
    .filter(o => o.response_type === 'option')[0];

  const buttons = watsonOptionsResponse && watsonOptionsResponse.options ?
    watsonOptionsResponse.options.map(o => ({label: o.label, value: o.value.input.text}))
    : null;

  return buttons;
}

function extractImages(watsonOutput) {
  return watsonOutput.generic
    .filter(o => o.response_type === 'image')
    .map(img => {
      const desc  = img.description;
      const limit = desc.search('-');

      if (limit < 0) {
        // default image
        return {
          title: 'Human Rights Watch',
          photo: 'http://poat.org/wp-content/uploads/2013/09/Assistance-2.jpg',
          text:  'Defending human rights worldwide',
          link:  'https://www.hrw.org/',
        };
      }

      return {
        title: img.title,
        photo: img.source,
        text:  desc.substring(0, limit).trim(),
        link:  desc.substring(limit + 1).trim(),
      };
    });
}
