/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  const p1 = new Promise((resolved) => {
    if (isPositiveAnswer === true) resolved('Hooray!!! She said "Yes"!');
    if (isPositiveAnswer === false) resolved('Oh no, she said "No".');
  });
  const p2 = new Promise((resolved, rejected) => {
    if (isPositiveAnswer !== true && isPositiveAnswer !== false) {
      rejected(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
  p1.then((value) => value);
  p2.catch((error) => error);
  const p3 = (isPositiveAnswer === true || isPositiveAnswer === false) ? p1 : p2;
  return p3;
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return (Promise.all(array)
    .then((data) => data)
    .catch((error) => error));
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return (Promise.race(array)
    .then((data) => data));
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */

function myPromiseAll(taskList) {
  // to store results
  const results = [];
  // to track how many promises have completed
  let promisesCompleted = 0;

  // return new promise
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      // if promise passes
      promise.then((val) => {
        // store its outcome and increment the count
        results[index] = val;
        promisesCompleted += 1;
        // if all the promises are completed,
        // resolve and return the result
        if (promisesCompleted === taskList.length) {
          resolve(results);
        }
      })
        // if any promise fails, reject.
        .catch((error) => { reject(error); });
    });
  });
}

function chainPromises(array, action) {
  // throw new Error('Not implemented');
  return (myPromiseAll(array)
    .then((result) => result.reduce((acc, cur) => action(acc, cur)),
      (error) => error));
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
