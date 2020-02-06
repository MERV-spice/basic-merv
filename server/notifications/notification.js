const {Expo} = require('expo-server-sdk');
let expo = new Expo();

app.post('/', async (req, res, next) => {
  let messages = [];
  const token = req.body.value;
  console.log(token);

  if (!Expo.isExpoPushToken(token)) {
    console.error('not valid token');
    return;
  }

  messages.push({
    to: token,
    sound: 'default',
    body: 'test notification'
  });

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (err) {
        console.error('err');
        console.error(err);
      }
    }
  })();

  /* let receiptIds;
     * let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

     * (async () => {
     *   for (let chunk of receiptIdChunks) {
     *   try {
     *   let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
     *   console.log(receipts);

     *   for (let receipt of receipts) {
     *   if (receipt.status === 'ok') {
     *   continue;
     *   } else if (receipt.status === 'error') {
     *   console.error('error sending');
     *   if (receipt.details && receipt.details.error) {
     *   console.error(`error code is ${receipt.details.error}`);
     *   }
     *   }
     *   }
     *   } catch (err) {
     *   console.error(err);
     *   }
     *   }
       })(); */
});
