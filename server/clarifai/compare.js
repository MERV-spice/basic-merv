const clarifaiApp = require('./index');

const sky = 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const testerStat = 'https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg'

const compare = async (matchUrl, clueUrl, id) => {
    try {
	try {
	    await clarifaiApp.inputs.create({
		url: clueUrl,
		id: id,
	    });
	} catch (err) {
	    console.log('picture already in clarifai database');
	}

	setTimeout(async () => {
	    const ret = await clarifaiApp.inputs.search({
		input: {
		    url: matchUrl,
		}
	    })
	    await clarifaiApp.inputs.delete(clueUrl);
	    return ret;
	}, 500);
    } catch (err) {
	console.error(err);
    }
}

module.exports = compare;
