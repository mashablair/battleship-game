// To test things (like, View or Model), uncomment portions of code below:

    // ***ships locations and hits HARDCODED for testing purposes:
    // ships: [{ locations: ['31', '41', '51'], hits: ['', '', ''] },
    //         { locations: ['14', '24', '34'], hits: ['', 'hit', ''] },
    //         { locations: ['00', '01', '02'], hits: ['hit', '', ''] },],


// ***testing VIEW:
// view.displayMessage('Woa, look at this grid!');
// view.displayMiss('00'); // 'A0'
// view.displayHit('34'); // 'D4'


// ***testing MODEL:
// model.fire('31'); // should be 'hit'
// console.log(model.shipsSunk);
// model.fire('41'); // should be 'hit'
// console.log(model.shipsSunk);
// model.fire('51'); // 3rd hit
// console.log(model.shipsSunk); // should be 1 now

// ***testing IF locations are hardcoded:
// model.fire("53"); // miss

// model.fire("31"); // hit
// model.fire("41"); // hit
// model.fire("51"); // hit

// model.fire("34"); // hit
// model.fire("24"); // hit
// model.fire("14"); // hit

// model.fire("00"); // hit
// model.fire("01"); // hit
// model.fire("02"); // hit


// ***testing CONTROLLER parseGuess():
// console.log(parseGuess('A0')); // 00
// console.log(parseGuess('kf')); // null
// console.log(parseGuess('59')); // null
// console.log(parseGuess('B8')); // null
// console.log(parseGuess('F9')); // null
// console.log(parseGuess('D6')); // 36