function Quiz(questionsAll) {
    this.questionsAll = questionsAll;
    this.questionIndex = 0;
    this.correctAnswerNumber = 0;
}

Quiz.prototype.bringQuestion = function () {
    return this.questionsAll[this.questionIndex];
}


const optionList = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';
const nextBtn = document.querySelector('.next-btn');
const scoreBox = document.querySelector('.score-box');
const btnStart = document.querySelector(".btn-start");
const inputs = document.querySelector('.name-input .inputs');
const nameInput = document.querySelector('.name-input');
const nameClick = document.querySelector('.name-click');

btnStart.style.display = 'none'

nameClick.addEventListener("click", function(){
    if(inputs.value != ''){
        btnStart.style.display = 'block'
        nameInput.style.display = 'none'

    }else if(inputs.value == ''){
        alert('Please enter your first and last name...')
    }
})

const quiz = new Quiz(questionsAll);

// a function to start with quiz

btnStart.addEventListener("click", function () {
    // To activate the quiz screen
    document.querySelector('.quiz-box').classList.add('active')
    showQuestion(quiz.bringQuestion());
    startTimer(10)
    lineAnimation()
    questionNumberShow(quiz.questionIndex + 1, quiz.questionsAll.length);
    nextBtn.classList.remove("show")

})

// to move on to the next question and fit the values to it.

nextBtn.addEventListener('click', () => {
    document.querySelector('.time-text').textContent = "Time"
    clearInterval(counterLine)
    lineAnimation()
    clearInterval(counter)
    startTimer(10)
    
    if (quiz.questionsAll.length != quiz.questionIndex + 1) {
        quiz.questionIndex += 1;
        nextBtn.classList.remove("show")
        showQuestion(quiz.bringQuestion());
        questionNumberShow(quiz.questionIndex + 1, quiz.questionsAll.length);
    } else {
        clearInterval(counter)
        clearInterval(counterLine)
        showScore(quiz.questionsAll.length, quiz.correctAnswerNumber)
        scoreBox.classList.add('active')
        document.querySelector('.quiz-box').classList.remove('active')
    }
})


// button that appears on the result screen to finish the quiz
document.querySelector('.btn-finish').addEventListener('click', function () {
    window.location.reload();
})
// button that appears on the result screen to restart the quiz
document.querySelector('.btn-again').addEventListener('click', function () {
    quiz.correctAnswerNumber = 0;
    quiz.questionIndex = 0;
    btnStart.click();
    scoreBox.classList.remove('active')
})

// function to show the result on the quiz screen

function showScore(totalQuestion, correctAnswer) {
    let correct = ` <strong>${inputs.value} </strong> you gave ${correctAnswer} correct answers out of ${totalQuestion} questions in total.`
    document.querySelector('.score-box .score-explanation').innerHTML = correct;
}

// questions

function showQuestion(question) {
    let questions = `<span>${question.questionText}</span>`

    let options = ''

    for (let answer in question.answerOptions) {
        options += `
        <div class="option">
        <span><b>${answer}</b>: ${question.answerOptions[answer]}</span> 
        </div>

        `;
    }

    document.querySelector(".question-text").innerHTML = questions;
    optionList.innerHTML = options;

    const option = optionList.querySelectorAll('.option');

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}


// process for questions

function optionSelected(option) {
    clearInterval(counter)
    clearInterval(counterLine)
    let answer = option.querySelector("span b").textContent;
    let question = quiz.bringQuestion();

    if (question.checkAnswer(answer)) {
        quiz.correctAnswerNumber += 1;
        option.classList.add("correct")
        option.insertAdjacentHTML("beforeend", correctIcon)
    } else {
        option.classList.add("incorrect")
        option.insertAdjacentHTML("beforeend", incorrectIcon)
    }

    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add("disabled")
    }

    nextBtn.classList.add("show")
}

// to show the remaining time

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        document.querySelector('.time-second').textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);
            document.querySelector('.time-text').textContent = "Time Over"
            let answer = quiz.bringQuestion().trueAnswer;

            for (let option of optionList.children) {
                if (option.querySelector("span b").textContent == answer) {
                    option.classList.add("correct")
                    option.insertAdjacentHTML("beforeend", correctIcon)
                }
                option.classList.add('disabled')
                
            }
            nextBtn.classList.add('show')
        }

       
    }
    
}

// zamani bir border animasyonla gostermek için

let counterLine
function lineAnimation() {
    let lineWidth = 0;

    counterLine = setInterval(timer, 20)

    function timer() {
        lineWidth += 1;
        document.querySelector('.time-line').style.width = lineWidth + "px";

        if(lineWidth > 548){
            clearInterval(counterLine)
        }
    }
}

function questionNumberShow(questionOrder, totalQuestion) {
    let content = ` <span class="badge bg-warning py-2 px-3">${questionOrder} / ${totalQuestion}</span>`
    document.querySelector(".quiz-box .question-index").innerHTML = content;
}




