'use strict'
/*
    To show how promise behave in different conditions.

*/

// Helper function for issuing a delay.
let delay = time =>
    new Promise(resolve =>
        setTimeout(resolve, time)
    );

let sendError = false;

let promiseOne = x =>
    new Promise((resolve,reject) => {
        console.log('START: Processing Promise One');
        if (sendError) {
                reject('ERROR: Promise One');
            } else {
                delay(1000).then(() => {
                    console.log('END: Processing Promise One. Returning: ', x);
                    resolve(x);
                });
            }
    });


let promiseTwo = x => 
    new Promise(resolve => {
        console.log('START: Processing Promise Two');
        delay(1000).then(() => {
            x += 10;
            console.log('END: Processing Promise Two. Returning: ', x);
            resolve(x);
        });
    });


let promiseThree = x =>
    new Promise((resolve, reject) => {
        console.log('START: Processing Promise Three');
            if (sendError) {
                reject('ERROR: Promise Three');
            } else {
                delay(1000).then(() => {
                    console.log('END: Processing Promise Three. Returning: ', x);
                    resolve(x);
                });    
            }
    });


function processOne(x) {
    promiseOne(x)
        .then(returnItem => {
            console.log('Return Item from Promise One: %d', returnItem);
            return promiseTwo(30 + returnItem);
        })
        .then(returnItem => {
            console.log('Return Item from Promise Two: %d', returnItem);
            return promiseThree(40 + returnItem);
        })
        .then(returnItem => {
            console.log('Return Item from Promise three: %d', returnItem);
            return returnItem;
        })
        .catch(err => {
            console.log('Error is returned: ', err);
        })
}

function processTwo(x) {
    sendError = true;
    promiseOne(x)
        .then((returnItem) => {
            promiseTwo(returnItem + 30);
        })
        .then(() => {
            sendError = false;
            return promiseThree(40 + x);
        })
        .catch(err => {
            console.log('Error is returned: ', err);
            sendError = false;
        })
}

function processThree(x) {
    promiseOne(x)
        .then(returnItem => {
            console.log('Return Item from Promise One: %d', returnItem);
            promiseTwo(30 + returnItem);
        })
        .then(returnItem => {
            console.log('Return Item from Promise Two: %d', returnItem);
            promiseThree(40)
        })
        .catch(err => {
            console.log('Error is returned: ', err);
        })
}

function processFour(x) {
    promiseOne(x)
        .then(promiseTwo)
        .then(promiseThree)
        .catch(err => console.log('Error is returned: ', err))
}

function processFive(x) {
    promiseOne(x)
        .then(returnItem => {
            console.log('2. Return Item: ', returnItem);
            promiseTwo();
        })
        .then(
            promiseThree
        )
        .catch(err => console.log('Error is returned: ', err))
}
