// OOP: Nesne Tabanlı Programlama

function Soru(questionText, answerOptions, dogruCevap) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(answer) {
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

const quiz = new Quiz(sorular);

document.querySelector(".btn-start").addEventListener("click", function() {
        document.querySelector('.quiz-box').classList.add('active')
        showQuestion(quiz.bringQuestion());
})
showQuestion(quiz.bringQuestion());
document.querySelector('.next-btn').addEventListener('click', () => {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        document.querySelector('.quiz-box').classList.add('active')
        quiz.soruIndex += 1;
        showQuestion(quiz.bringQuestion());
    } else {
        console.log("quiz bitti");
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
    document.querySelector(".option-list").innerHTML = options;
}