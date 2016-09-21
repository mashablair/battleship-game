// MVC
// Model - keeps track of the ships, where they are, if they've been hit, and if they've been sunk
// View - updates display w/ hits, missed and messages to user
// Controller - glues them together, gets user's input and executes game's logic

// object-oriented design

var view = {
    // this method takes a string and displays it in message window
    displayMessage: function(msg) {
        // first, get html element by id:
        var messageArea = document.getElementById('messageArea');
        // second, update the text of this element with msg:
        messageArea.innerHTML = msg; // msg is the argument
    },

    // this method displays 'miss' when user's input is wrong
    displayMiss: function(location) {
        // adds class="miss" to the cell, this class is already discribed by css
        var cell = document.getElementById(location); // e.g. location = '14'
        cell.setAttribute('class', 'miss');
    },

    // this method displays 'ship' when user's input is right
    displayHit: function(location) {
        // adds class="miss" to the cell, this class is already discribed by css
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    }

};

// testing View:
view.displayMessage('Woa, look at this grid!');
view.displayMiss('00'); // 'A0'
view.displayHit('34'); // 'D4'


// ------MODEL------
var model = {
    // *****properties:
    boardSize: 7, // # of drid cells
    numShips: 3, // we can change # of ships later (e.g. level 2)
    shipsSunk: 0, // start w/ 0, then dynamically updated by fire() method
    shipLength: 3, // 3 cells (horizontally or vertically)

    // ships locations and hits HARDCODED now for testing purposes:
    ships: [{ locations: ['31', '41', '51'], hits: ['', '', ''] },
            { locations: ['14', '24', '34'], hits: ['', 'hit', ''] },
            { locations: ['00', '01', '02'], hits: ['hit', '', ''] },],

    // ******methods:

    // fires and figures 'hit' or 'miss', then updates View; uses isSunk()
    fire: function(guess) {
        for (var i=0; i<this.numShips; i++) {
            var ship = this.ships[i];
            // instead another loop to iterate thru locations, use .indexOf():
            var index = ship.locations.indexOf(guess); // .indexOf() returns index of guess value or '-1'
            if (index >= 0) { // if guess value found in the array
                // we have a HIT!!
                ship.hits[index] = 'hit'; // adds 'hit' to hits array
                console.log('HIT!'); // testing
                // update the View:
                view.displayHit(guess); // places 'ship.png' on the board
                view.displayMessage('You hit my ship!'); // updates View

                return true;
            } else { // if guess NOT found in locations array:
                console.log('MISSED!');
                view.displayMiss(guess); // places 'miss.png' on the board
                view.displayMessage('Nope, you missed!'); // updates View

                return false;
            }
        }
    },

    // isSunk: function() {

    // }
};

model.fire('31'); // should be 'hit'
model.fire('00'); // should be 'miss'










