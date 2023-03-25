// OOP: Nesne Tabanlı Programlama



function Soru(questionText, answerOptions, trueAnswer) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.trueAnswer = trueAnswer;
}

Soru.prototype.checkAnswer = function(answer) {
    return answer === this.trueAnswer
}


let sorular = [
    new Soru("1-Which is the javascript package management application?", { a: "Node.js", b: "Typescript", c: "Npm" }, "a"),
    new Soru("2-Which is the most popular language in the world right now?", { a: "Java Script", b: "Python", c: "Java" }, "a"),
    new Soru("3-Which one is used for clean code?", { a: "Angular", b: "Typescript", c: "React" }, "b"),
    new Soru("4-What language does the Macos operating system use?", { a: "Java", b: "C++", c: "Swift" }, "c"),
    new Soru("5-When was the java language created?", { a: "1997", b: "1995", c: "1993" }, "b")
];

function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
}

Quiz.prototype.bringQuestion = function() {
    return this.sorular[this.soruIndex];
}


const openList = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>'
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>'
const nextBtn = document.querySelector('.next-btn')

const quiz = new Quiz(sorular);

document.querySelector(".btn-start").addEventListener("click", function() {
        document.querySelector('.quiz-box').classList.add('active')
        showQuestion(quiz.bringQuestion());
        nextBtn.classList.remove("show")
        
})
showQuestion(quiz.bringQuestion());
nextBtn.addEventListener('click', () => {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        document.querySelector('.quiz-box').classList.add('active')
        quiz.soruIndex += 1;
        nextBtn.classList.remove("show")
        showQuestion(quiz.bringQuestion());
    } else {
        console.log("Quiz Over");
    }
})

function showQuestion(question){
    let questions = `<span>${question.questionText}</span>`

    let options = ''

    for(let answer in question.answerOptions){
        options +=`
        <div class="option">
        <span><b>${answer}</b>: ${question.answerOptions[answer]}</span>
        </div>

        `;
    }
   
    document.querySelector(".question-text").innerHTML = questions;
    openList.innerHTML = options;

    const option = openList.querySelectorAll('.option');

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(option){
    let answer = option.querySelector("span b").textContent;
    let question = quiz.bringQuestion();

    if(question.checkAnswer(answer)){
        option.classList.add("correct")
        option.insertAdjacentHTML("beforeend", correctIcon)
    }else{
        option.classList.add("incorrect")
        option.insertAdjacentHTML("beforeend", incorrectIcon)
    }

    for(let i=0; i < openList.children.length; i++){
        openList.children[i].classList.add("disabled")
    }

    nextBtn.classList.add("show")
}