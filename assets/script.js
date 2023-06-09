$(function () {
  var count = 0;
  var pointValue = 5;
  var isCompleted = false;
  var timerElement = document.querySelector(".timer-count");
  var startButton = document.querySelector(".start-button");
  var timer;
  var timerCount;

  // Start button will show the first page and start the timer
  $(".start-button").click((e) => {
    e.preventDefault();
    $(".firstPage").hide();
    $("#question-1").show();
    startGame(); // starts timer
  });

  // This will hide the first page and show the second and calculate the correct score if they are right/wrong and deduct time if they are wrong
  $(".question-1-button").click((e) => {
    e.preventDefault();

    if (e.target.id === "wrong") {
      timerCount = timerCount - 15;
      $(".wrong").show();
      $(".right").hide();
    } else if (e.target.id === "right") {
      count += pointValue;
      $(".right").show();
      $(".wrong").hide();
    }

    $("#question-1").hide();
    $("#question-2").show();
  });

  // This will hide the second page and show the third and calculate the correct score if they are right/wrong and deduct time if they are wrong
  $(".question-2-button").click((e) => {
    e.preventDefault();

    if (e.target.id === "wrong") {
      timerCount = timerCount - 15;
      $(".wrong").show();
      $(".right").hide();
    } else if (e.target.id === "right") {
      count += pointValue;
      $(".right").show();
      $(".wrong").hide();
    }

    $("#question-2").hide();
    $("#question-3").show();
  });

  // This will hide the third page and show the fourth and calculate the correct score if they are right/wrong and deduct time if they are wrong
  $(".question-3-button").click((e) => {
    e.preventDefault();

    if (e.target.id === "wrong") {
      timerCount = timerCount - 15;
      $(".wrong").show();
      $(".right").hide();
    } else if (e.target.id === "right") {
      count += pointValue;
      $(".right").show();
      $(".wrong").hide();
    }

    $("#question-3").hide();
    $("#question-4").show();
  });

  // This will hide the fourth page and show the fifth and calculate the correct score if they are right/wrong and deduct time if they are wrong
  $(".question-4-button").click((e) => {
    e.preventDefault();

    if (e.target.id === "wrong") {
      timerCount = timerCount - 15;
      $(".wrong").show();
      $(".right").hide();
    } else if (e.target.id === "right") {
      count += pointValue;
      $(".right").show();
      $(".wrong").hide();
    }

    $("#question-4").hide();
    $("#question-5").show();
  });

  // This will hide the fifth page and show the total score page and calculate the correct score if they are right/wrong and deduct time if they are wrong
  $(".question-5-button").click((e) => {
    e.preventDefault();

    if (e.target.id === "wrong") {
      timerCount = timerCount - 15;
      $(".wrong").show();
      $(".right").hide();
    } else if (e.target.id === "right") {
      count += pointValue;
      $(".right").show();
      $(".wrong").hide();
    }
    $("#totalScore").text("Your final score is " + count);
    $("#question-5").hide();
    $("#totalScorePage").show();
    clearInterval(timer);
  });

  // When we click submit, we will add the user and their score to localStorage, if a user has been added already then we will append the user to the localStorage list and then show the high score page
  $(".submit-button").click((e) => {
    e.preventDefault();
    let user = $("#initialsInput").val();
    // if users list is empty then add to it
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", user);
    } else {
      let userList = localStorage.getItem("users");
      if (userList.search(user) === -1) {
        localStorage.setItem("users", userList + "," + user);
      } // we can't find the user - only add to userlist if we can't find the user
    } // retrieve users list and add to it

    localStorage.setItem(user, count);
    count = 0;
    showHighScorePage();
    $("#totalScorePage").hide();
    $("#highScorePage").show();
    startButton.disabled = false;
  });

  // This function retrieves users from the localStorage and sets the results in #highScoreResults
  async function showHighScorePage() {
    let userList = localStorage.getItem("users");
    let results = $("#highScoreResults");
    results.empty();
    if (userList !== null) {
      usersArray = userList.split(",");
      for (let i = 0; i < usersArray.length; i++) {
        results.append(
          `<li class="high-score-result">${i + 1}. ${
            usersArray[i]
          } - ${localStorage.getItem(usersArray[i])} </li>`
        );
      }
    }
  }

  // Go back will show the first page and hide the current page
  $(".goBack-button").click((e) => {
    e.preventDefault();
    $("#firstPage").show();
    $("#highScorePage").hide();
    $(".wrong").hide();
    $(".right").hide();
  });

  // When we clear high scores, we want to remove all previously kept scores in local storage
  $(".clearHighScores-button").click((e) => {
    e.preventDefault();
    localStorage.clear();
    showHighScorePage();
  });

  // When we click view high scores, we want to hide every other page and only calculate the high score and show the corresponding page
  $(".viewHighScoresButton").click((e) => {
    e.preventDefault();
    $("#firstPage").hide();
    $("#question-1").hide();
    $("#question-2").hide();
    $("#question-3").hide();
    $("#question-4").hide();
    $("#question-5").hide();
    $("#highScorePage").hide();
    $("#totalScorePage").hide();
    showHighScorePage();
    $("#highScorePage").show();
  });

  // The startGame function is called when the start button is clicked
  function startGame() {
    isCompleted = false;
    timerCount = 75;

    // Prevents start button from being clicked when assessment is in progress
    startButton.disabled = true;
    startTimer();
  }

  // The completedAssessment function is called when the completedAssessment condition is met
  function completedAssessment() {
    startButton.disabled = false;
    $("#totalScorePage").show();
  }

  // The endGame function is called when timer reaches 0
  function endGame() {
    startButton.disabled = false;
    count = 0; // reset count for next quiz
  }

  // The setTimer function starts and stops the timer and triggers completedAssessment() and endGame()
  function startTimer() {
    // Sets timer
    timer = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount > 0) {
        // Tests if completedAssessment condition is met
        if (isCompleted && timerCount > 0) {
          // Clears interval, stops timer, and enable completedAssessment function
          clearInterval(timer);
          completedAssessment();
          count = 0; // reset count for next quiz
        }
      }
      // Tests if time has run out. If timer has run out, the user is sent to the end of the game i.e the totalScorePage
      if (timerCount <= 0) {
        showHighScorePage();
        $("#totalScorePage").show();

        timerElement.textContent = 0;
        console.log(count);
        $("#totalScore").text("Your final score is " + count);

        // Clears interval and hides all pages except totalScorePage i.e sends user to end of the game
        clearInterval(timer);
        $("#firstPage").hide();
        $("#question-1").hide();
        $("#question-2").hide();
        $("#question-3").hide();
        $("#question-4").hide();
        $("#question-5").hide();
        $("#highScorePage").hide();
        endGame();
      }
    }, 1000);
  }
});
