const clarifaiApp = require('./index');

const sky = 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const testerStat = 'https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg'

const compare = async matchUrl => {
    try {
	const ret = await clarifaiApp.inputs.search({
	    input: {
		url: matchUrl,
	    }
	})
	return ret;
    } catch (err) {
	console.error(err);
    }
}

module.exports = compare;
