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




// ------MODEL------
var model = {
    // *****properties:
    boardSize: 7, // # of drid cells
    numShips: 3, // we can change # of ships later (e.g. level 2)
    shipsSunk: 0, // start w/ 0, then dynamically updated by fire() method
    shipLength: 3, // 3 cells (horizontally or vertically)

    // ship locations dynamic:
    ships: [{ locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] },],

    // ******methods:
    // ships generator plan:
    // 1. loop for the number of ships we want to create
    // 2. generate a random direction (vertical or horizontal)
    // 3. generate a random location
    // 4. test to see if the new locations collide
    // 5. add locations to the ships array

    // master method: creates ships [] by using methods below:
    generateShipLocations: function() {
        var locations; // this will become []
        for (var i=0; i<this.numShips; i++) {
            do {
                locations = this.generateShip(); // calls method below
            } while (this.collision(locations)); // calls method below
            // if collision test passed, location is assigned to model.ships.locations []
            this.ships[i].locations = locations;
        }
    },

    // this method creates a single ship located randomly on the board:
    generateShip: function() {
        // horizontal or vertical: generate random # from 0 to 1:
        var direction = Math.floor(Math.random() *2);
        var row, col;

        if (direction === 1) {
            // generate horizontal ship's 1st location:
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength)); // to avoid ship off board
        } else {
            // generate vertical ship's 1st location:
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = []; // add locations 1 by 1
        for (var i=0; i<this.shipLength; i++) {
            if (direction === 1) {
                // add location for new horizontal ship
                newShipLocations.push(row + '' + (col+1)); // we need concatenate strings, not add ##
            } else {
                // add location for new vertical ship
                newShipLocations.push((row+1) + '' + col);
            }
        }
        return newShipLocations; // returns array for generateShip()
    },

    // check if the ships overlap on the board
    collision: function(locations) { // 'locations' is an []
        for (var i=0; i<this.numShips; i++) {
            var ship = model.ships[i];
            // check all locations in new ship's array
            for (var j=0; j<locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) { // if not there, --> '-1'
                    return true; // we found collision!
                }
            }
        }
        return false; // found no collisions (no match)
    },


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

                // use this.isSunk() here:
                if (this.isSunk(ship)) {
                    view.displayMessage('You sank my battleship!!!');
                    this.shipsSunk++; // updates # of sunk ships in Model
                }

                return true;
            } else { // if guess NOT found in locations array:
                console.log('MISSED!');
                view.displayMiss(guess); // places 'miss.png' on the board
                view.displayMessage('Nope, you missed!'); // updates View

                return false;
            }
        }
    },

    // checks if the ship been hit 3x:
    isSunk: function(ship) {
        for (var i=0; i<this.numShips; i++) {
            if (ship.hits[i] !== 'hit') { // is one slot is empty
                return false;  // we don't have a hit yet!
            }
        }
        return true; // otherwise, all spots='hit' and this ship is sunk!
    } // use this method in this.fire() above
};












