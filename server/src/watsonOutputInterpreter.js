module.exports = {
  getTexts,
  getButtons,
  getImages,
}

function getTexts(watsonOutput) {
  return watsonOutput.generic
    .filter(o => o.response_type === 'text')
    .map(o => o.text);
}

function getButtons(watsonOutput) {
  const watsonOptionsResponse = watsonOutput.generic
    .filter(o => o.response_type === 'option')[0];

  const buttons = watsonOptionsResponse && watsonOptionsResponse.options ?
    watsonOptionsResponse.options.map(o => ({label: o.label, value: o.value.input.text}))
    : null;

  return buttons;
}

function getImages(watsonOutput) {
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
