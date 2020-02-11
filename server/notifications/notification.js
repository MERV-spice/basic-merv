const {Expo} = require('expo-server-sdk');
let expo = new Expo();

const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  try {
    if (!Expo.isExpoPushToken(req.body.value)) {
      console.error('not valid token');
      return;
    }

    const user = await User.findByPk(req.session.passport.user);
    await user.update({token: req.body.value});
    console.log(req.body.value);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// app.post('/', async (req, res, next) => {
//   let messages = [];
//   const token = req.body.value;

router.post('/', async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  if (!Expo.isExpoPushToken(user.token)) {
    console.error('not valid token');
    return;
  }
  console.log(user.token);
  let messages = [];

  messages.push({
    to: user.token,
    sound: 'default',
    body: req.body.message,
    data: {type: req.body.type}
  });

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (err) {
        console.error('err');
        console.error(err);
      }
    }
  })();

  res.sendStatus(203);

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
