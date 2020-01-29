const ngrok = require('ngrok');

let url;
(async setUp () => {
    url = await ngrok.connect(4444);
})()

