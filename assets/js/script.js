(function () {

  function buildQuiz() {

    var output = [];

    // add timer in here ??
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        var answers = [];

        for (letter in currentQuestion.answers) {
          answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
          );
        }
        output.push(
          `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'green';
      }
      else {
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // add highscore storage in here??
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  var myQuestions = [
    {
      question: "Which of the following is NOT a way to define variables in Javascript?",
      answers: {
        a: "var",
        b: "const",
        c: "javadefine",
        d: "let"
      },
      correctAnswer: "c"
    },
    {
      question: "Javascript is also known as _____.",
      answers: {
        a: "Coffeepage",
        b: "ECMAScript",
        c: "Java",
        d: "Python"
      },
      correctAnswer: "b"
    },
    {
      question: "Javascript was invented by _____ in 1995.",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Steve Jobs"
      },
      correctAnswer: "c"
    },
    {
      question: "What is Javascript's file extension?",
      answers: {
        a: ".js",
        b: ".css",
        c: ".script",
        d: ".java"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the tag for including Javascript in a document?",
      answers: {
        a: "style",
        b: "java",
        c: "script",
        d: "html"
      },
      correctAnswer: "c"
    },
    {
      question: "Javascript is used for web development, most often in tandem with _____.",
      answers: {
        a: "HTML & CSS",
        b: "XML & XHTML",
        c: "Python & Scala",
        d: "Python & C#"
      },
      correctAnswer: "a"
    },
    {
      question: "Javascript helps developers manipulate the DOM, or _____.",
      answers: {
        a: "Document Of Matter",
        b: "Data Obligation Manual",
        c: "Data Object Model",
        d: "Document Object Model"
      },
      correctAnswer: "d"
    }
  ];

  buildQuiz();

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;


  showSlide(currentSlide);


  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();