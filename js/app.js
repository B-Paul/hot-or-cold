
$(document).ready(function(){

  var guesses, feedback, defaultFeedback counter, guesses, game;
	
	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  /*--- Caching selectors for the interface elements ---*/
  guesses = $('#guessList');
  feedback = $('#feedback');
  defaultFeedback = feedback.html();
  input = $('#userGuess');
  counter = $('#count');

  /*--- Fire it up! ---*/
  game = newGame();

  $('.new').on('click', function () {
    game = newGame();
  });

  /*--- Gameplay ---*/
  $('#userGuess').parent().on('submit', function (event) {
    var userGuess, priorGuesses;
    event.preventDefault();

    userGuess = input.val();
    priorGuesses = game.guessCount;
    feedback.text(game.guess(+userGuess));
    this.reset();

    // Note that an invalid guess will not increment game.guessCount
    if (game.guessCount > priorGuesses) {    
      counter.text(game.guessCount);
      guesses.append('<li>' + userGuess + '</li>');
    }
  });

  function newGame() {
    feedback.html(defaultFeedback);
    guesses.empty();
    counter.text(0);

    return game && !game.success
      ? (window.confirm('Giving up?') ? new Game() : game)
      : new Game();
  }

  function Game() {
    var theNumber = getRandom()

    this.success = false;
    this.guessCount = 0;
    this.guess = function (userGuess) {
      if (this.success) {
        return "You've already won. Stop guessing!";
      } else if (invalid(userGuess)) {
        return "I'm thinking of a number between 1 and 100";
      }

      this.guessCount++;
      if (userGuess === theNumber) {
        this.success = true;
        return "Got it! Good guessing.";
      } else {
        return giveFeedback(Math.abs(userGuess - theNumber));
      }
    };
  }

  function getRandom() {
    return Math.floor(Math.random() * 100 + 1);
  }

  function invalid(n) {
    return isNaN(n) || 0 >= n || n > 100;
  }

  function giveFeedback(distance) {
    if (invalid(distance)) { throw new Error('Distance out of range'); }
    return distance <   5  ? "Burning up!"
         : distance <   10 ? "Pretty hot!"
         : distance <   20 ? "Tepid"
         : distance <   30 ? "Kinda chilly"
         : distance <   40 ? "I'm starting to shiver"
         : distance <   60 ? "You're colder than a polar bear's toenails"
         : distance <   80 ? "So ... cold ..."
         : "Everest is looking balmy right now."
  }

});


