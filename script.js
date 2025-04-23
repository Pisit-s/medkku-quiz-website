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
const backBtn = document.querySelector('.back-btn');
const optionList = document.querySelector('.option-list');
const aboutBtn = document.querySelector('.back-button.aboutme')

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let selectedAnswer = null;
let userAnswers = {};
let answerStatus = {};
let Major = 0;
let Minor = 0;
let year
let answeredQuestions = new Set();
let selectedAnswers = [];
let selectedOption4 = []; 
let selectMultiAns = [];

function Reset() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    selectedAnswer = null;
    userAnswers = {};
    answerStatus = {};
    Major = 0;
    Minor = 0;
    year
    answeredQuestions = new Set();
    selectedAnswers = [];
    selectedOption4 = []; 
    selectMultiAns = [];
    if (aboutBtn) {
        aboutBtn.classList.remove('hidden')
    }
}

function showQuestions(index , hideAboutBtn = true) {
    const questionNumb = questions[index].numb
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].question}`;
    
    if (hideAboutBtn && aboutBtn) {
        aboutBtn.classList.add('hidden')
    }

    const existingImage = document.querySelector('.question-image');
    if (existingImage) {
        existingImage.remove();
    }
    
    if (questions[index].image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'question-image';
        imageContainer.innerHTML = `<img src="images/${questions[index].image}" alt="${questions[index].question}">`;
        questionText.insertAdjacentElement('afterend', imageContainer);
    }

    optionList.innerHTML = "";

    questions[index].options.forEach(optionText => {
        let optionTag = document.createElement('div');
        optionTag.classList.add('option');
        optionTag.innerHTML = `<span>${optionText}</span>`;
        optionList.appendChild(optionTag);

        if (questions[index].numb === 1) {
            optionTag.onclick = () => selectMultipleAnswersForQ1(optionTag, index);
        } else if (questions[index].numb === 3) {
            optionTag.onclick = () => selectMultipleAnswersForQ3(optionTag, index);
        } else if (questions[index].numb === 4) {
            optionTag.onclick = () => selectAnswerForQ4(optionTag, index);
        } else {
            optionTag.onclick = () => selectAnswer(optionTag, index);
        }
    });

    const userAnswer = userAnswers[questions[index].numb];
    if (userAnswer) {
        if (questionNumb === 1) {
            selectMultiAns = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(option => option.querySelector('span').textContent === ans);
                if (opt) {
                    opt.style.border = "2px solid #ff6b98";
                    selectMultiAns.push(opt);
                }
            });
        } else if (questionNumb === 3) {
            selectMultiAns = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(option => option.querySelector('span').textContent === ans);
                if (opt) {
                    opt.style.border = "2px solid #ff6b98";
                    selectMultiAns.push(opt);
                }
            });
        } else if (questionNumb === 4) {
            selectedOption4 = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(option => option.querySelector('span').textContent === ans);
                if (opt) {
                    opt.style.border = "2px solid #ff6b98";
                    selectedOption4.push(opt);
                }
            });
        } else {
            const selected = Array.from(optionList.children).find(option => option.querySelector('span').textContent === userAnswer);
            if (selected) {
                selected.style.border = "2px solid #ff6b98";
                selectedAnswer = selected;
            }
        }

        if (questionNumb === 1 || questionNumb === 3 || questionNumb === 4) {
            if (Array.isArray(userAnswer) && userAnswer.length > 0) {
                nextBtn.classList.add('active');
            } else {
                nextBtn.classList.remove('active');
            }
        } else {
            if (userAnswer) {
                nextBtn.classList.add('active');
            } else {
                nextBtn.classList.remove('active');
            }
        }
    } else {
        nextBtn.classList.remove('active');
    }
}

function selectAnswerForQ4(option, index) {
    const optionText = option.querySelector('span').textContent;
    
    if (optionText) {
        if (optionText === "ไม่มีประวัติภูมิแพ้") {
            if (selectedOption4.includes(option)) {
                selectedOption4 = selectedOption4.filter(opt => opt !== option);
                option.style.border = "";
            } else {
                selectedOption4.forEach(opt => opt.style.border = "");
                selectedOption4 = [option];
                option.style.border = "2px solid #ff6b98";
            }
        } else {
            const ans4 = selectedOption4.find(opt => opt.querySelector('span').textContent === "ไม่มีประวัติภูมิแพ้");
            if (ans4) {
                selectedOption4 = selectedOption4.filter(opt => opt !== ans4);
                ans4.style.border = "";
            }

            if (selectedOption4.includes(option)) {
                selectedOption4 = selectedOption4.filter(opt => opt !== option);
                option.style.border = "";
            } else if (selectedOption4.length < 2) {
                selectedOption4.push(option);
                option.style.border = "2px solid #ff6b98";
            }
        }
    }

    if (selectedOption4.length > 0) {
        nextBtn.classList.add('active');
    } else {
        nextBtn.classList.remove('active');
    }

    userAnswers[questions[index].numb] = selectedOption4.map(opt => opt.querySelector('span').textContent);
}

function selectMultipleAnswersForQ3(option, index) {
    const optionText = option.querySelector('span').textContent;

    if (optionText) {
        if (selectMultiAns.includes(option)) {
            selectMultiAns = selectMultiAns.filter(opt => opt !== option);
            option.style.border = "";
        } else {
            selectMultiAns.push(option);
            option.style.border = "2px solid #ff6b98";
        }
    }

    if (selectMultiAns.length > 0) {
        nextBtn.classList.add('active');
    } else {
        nextBtn.classList.remove('active');
    }

    userAnswers[questions[index].numb] = selectMultiAns.map(opt => opt.querySelector('span').textContent);
}

function selectMultipleAnswersForQ1(option, index) {
    const optionText = option.querySelector('span').textContent;

    if (optionText) {
        if (optionText === "ไม่มีอาการดังกล่าว") {
            if (selectMultiAns.includes(option)) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== option);
                option.style.border = "";
            } else {
                selectMultiAns.forEach(opt => opt.style.border = "");
                selectMultiAns = [option];
                option.style.border = "2px solid #ff6b98";
            }
        } else {
            const noSymptomOption = selectMultiAns.find(opt => opt.querySelector('span').textContent === "ไม่มีอาการดังกล่าว");
            if (noSymptomOption) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== noSymptomOption);
                noSymptomOption.style.border = "";
            }

            if (selectMultiAns.includes(option)) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== option);
                option.style.border = "";
            } else if (selectMultiAns.length < 3) {
                selectMultiAns.push(option);
                option.style.border = "2px solid #ff6b98";
            }
        }
    }

    
    if (selectMultiAns.length > 0) {
        nextBtn.classList.add('active');
    } else {
        nextBtn.classList.remove('active');
    }

    userAnswers[questions[index].numb] = selectMultiAns.map(opt => opt.querySelector('span').textContent);
} 

function selectAnswer(option, index) {
    if (selectedAnswer) {
        selectedAnswer.style.border = "";
    }
    selectedAnswer = option;  
    selectedAnswer.style.border = "2px solid #ff6b98";  
    nextBtn.classList.add('active');

    userAnswers[questions[index].numb] = option.querySelector('span').textContent;

    if (questions[index].numb === 0) {
        year = option.textContent;
        if (year === "< 2 ปี") {
            console.log('คำตอบข้อที่ 0 คุณคือ < 2 ปี')
            console.log("\tคำตอบข้อ 3 คือ ข้อพับแขน , ข้อพับขา")
        } else if (year === "> 2 ปี") {
            console.log("คำตอบข้อที่ 0 คุณคือ > 2 ปี")
            console.log("\tคำตอบข้อ 3 คือ ใบหน้า/แก้ม , ด้านนอกของแขน/ขา")
        }
    }

    if (questions[index].numb === 1 || questions[index].numb === 3 || questions[index].numb === 4) {
        userAnswers[index] = Array.isArray(userAnswers[index]) ? userAnswers[index] : [];
        const answerText = option.querySelector('span').textContent;
        if (!userAnswers[index].includes(answerText)) {
            userAnswers[index].push(answerText);
        }
    } else {
        userAnswers[questions[index].numb] = option.querySelector('span').textContent;
    }
}

function updateScore(questionIndex, isCorrect) {
    const question = questions[questionIndex];
    const type = questionTypes[question.numb];

    if (answerStatus.hasOwnProperty(questions[questionIndex].numb)) {
        const previousCorrectness = answerStatus[questions[questionIndex].numb];

        if (previousCorrectness && !isCorrect) { 
            if (type === "Major") {
                Major--;
                console.log(`Major ถูกลบ: ${Major}`);
            } else {
                Minor--;
                console.log(`Minor ถูกลบ: ${Minor}`);
            }
        } else if (!previousCorrectness && isCorrect) { 
            if (type === "Major") {
                Major++;
                console.log(`Major ถูกเพิ่ม: ${Major}`);
            } else {
                Minor++;
                console.log(`Minor ถูกเพิ่ม: ${Minor}`);
            }
        }
    } else {
        if (isCorrect) {
            if (type === "Major") {
                Major++;
                console.log(`Major ถูกเพิ่ม (ครั้งแรก): ${Major}`);
            } else {
                Minor++;
                console.log(`Minor ถูกเพิ่ม (ครั้งแรก): ${Minor}`);
            }
        }
    }

    answerStatus[questions[questionIndex].numb] = isCorrect;
}

nextBtn.onclick = () => {
    if (selectedAnswer || selectedOption4.length > 0 || selectMultiAns.length > 0) {
        const questionIndex = questionCount;
        const questionn = questions[questionIndex];
        let isCorrect = false;

        if (questionn.numb === 2) {
            if (userAnswers[questionIndex] === "เป็นผื่นลักษณะนี้ครั้งแรก") {
                const exists = questions.some(q => q.numb === 2.1);
                if (!exists) {
                    questions.splice(questionIndex + 1, 0, Question21);
                }
            } else {
                const indexToRemove = questions.findIndex(q => q.numb === 2.1);
                if (indexToRemove !== -1) {
                    
                    if (answerStatus[questions[indexToRemove].numb]) {
                        Major--;
                        console.log("ลบคะแนนที่ได้ข้อ 2.1:") 
                        delete answerStatus[questions[indexToRemove].numb];
                        delete userAnswers[questions[indexToRemove].numb];
                    }
                    
                    questions.splice(indexToRemove, 1);
                }
            }
        }

        if (questionn.numb === 1) {
            const Secttion1 = selectMultiAns.some(opt => opt.querySelector('span').textContent === "ไม่มีอาการดังกล่าว");
            if (Secttion1) {
                isCorrect = false; 
            } else {
                isCorrect = selectMultiAns.length > 0; 
            }
        } else if (questionn.numb === 2 && userAnswers[questionIndex] !== "เป็นผื่นลักษณะนี้ครั้งแรก") {
            isCorrect = true;
        } else if (questionn.numb === 3) {
            if (year.includes("> 2 ปี")) {
                questionn.answer = ["ใบหน้า/แก้ม", "ด้านนอกของแขน และ ขา"];
            } else if (year.includes("< 2 ปี")) {
                questionn.answer = ["ข้อพับแขน", "ข้อพับขา"];
            }
            isCorrect = selectMultiAns.some(ans => questionn.answer.includes(ans.querySelector('span').textContent));
        } else if (questionn.numb === 4) {
            const hasNoAllergy = selectedOption4.some(opt => opt.querySelector('span').textContent === "ไม่มีประวัติภูมิแพ้");
            if (hasNoAllergy) {
                isCorrect = false;
            } else {
                isCorrect = selectedOption4.length > 0;
            }
        } else if (Array.isArray(questionn.answer)) {
            isCorrect = questionn.answer.every(ans => userAnswers[questions[questionIndex].numb].includes(ans));
        } else {
            isCorrect = questionn.answer.includes(userAnswers[questions[questionIndex].numb]);
        }

        updateScore(questionIndex, isCorrect);

        selectedOption4 = [];
        selectedAnswer = null;
        selectMultiAns = [];

        console.log(`Major: ${Major}, Minor: ${Minor}`);

        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestions(questionCount);
            questionNumb++;
            questionCounter(questionNumb);
        } else {
            showResultBox();
        }

        backBtn.classList.add('active');
    }
};

backBtn.onclick = () => {
    if (questionCount > 0) {
        questionCount--;
        questionNumb--;
        showQuestions(questionCount); 
        questionCounter(questionNumb); 
        if (questionNumb === 1) {
            backBtn.classList.remove('active');
        }
    }
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} จาก ${questions.length} คำถาม`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    let resultMessage = '';
    let resultLinks = '';

    if (Major >= 3 && Minor >= 3) {
        resultMessage = "เข้าข่าย";
        resultDescription = "ผื่นที่เป็นเข้าเกณฑ์การวินิจฉัยผื่นภูมิแพ้ผิวหนัง แนะนำให้ไปพบแพทย์เพื่อยืนยันการวินิจฉัยโรคและวางแผนการรักษาต่อไป";
        resultRecommend = "คำแนะนำ<br> - หลีกเลี่ยงการงดอาหารโดยไม่จำเป็น<br>- ทาสารให้ความชุ่มชื้นได้<br>- ไม่ควรรักษาผื่นเอง<br>- แนะนำให้ไปพบแพทย์เพื่อยืนยันการวินิจฉัยและรักษาโรค";
        statusClass = "status-positive";
    } else {
        resultMessage = "ไม่เข้าข่าย";
        resultDescription = "ผื่นที่เป็นยังไม่เข้าเกณฑ์การวินิจฉัยผื่นภูมิแพ้ผิวหนัง ให้ติดตามอาการของผื่นหากมีอาการผื่นเป็นซ้ำให้ทำแบบประเมินซ้ำอีกครั้ง หรือปรึกษาพบแพทย์เพื่อยืนยันการวินิจฉัยโรค";
        resultRecommend = "คำแนะนำ<br> - หลีกเลี่ยงการงดอาหารโดยไม่จำเป็น<br>- ทาสารให้ความชุ่มชื้นได้<br>- ไม่ควรรักษาผื่นเอง<br>- แนะนำให้ไปพบแพทย์เพื่อยืนยันการวินิจฉัยและรักษาโรค";
        statusClass = "status-negative";
    }

    resultLinks = `
        <div class="result-links">
            <h3>หากท่านสนใจศึกษาหาข้อมูลเพิ่มเติมในการดูแลผิวหนังเบื้องต้นสามารถเข้าไปชมเพิ่มเติมได้ที่</h3>
            <div class="link-container">
                <a href="https://youtu.be/kMKpU2Bu2RY?si=S0FikkwDx7g260KG" target="_blank">
                    🏥 ข้อควรรู้เกี่ยวกับการหลีกเลี่ยงปัจจัยกระตุ้น
                </a>
                <a href="https://youtu.be/KGcZMS4hk0U?si=3JS7mXRr-8A_pDgl" target="_blank">
                    📋 แนวทางการดูแลรักษาโรคผื่นภูมิแพ้ผิวหนัง
                </a>
                <a href="https://youtu.be/YTOcUgwbzUk?si=uDH6_Wg150QaMA3e" target="_blank">
                    💊 ยาทาสเตียรอยด์และยาทาต้านการอักเสบอื่นๆ
                </a>
                <a href="https://youtu.be/EoSOHvYs_Ts?si=l2zQwg1139bHadSD" target="_blank">
                    ℹ️ การดูแลผิวในโรคผื่นภูมิแพ้ผิวหนัง
                </a>
            </div>
        </div>
    `;

    resultBox.innerHTML = `
        <h2>ผลการวินิจฉัยเบื้องต้น</h2>
        <div class="result-status ${statusClass}">${resultMessage}</div>
        <div class="result-description">${resultDescription}</div>
        <div class="result-recommend">${resultRecommend}</div>
        ${resultLinks}
        <div class="buttons">
            <button class="tryAgain-btn">ลองอีกครั้ง</button>
            <button class="goHome-btn">กลับหน้าแรก</button>
        </div>
    `;

    document.querySelector('.tryAgain-btn').onclick = tryAgainBtn.onclick;
    document.querySelector('.goHome-btn').onclick = goHomeBtn.onclick;
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    console.log('ทำอีกครั้ง')
    Reset();
    showQuestions(questionCount, false);
    questionCounter(questionNumb);
    
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    console.log('กลับหน้าแรก')
    Reset();
    showQuestions(questionCount);
    questionCounter(questionNumb);
    
}

startQuiz.onclick = () => {
    Quizguide.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    Quizguide.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    Quizguide.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);   
}

function imageShow() {
    
}