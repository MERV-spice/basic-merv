const clarifaiApp = require('./index');

const sky =
  'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const testerStat =
  'https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg';

const test = 'https://i.ibb.co/17Nm9qv/IMG-20200130-114332812.jpg';
const test2 = 'https://i.ibb.co/FKJJ8QJ/IMG-20200204-105614754.jpg';

const compare = async matchUrl => {
  try {
    const ret = await clarifaiApp.inputs.search({
      input: {
        base64: matchUrl
      }
    });
    return ret;
  } catch (err) {
    console.error(err);
  }
};

module.exports = compare;
