import {assert} from 'chai';

const a1 = {
  count: 0,
};

const a2 = {
  count: -1,
};

const a3 = {
  count: 10,
};

const a4 = {
  count: 0,
};

// const a5 = {
//   count: 10,
//   points: 1150,
//   lives: 3,
//   time: 50
// };

const countList = [-1, 0, 5, 10, 11];
const pointsList = [500, 650, 1000, 1150, 1500, 1650];
const livesList = [0, 1, 2, 3];
const timesList = [49, 50, 51, 99, 100, 101, 150];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const answersObjectGenerator = () => {
  return {
    count: getRandomInt(0, countList.length),
    points: getRandomInt(0, pointsList.length),
    lives: getRandomInt(0, livesList.length),
    time: getRandomInt(0, timesList.length)
  };
};

const pointsCount = (answersObject) => {
  if (!answersObject || typeof answersObject !== `object` || !answersObject.isArray) {
    return `answersObject should be a non empty object`;
  }
  if (answersObject.count < 10) {
    return -1;
  }
  if (answersObject.count === 10) {
    return 1;
  }
  return false;
};

describe(`Points Counter`, () => {
  it(`should return -1 when got less then 10 answers`, () => {
    assert(pointsCount(a1));
    assert(pointsCount(a2));
    assert(pointsCount(a4));
  });

  it(`should return 1 when got 10 answers`, () => {
    assert(pointsCount(a3));
  });

  it(`should deal with corner cases correctly`, () => {
    assert(pointsCount(``));
    assert(pointsCount(null));
    assert(pointsCount(undefined));
  });

  it(`should deal with invalid data`, () => {
    assert(pointsCount(0));
    assert(pointsCount(1));
    assert(pointsCount(true));
    assert(pointsCount({}));
    assert(pointsCount([]));
  });

  it(`should deal with valid data`, () => {
    for (let i = 0; i < 1000; i++) {
      assert(pointsCount(answersObjectGenerator()));
    }
  });
});
