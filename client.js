
// GAME BOTTLESHIP!

// We need some way to generate a random loc1, loc3, loc3
// They need to be consecutive and 0-6
var randomLoc = Math.floor(Math.random() * 5); //this picks a random number from 0-4.  Because we only have 7 slots in our game.
var location1 = randomLoc;
var location2 = location1+1;
var location3 = location2+1;

var currentGuess;
var numberOfHits = 0;
var numberOfGuesses = 0;
var isSunk = false;

while (isSunk === false) {
  currentGuess = prompt('Ready, aim, fire! Enter a number 0 - 6:');

  if (currentGuess < 0 || currentGuess > 6) {
    alert('Your guess was invalid! Please enter a VALID cell number!');
  } else {
    numberOfGuesses++;

    if (currentGuess == location1 || currentGuess == location2 || currentGuess == location3) {
      alert('HIT!');
      numberOfHits++;

      if (numberOfHits == 3) {
        isSunk = true;
        alert('You sank my battleship!');
      }
    } else {
      alert('MISS!');
    }
  }
}

//display
var stats = "You took " + numberOfGuesses + " guesses to sink my battleship, " + "which means your shooting accuracy was " + (3/numberOfGuesses);

alert(stats);


