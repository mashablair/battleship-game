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