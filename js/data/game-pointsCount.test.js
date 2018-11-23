// import {assert} from 'chai';
//
// const pointsCount = (answers) => {
//   if (answers < 10) {
//     return -1;
//   }
//   if (answers === 10) {
//     return 1;
//   }
//   return false;
// };
//
// describe(`Points Counter`, () => {
//   it(`should return -1 when got less then 10 answers`, () => {
//     assert(pointsCount(-1));
//     assert(pointsCount(0));
//     assert(pointsCount(9));
//   });
//
//   it(`should return 1 when got 10 answers`, () => {
//     assert(pointsCount(10));
//   });
//
//   it(`should deal with corner cases correctly`, () => {
//     assert(pointsCount(``));
//     assert(pointsCount(null));
//     assert(pointsCount(undefined));
//   });
//
//   it(`should deal with invalid data`, () => {
//     assert(pointsCount(0));
//     assert(pointsCount(1));
//     assert(pointsCount(true));
//     assert(pointsCount({}));
//     assert(pointsCount([]));
//   });
// });
