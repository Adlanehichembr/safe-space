const config = require('config');

const AssistantV1 = require('ibm-watson/assistant/v1');

const assistant = new AssistantV1({
  version:    config.get('watson.version'),
  iam_apikey: config.get('watson.apiKey'),
  url:        config.get('watson.url')
});

module.exports = {
  query,
};

function query(message) {
  return assistant.message({
    workspace_id: config.get('watson.workspaceId'),
    input: {
      text: message
    }
  });
}
