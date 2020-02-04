'use strict';

const db = require('../server/db'); //Will this change on the basis of our new db location
const {
  User,
  Game,
  Clue,
  Picture,
  CluePicture,
  Score,
} = require('../server/db/models');
const faker = require('faker/locale/en_US');

// https://www.npmjs.com/package/faker --- for further use in faking it til we make it

const makeClue = () => {
  const clues = [];
  for (let i = 0; i < 30; i++) {
    clues.push({
      time: faker.date.recent(),
      lat: faker.random.number(),
      text: faker.company.catchPhraseDescriptor(),
      hint: faker.company.catchPhraseDescriptor(),
    });
  }
  return clues;
};

const makePics = () => {
  const pics = [];
  for (let i = 0; i < 30; i++) {
    pics.push({
      NumTimesUsed: faker.random.number(),
      Likes: faker.random.number(),
      Dislikes: faker.random.number(),
      AccessPic:
        'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      Location: [faker.random.number(), faker.random.number()],
    });
  }
  return pics;
};

const makeGames = () => {
  const games = [];
  for (let i = 0; i < 10; i++) {
    games.push({
      name: `game ${i}`,
      time: new Date(),
    });
  }
  return games;
};

const makeUsers = () => {
  const users = [];
  for (let i = 0; i < 30; i++) {
    users.push({
      email: `user${i}@email.com`,
      password: '123',
      username: i,
    });
  }
  return users;
};

const makeScores = () => {
  const scores = [];
  for (let i = 0; i < 5; i++) {
    scores.push({
      userId: 1,
      gameId: 1,
      score: Math.floor(Math.random() * 100),
    });
  }
  return scores;
};

async function seed() {
  await db.sync({ force: true });

  const clues = await Clue.bulkCreate(makeClue());
  const pics = await Picture.bulkCreate(makePics());
  const games = await Game.bulkCreate(makeGames());
  const users = await User.bulkCreate(makeUsers());
  const scores = await Score.bulkCreate(makeScores());

  await Promise.all(
    clues.map((clue, i) => clue.addGame(games[Math.floor(i / 3)]))
  );
  await Promise.all(pics.map((pic, i) => pic.addClue(clues[i])));
  await Promise.all(
    users.map((user, i) => user.setGame(games[Math.floor(i / 3)]))
  );
  await Promise.all(scores);

  console.log(`seeded ${clues.length} clues`);
  console.log(
    `seeded ${pics.length} pictures-- static url, these are all the same picture`
  );
  console.log(`seeded ${games.length} games`);
  console.log(`seeded ${users.length} users`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
