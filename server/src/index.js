const config = require('config');

// -- Instantiate assistant --
const AssistantV1 = require('ibm-watson/assistant/v1');

const assistant = new AssistantV1({
  version:    config.get('watson.version'),
  iam_apikey: config.get('watson.apiKey'),
  url:        config.get('watson.url')
});


// -- Instantiate app --
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  const msg = await assistant.message({
    workspace_id: config.get('watson.workspaceId'),
    input:        {text: "What's my balance?"}
  });
  console.log(JSON.stringify(msg));
  res.json(msg);
});


// -- Start server --
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
