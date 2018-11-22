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

const pointsCount = (answersObject) => {
  if (!answersObject || typeof answersObject !== `object` || !answersObject.isArray) {
    return `answers should be an object`;
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
});
