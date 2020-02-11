const clarifaiApp = require('./index');

const input = async (url, id) => {
  try {
    await clarifaiApp.inputs.create({
      url,
      id
    });
  } catch (err) {
    console.error(err);
  }
};

const compare = async (base64, id) => {
  try {
    const ret = await clarifaiApp.inputs.search({
      input: {
        base64
      }
    });

    for (let i = 0; i < ret.hits.length; i++) {
      if (ret.hits[i].input.id === id.toString()) {
        return ret.hits[i].score;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {compare, input};
