function Question(questionText, answerOptions, trueAnswer) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.trueAnswer = trueAnswer;
}

Question.prototype.checkAnswer = function(answer) {
    return answer === this.trueAnswer
}


let questionsAll = [
    new Question("1-Which is the javascript package management application?", { a: "Node.js", b: "Typescript", c: "Npm" }, "a"),
    new Question("2-Which is the most popular language in the world right now?", { a: "Java Script", b: "Python", c: "Java" }, "a"),
    new Question("3-Which one is used for clean code?", { a: "Angular", b: "Typescript", c: "React" }, "b"),
    new Question("4-What language does the Macos operating system use?", { a: "Java", b: "C++", c: "Swift" }, "c"),
    new Question("5-When was the java language created?", { a: "1997", b: "1995", c: "1993" }, "b")
];