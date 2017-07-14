// Helper function for issuing a delay.
let delay = time =>
    new Promise(resolve =>
        setTimeout(resolve, time)
    );
// helper function to check a condition in a given period.
let until = (cond, time) =>
    cond().then(result =>
        result || delay(time).then(() =>
            until(cond, time)
        )
    );

// mock ajax function
let ajax = link =>
    new Promise(resolve => 
        delay(Math.floor((Math.random() * 10) + 1) * 1000).then(() => 
            {
                let returnBoolean = Math.random() >= 0.5;
                resolve({loggedIn: returnBoolean});
            }
       )
    );


