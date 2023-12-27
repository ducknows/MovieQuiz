//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 15;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son",
    options: ["Scarface", "Goodfellas", "Godfather", "Cassino"],
    correct: "GodFather",
  },
  {
    id: "1",
    question: "After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
    options: ["Reservoir Dogs", "Drive", "Clockwork Orange", "The Suspects"],
    correct: "Reservoir Dogs",
  },
  {
    id: "2",
    question: " A depressed suburban father in a mid-life crisis decides to turn his hectic life around after becoming infatuated with his daughter's attractive friend.",
    options: ["Black Swan", "Fargo", "Lost in Translation", "American Beauty"],
    correct: "American Beauty",
  },
  {
    id: "3",
    question: " A mentally unstable Vietnam war veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
    options: ["American Psycho", "Fight Club", "Taxi Driver", "Seven/Se7en"],
    correct: "Taxi Driver",
  },
  {
    id: "4",
    question: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    options: ["The Lone Ranger", "Django Unchained", "13th", "Wild Wild West"],
    correct: "Django Unchained",
  },
  {
    id: "5",
    question: "During the U.S.-Vietnam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe.",
    options: ["Apocalypse Now", "Oldboy", "Clockwork Orange", "Brazil"],
    correct: "Apocalypse Now",
  },
  {
    id: "6",
    question: "A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
    options: ["The Silence Of The Lambs", "Blade", "Zodiac", "Hannibal"],
    correct: "The Silence Of The Lambs",
  },
  {
    id: "7",
    question: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers..",
    options: ["Donnie Darko", "The Matrix", "Truman Show", "Ghost In The Shell"],
    correct: "The Matrix",
  },
  {
    id: "8",
    question: " Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    options: ["Forest Gump", "Dark Knight", "Shawshank Redemption", "Schindler's List"],
    correct: "Shawshank Redemption",
  },
  {
    id: "9",
    question: "A Las Vegas-set comedy centered around three groomsmen who lose their about-to-be-wed buddy during their drunken misadventures then must retrace their steps in order to find him.",
    options: ["The Wolf Of The Wall Street", "SuperBad", "Taxi Driver", "Hangover"],
    correct: "Hangover",
  },
 /*  {
    id: "10",
    question: " A cop has to talk down a bank robber after the criminal’s perfect heist spirals into a hostage situation.",
    options: ["Inside Man", "American Gangster", "Die Hard", "Heat"],
    correct: "Inside Man",
  }, */
 
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 15;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 15;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};