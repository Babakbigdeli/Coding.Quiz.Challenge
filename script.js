//  Setting questions up

const questions = [
    {
        title: "Question 1: Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Question 2: The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Question 3: The instructions for a function are enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },
    {
        title: "Question 4: A property of an object that is a function is called a ____.",
        choices: ["method", "string", "stylesheet", "boolean"],
        answer: "method"
    },
    {
        title: "Question 5: The logical operator that represents 'or' is ____.",
        choices: ["||", "OR", "&&", "==="],
        answer: "||"
    }
];

function startQuiz() {

        //  Clicking the "Start Quiz" button starts the quiz, hides the landing container, and displays the quiz container
        let timeRemained=0;
        let startButtonElement = document.getElementById("start-button");
        let timeRemainedElement = document.getElementById("time-remaining");
        let finalScoreElement = document.getElementById("final-score");
        let numOfQuestions = questions.length;
        let landingContainerElement = document.getElementById("landing-container");
        let quizContainerElement = document.getElementById("quiz-container");
        let finalContainerElement = document.getElementById("final-container");
        let submitButtonElement = document.getElementById("submit-initials");
        let highscoreButtonElement = document.getElementById("highscore-button");
        let highscoreContainerElement = document.getElementById("highscore-container");
        let highScores = [];
            
        //  Got this method for parsing and retrieving from local storagefrom StackOveflow
        if (JSON.parse(localStorage.getItem('scores')) !== null) {
            highScores = JSON.parse(localStorage.getItem("scores"));
        }
    
        function startQuiz() {
            
            
            landingContainerElement.setAttribute("class","container d-none");
            let rowElement = null;
            let colElement = null;
            let headerElement = null;
            let buttonElement = null;
            quizContainerElement.setAttribute("class","container");
            let currentQuestion = 1;
            let score = 0;

             //  quiz time is number of questions * 15
            timeRemained=numOfQuestions * 15;
            timeRemainedElement.setAttribute("value",timeRemained);

            let myInterval = setInterval(function() {
                if (timeRemained<1) {
                    clearInterval(myInterval);

            //  hides the quiz container and pops the score container when questions are finished or time is run out
                    quizContainerElement.setAttribute("class","container d-none");
                    finalContainerElement.setAttribute("class","container");
                    return;
                }
                timeRemained = timeRemained - 1;
                timeRemainedElement.setAttribute("value",timeRemained);
            },1000);
            let clickTimeout = false;
            function generateQuestion(questionNum) {
               
                quizContainerElement.innerHTML = "";
                rowElement = document.createElement("div");
                rowElement.setAttribute("class","row");
                quizContainerElement.append(rowElement);

                colElement = document.createElement("div");
                colElement.setAttribute("class","col-0 col-sm-2");
                rowElement.append(colElement);

                colElement = document.createElement("div");
                colElement.setAttribute("class","col-12 col-sm-8");
                rowElement.append(colElement);

                colElement = document.createElement("div");
                colElement.setAttribute("class","col-0 col-sm-2");
                rowElement.append(colElement);

                colElement = rowElement.children[1];
                rowElement = document.createElement("div");
                rowElement.setAttribute("class","row mb-3");
                colElement.append(rowElement);

                colElement = document.createElement("div");
                colElement.setAttribute("class","col-12");
                rowElement.append(colElement);

                headerElement = document.createElement("h2");
                headerElement.innerHTML = questions[questionNum-1].title;
                colElement.append(headerElement);

                colElement = quizContainerElement.children[0].children[1];
                for (let i=0; i<4; i++) {
                    let rowEl = document.createElement("div");
                    rowEl.setAttribute("class","row mb-1");
                    colElement.append(rowEl);

                    let colEl2 = document.createElement("div");
                    colEl2.setAttribute("class","col-12");
                    rowEl.append(colEl2);

                    buttonElement = document.createElement("button");
                    buttonElement.setAttribute("class","btn btn-primary");
                    buttonElement.setAttribute("type","button");
                    buttonElement.innerHTML = questions[currentQuestion-1].choices[i];
                    colEl2.append(buttonElement);
                   
                   //  displays "corect" or "incorect" when user clicks an answer
                    buttonElement.addEventListener("click",function(){
                        if (clickTimeout) {
                            return;
                        }
                        clickTimeout = true;
                        clearInterval(myInterval);
                        let colEl = quizContainerElement.children[0].children[1];
                        let rowEl = document.createElement("div");
                        rowEl.setAttribute("class","row border-top");
                        colEl.append(rowEl);

                        colEl = document.createElement("div");
                        colEl.setAttribute("class","col-12");
                        rowEl.append(colEl);

                        let parEl = document.createElement("p");
                        colEl.append(parEl);
                        if (this.innerHTML === questions[currentQuestion - 1].answer) {
                            parEl.innerHTML = "Correct!";
                        } else {
                            parEl.innerHTML = "Incorrect";
                            timeRemained = timeRemained - 15;
                            if (timeRemained < 0) {
                                timeRemained = 0;
                            }
                            timeRemainedElement.setAttribute("value",timeRemained);
                        }
                        currentQuestion++;
                        if (currentQuestion>questions.length) {
                            score = timeRemained;
                        }
                        setTimeout(function() {
                            // When an answer is chosen, pause the timer and show the result for 2 seconds before loading the next question
                            if (currentQuestion>questions.length) {
                            // Move to the results page
                                quizContainerElement.setAttribute("class","container d-none");
                                finalContainerElement.setAttribute("class","container");
                                finalScoreElement.setAttribute("value",score);
                            } else {
                                generateQuestion(currentQuestion);
                                clickTimeout = false;
                                myInterval = setInterval(function() {
                                    if (timeRemained<1) {
                                        clearInterval(myInterval);
                                        quizContainerElement.setAttribute("class","container d-none");
                                        finalContainerElement.setAttribute("class","container");
                                        return;
                                    }
                                    timeRemained = timeRemained - 1;
                                    timeRemainedElement.setAttribute("value",timeRemained);
                                },1000);
                            }
                        },2000);
                    });
                }
                

            }
            function saveHighScore() {
                let initialsEl = document.getElementById("initials-entry");
                let newHighScore = {
                    initials: initialsEl.value,
                    highScore: score
                };
                console.log(newHighScore);
                highScores.push(newHighScore);
                console.log(highScores);
                localStorage.setItem("scores",JSON.stringify(highScores));
            }
            submitButtonElement.addEventListener("click",saveHighScore);
            
            generateQuestion(currentQuestion);
        }

        startButtonElement.addEventListener("click",startQuiz);

        highscoreButtonElement.addEventListener("click",function() {
            landingContainerElement.setAttribute("class","container d-none");
            quizContainerElement.setAttribute("class","container d-none");
            finalContainerElement.setAttribute("class","container d-none");
            highscoreContainerElement.setAttribute("class","container");
            let colEl = document.getElementById("highscore-table");
            for (i=0; i<highScores.length; i++) {
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class","row mb-1");
                colEl.append(rowEl);

                let colEl2 = document.createElement("div");
                colEl2.setAttribute("class","col-12 text-center");
                rowEl.append(colEl2);

                let parEl = document.createElement("div");
                parEl.innerHTML = highScores[i].initials + "   Score: " + highScores[i].highScore;
                colEl2.append(parEl);
            }
        });
    
        
    
    
    
    
    
    
    }
    startQuiz();