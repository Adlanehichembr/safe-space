const config = require('config');

const AssistantV1 = require('ibm-watson/assistant/v1');

const assistant = new AssistantV1({
  version:    config.get('watson.version'),
  iam_apikey: config.get('watson.apiKey'),
  url:        config.get('watson.url'),
});

module.exports = {
  query,
};

function query(context, message) {
  return assistant.message({
    context,
    input:        { text: message },
    workspace_id: config.get('watson.workspaceId'),
  });
}
