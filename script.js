const startQuiz = document.querySelector('.start-btn');
const Quizguide = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let selectedAnswer = null;
let userAnswers = [];
let Major = 0;
let Minor = 0;
let year
let answeredQuestions = new Set();
let selectedAnswers = [];
let selectedOption4 = []; 


//function แสดงคำถาม loop คำถามแต่ละข้อจากไฟล์  questions.js
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    optionList.innerHTML = "";

    questions[index].options.forEach(optionText => {
        let optionTag = document.createElement('div');
        optionTag.classList.add('option');
        optionTag.innerHTML = `<span>${optionText}</span>`;
        optionList.appendChild(optionTag);

        if (questions[index].numb === 4) {
            optionTag.onclick = () => selectAnswerForQ4(optionTag, index)
        } else {

            optionTag.onclick = () => selectAnswer(optionTag, index);
        }
    });
}

function selectAnswerForQ4(option, index) {
    if (selectedOption4.includes(option)) {
        // หากเลือกตัวเลือกนี้แล้ว ให้เอาออกจาก selectedOption4 และเอากรอบสีออก
        selectedOption4 = selectedOption4.filter(ans => ans !== option);
        option.style.border = "";  // เอากรอบสีออก
    } else if (selectedOption4.length < 2) {
        selectedOption4.push(option);
        option.style.border = "2px solid #ffd700";  // กำหนดกรอบสี
    } 
    
    if (selectedOption4.length > 0) {
        nextBtn.classList.add('active');
    } else {
        nextBtn.classList.remove('active');
    }
}

// ฟังก์ชันเช็คคำตอบที่เลือก
function selectAnswer(option, index) {
    if (selectedAnswer) {
        selectedAnswer.style.border = "";
    }
    selectedAnswer = option;  // กำหนดคำตอบที่เลือกใหม่
    selectedAnswer.style.border = "2px solid #ffd700";  // กำหนดสีกรอบใหม่
    nextBtn.classList.add('active');

    let Article = questions[index].numb;
    userAnswers[index] = option.textContent;

    if (Article === 0) {
        year = option.textContent;
    } else if (Article === 3) {
        if (year.includes("A. อายุน้อยกว่า 2 ปี")) {
            questions[index].answer = ["A. ใบหน้า/แก้ม", "D. ด้านนอกของแขน และ ขา"];
        } else if (year.includes("B. อายุมากกว่า 2 ปี")) {
            questions[index].answer = ["F. ข้อพับแขน", "G. ข้อพับขา"];
        }
    }

}

//function ผลลัพท์
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');

    if (Major >= 3 && Minor >= 3) {
        // scoreText.textContent = `Major: ${Major} Minor: ${Minor}`;
        scoreText.textContent = "คุณมีความเสี่ยงเป็นโรคผิวหนัง"
    } else {
        scoreText.textContent = "คุณไม่มีความเสี่ยงเป็นโรคผิวหนัง"
    }
}

//function ข้อต่อไป + เพิ่มคะแนน
nextBtn.onclick = () => {
    if (selectedAnswer || selectedOption4.length > 0) {
        const questionIndex = questionCount;
        const questionn = questions[questionIndex];
        const corrects = questionn.answer

        if (userAnswers[questionIndex] === "A. เป็นผื่นลักษณะนี้ครั้งแรก") {
            questions.splice(3, 0, {
                numb: 2.1,
                type: "Major",
                question: "มีผื่นลักษณะนี้มานานหรือยัง",
                options: [
                    "A. 1-2 สัปดาห์",
                    "B. 3-4 สัปดาห์",
                    "C. 1-3 เดือน",
                    "D. 3-6 เดือน"
                ],
                answer: [
                    "B. 3-4 สัปดาห์",
                    "C. 1-3 เดือน",
                    "D. 3-6 เดือน"
                ]
            });
        }

        if (corrects.includes(userAnswers[questionIndex])) {
            if (!answeredQuestions.has(questionIndex)) {
                if (questionn.type === "Major") {
                    Major++;
                } else {
                    Minor++;
                }
                answeredQuestions.add(questionIndex);
            }
        }

        if (selectedOption4.length > 0) {  
            const correctSelections = selectedOption4.filter(ans => questions[questionIndex].answer.includes(ans.textContent));
            if (correctSelections.length === 2 || correctSelections.length === 1) {
                Major++;
            } 
        }
        selectedOption4 = []; 
        selectedAnswer = null;

        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);
            nextBtn.classList.remove('active');
        } else {
            showResultBox();
        }
    }
};

//function เลขคำถามตอนทำ Quize 
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} จาก ${questions.length} คำถาม`;
}

//function ลองใหม่อีกครั้งหลังทำ Quiz
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    selectedAnswer = null;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    
}

//function กลับมาหน้าแรกหลังทำ Quiz
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    selectedAnswer = null;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    
}

//function ปุ่ม เริ่มทำQuiz
startQuiz.onclick = () => {
    Quizguide.classList.add('active');
    main.classList.add('active');
}

//function ปุ่มออก
exitBtn.onclick = () => {
    Quizguide.classList.remove('active');
    main.classList.remove('active');
}

//function ปุ่มไปต่อไปหน้า Quiz Guize
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    Quizguide.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    
}