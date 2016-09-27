// MVC
// Model - keeps track of the ships, where they are, if they've been hit, and if they've been sunk
// View - updates display w/ hits, missed and messages to user
// Controller - glues them together, gets user's input and executes game's logic

// object-oriented design

// ------VIEW-------

var view = {
    // this method takes a string and displays it in message window
    displayMessage: function(msg) {
        // first, get html element by id:
        var messageArea = document.getElementById('messageArea');
        // second, update text content to this element:
        messageArea.innerHTML = msg; // content is the function argument
    },

    // this method displays 'miss' when user's input is wrong
    displayMiss: function(location) {
        // add class="miss" to the cell after getting user's guess for location:
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },

    // this method displays 'ship' when user's input is right
    displayHit: function(location) {
        // add class="hit" to the cell:
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
    ships: [
            { locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] },
            { locations: [0, 0, 0], hits: ['', '', ''] }
    ],
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
        console.log("Ships array: "); // this shows generated ships locations (for cheating)
        console.log(this.ships);
    },

    // this method creates a single ship located randomly on the board:
    generateShip: function() {
        // horizontal or vertical: generate random # from 0 to 1:
        var direction = Math.floor(Math.random() *2);
        var row, col;

        if (direction === 1) {
            // generate horizontal ship's 1st location:
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); // to avoid ship off board
        } else {
            // generate vertical ship's 1st location:
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength +1));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = []; // add locations 1 by 1
        for (var i=0; i<this.shipLength; i++) {
            if (direction === 1) {
                // add location for new horizontal ship
                newShipLocations.push(row + '' + (col+i)); // we need concatenate strings, not add ##
            } else {
                // add location for new vertical ship
                newShipLocations.push((row+i) + '' + col);
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


// ----------CONTROLLER----------
// gets user's guess, processes it, passes to Model
// keeps track of current guesses and player's progress
// updates Model with latest guess
// determines if game is over

var controller = {
    // properties
    guesses: 0,

    // methods
    // evaluates guess, processes it, gets it to Model
    processGuess: function(guess) { // guess comes in 'A1' form
        // evaluates guess for validity
        var location = parseGuess(guess); // uses helper function defined below
        if (location) {
            // if location = string --> true, if null --> false
            this.guesses++; // updates # of current guesses (doesn't penalize if wrong)
            var hit = model.fire(location); // calls Model
            // also checks if the game is over (all ships are sunk)
            // if hit = true AND shipsSunk = numShips
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('You won! All my battleships are sunk in ' + this.guesses + ' guesses!');
            }
        }
    }
};


// helper function to be used by controller.processGuess()
function parseGuess(guess) {

    // helper array
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    // checks if guess is valid
    if (guess === null || guess.length !== 2) {
        alert('Oops, please enter a VALID guess: a letter and a number on the board!');
    } else {
        firstChar = guess.charAt(0); // grabs 1st character of guess
        var row = alphabet.indexOf(firstChar); // gets a number (0-6) that corresponds to the letter
        var column = guess.charAt(1); // grabs 2nd char of guess

        // checks if guess is a number:
        if (isNaN(row) || isNaN(column)) {
            alert("Oops! That's NOT on the board!");
        } else if ( row<0 || row>= model.boardSize || column <0 || column >= model.boardSize ) {
            alert("Ooops! That's OFF the board!");
            // we're NOT using strict comparison operators b/c we need to convert string into number!
        } else {
            return row + column; // returns guess as 1 string
        }
    }
    return null; // if we got here, something failed one of the tests
}


// starts the game by handling 'Fire!' button: user's guess to Controller
function init() {
    var fireButton = document.getElementById('fireButton');
    // adds click event handler to 'Fire!' button
    fireButton.onclick = handleFireButton; // helper function defined below

    // enables clicking 'Return' key to submit user's input, instead of 'Fire!' button
    var guessInput = document.getElementById('guessInput'); // grabs input window
    guessInput.onkeypress = handleKeyPress; // helper function defined below

    // let's start the game!
    model.generateShipLocations(); // it'll happen right when we load the game, before we start playing
}

// helper handler function for init() when user clicks 'Fire!' button
function handleFireButton() {
    // gets value from the form
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value.toUpperCase(); // gets input and makes uppercase

    controller.processGuess(guess);

    guessInput.value = ''; // clears the form
}

// helper handler function for init() when user presses 'Enter'
function handleKeyPress(e) { // 'e' is event object and has info which key was pressed
    var fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        // if true, call fireButton click
        fireButton.click(); // tricks as if 'Fire!' was actually clicked!
        // returns 'false' so the form doesn't try to submit itself
        return false;
    }
}

// brower will run init() when page is fully loaded
window.onload = init;












