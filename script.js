// ── Language state ─────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'th';

// ── DOM refs ───────────────────────────────────────────────────────────────────
const startQuiz    = document.querySelector('.start-btn');
const logoImg      = document.querySelector('.logo-img');
const Quizguide    = document.querySelector('.popup-info');
const exitBtn      = document.querySelector('.exit-btn');
const main         = document.querySelector('.main');
const continueBtn  = document.querySelector('.continue-btn');
const quizSection  = document.querySelector('.quiz-section');
const quizBox      = document.querySelector('.quiz-box');
const resultBox    = document.querySelector('.result-box');
const tryAgainBtn  = document.querySelector('.tryAgain-btn');
const goHomeBtn    = document.querySelector('.goHome-btn');
const nextBtn      = document.querySelector('.next-btn');
const backBtn      = document.querySelector('.back-btn');
const optionList   = document.querySelector('.option-list');

// ── Quiz state ─────────────────────────────────────────────────────────────────
let questionCount    = 0;
let questionNumb     = 1;
let userScore        = 0;
let selectedAnswer   = null;
let userAnswers      = {};
let answerStatus     = {};
let Major            = 0;
let Minor            = 0;
let year;
let answeredQuestions = new Set();
let selectedAnswers   = [];
let selectedOption4   = [];
let selectMultiAns    = [];

// ── Helpers ────────────────────────────────────────────────────────────────────
function t() { return LANG[currentLang]; }

function Reset() {
    questionCount     = 0;
    questionNumb      = 1;
    userScore         = 0;
    selectedAnswer    = null;
    userAnswers       = {};
    answerStatus      = {};
    Major             = 0;
    Minor             = 0;
    year              = undefined;
    answeredQuestions = new Set();
    selectedAnswers   = [];
    selectedOption4   = [];
    selectMultiAns    = [];
}

// ── Apply language to all static UI ───────────────────────────────────────────
function applyLang() {
    const L = t();

    // home
    const homeH2 = document.querySelector('.home-content h2');
    const homeH1 = document.querySelector('.home-content h1');
    if (homeH2) homeH2.textContent = L.homeSubtitle;
    if (homeH1) homeH1.innerHTML  = L.homeTitle;
    if (startQuiz) startQuiz.textContent = L.startBtn;

    const aboutLink = document.querySelector('.home-content .aboutme');
    if (aboutLink) aboutLink.textContent = L.aboutBtn;

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) langToggle.textContent = L.langBtn;

    // popup
    const popupTitle = document.querySelector('.popup-info h2');
    const popupInfo  = document.querySelector('.popup-info .info');
    if (popupTitle) popupTitle.textContent = L.popupTitle;
    if (popupInfo)  popupInfo.textContent  = L.popupInfo;
    if (exitBtn)    exitBtn.textContent    = L.popupCancel;
    if (continueBtn) continueBtn.textContent = L.popupStart;

    // quiz box static labels
    const quizTitle = document.querySelector('.quiz-box h1');
    if (quizTitle) quizTitle.textContent = L.quizTitle;
    if (backBtn)  backBtn.textContent  = L.backBtn;
    if (nextBtn)  nextBtn.textContent  = L.nextBtn;

    // footer(s) on index
    document.querySelectorAll('.about-footer').forEach(footer => {
        const ps = footer.querySelectorAll('p');
        if (ps[0]) ps[0].innerHTML = L.footerCopyright;
        if (ps[1]) ps[1].innerHTML = L.footerDev;
    });
}

// ── Show questions ─────────────────────────────────────────────────────────────
function showQuestions(index) {
    const activeQuestions = getQuestions();
    const questionNumbVal = activeQuestions[index].numb;
    const questionText    = document.querySelector('.question-text');
    questionText.textContent = activeQuestions[index].question;

    const existingImage = document.querySelector('.question-image');
    if (existingImage) existingImage.remove();

    if (activeQuestions[index].image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'question-image';
        imageContainer.innerHTML = `<img src="images/${activeQuestions[index].image}" alt="${activeQuestions[index].question}">`;
        imageContainer.onclick = () => {
            openModal(`images/${activeQuestions[index].image}`, activeQuestions[index].question);
        };
        questionText.insertAdjacentElement('afterend', imageContainer);
    }

    optionList.innerHTML = '';

    activeQuestions[index].options.forEach(optionText => {
        let optionTag = document.createElement('div');
        optionTag.classList.add('option');
        optionTag.innerHTML = `<span>${optionText}</span>`;
        optionList.appendChild(optionTag);

        if (activeQuestions[index].numb === 1) {
            optionTag.onclick = () => selectMultipleAnswersForQ1(optionTag, index);
        } else if (activeQuestions[index].numb === 3) {
            optionTag.onclick = () => selectMultipleAnswersForQ3(optionTag, index);
        } else if (activeQuestions[index].numb === 4) {
            optionTag.onclick = () => selectAnswerForQ4(optionTag, index);
        } else {
            optionTag.onclick = () => selectAnswer(optionTag, index);
        }
    });

    const userAnswer = userAnswers[activeQuestions[index].numb];
    if (userAnswer) {
        if (questionNumbVal === 1) {
            selectMultiAns = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(o => o.querySelector('span').textContent === ans);
                if (opt) { opt.style.border = '2px solid #ff6b98'; selectMultiAns.push(opt); }
            });
        } else if (questionNumbVal === 3) {
            selectMultiAns = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(o => o.querySelector('span').textContent === ans);
                if (opt) { opt.style.border = '2px solid #ff6b98'; selectMultiAns.push(opt); }
            });
        } else if (questionNumbVal === 4) {
            selectedOption4 = [];
            userAnswer.forEach(ans => {
                const opt = Array.from(optionList.children).find(o => o.querySelector('span').textContent === ans);
                if (opt) { opt.style.border = '2px solid #ff6b98'; selectedOption4.push(opt); }
            });
        } else {
            const selected = Array.from(optionList.children).find(o => o.querySelector('span').textContent === userAnswer);
            if (selected) { selected.style.border = '2px solid #ff6b98'; selectedAnswer = selected; }
        }

        if (questionNumbVal === 1 || questionNumbVal === 3 || questionNumbVal === 4) {
            if (Array.isArray(userAnswer) && userAnswer.length > 0) {
                nextBtn.classList.add('active');
            } else {
                nextBtn.classList.remove('active');
            }
        } else {
            userAnswer ? nextBtn.classList.add('active') : nextBtn.classList.remove('active');
        }
    } else {
        nextBtn.classList.remove('active');
    }
}

// ── Answer handlers ────────────────────────────────────────────────────────────
function selectAnswerForQ4(option, index) {
    const activeQuestions = getQuestions();
    const optionText = option.querySelector('span').textContent;
    const noAllergyText = t().noAllergy;

    if (optionText) {
        if (optionText === noAllergyText) {
            if (selectedOption4.includes(option)) {
                selectedOption4 = selectedOption4.filter(opt => opt !== option);
                option.style.border = '';
            } else {
                selectedOption4.forEach(opt => opt.style.border = '');
                selectedOption4 = [option];
                option.style.border = '2px solid #ff6b98';
            }
        } else {
            const ans4 = selectedOption4.find(opt => opt.querySelector('span').textContent === noAllergyText);
            if (ans4) {
                selectedOption4 = selectedOption4.filter(opt => opt !== ans4);
                ans4.style.border = '';
            }
            if (selectedOption4.includes(option)) {
                selectedOption4 = selectedOption4.filter(opt => opt !== option);
                option.style.border = '';
            } else if (selectedOption4.length < 2) {
                selectedOption4.push(option);
                option.style.border = '2px solid #ff6b98';
            }
        }
    }

    selectedOption4.length > 0 ? nextBtn.classList.add('active') : nextBtn.classList.remove('active');
    userAnswers[activeQuestions[index].numb] = selectedOption4.map(opt => opt.querySelector('span').textContent);
}

function selectMultipleAnswersForQ3(option, index) {
    const activeQuestions = getQuestions();
    const optionText = option.querySelector('span').textContent;

    if (optionText) {
        if (selectMultiAns.includes(option)) {
            selectMultiAns = selectMultiAns.filter(opt => opt !== option);
            option.style.border = '';
        } else {
            selectMultiAns.push(option);
            option.style.border = '2px solid #ff6b98';
        }
    }

    selectMultiAns.length > 0 ? nextBtn.classList.add('active') : nextBtn.classList.remove('active');
    userAnswers[activeQuestions[index].numb] = selectMultiAns.map(opt => opt.querySelector('span').textContent);
}

function selectMultipleAnswersForQ1(option, index) {
    const activeQuestions = getQuestions();
    const optionText   = option.querySelector('span').textContent;
    const noSymptomText = t().noSymptom;

    if (optionText) {
        if (optionText === noSymptomText) {
            if (selectMultiAns.includes(option)) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== option);
                option.style.border = '';
            } else {
                selectMultiAns.forEach(opt => opt.style.border = '');
                selectMultiAns = [option];
                option.style.border = '2px solid #ff6b98';
            }
        } else {
            const noSymptomOption = selectMultiAns.find(opt => opt.querySelector('span').textContent === noSymptomText);
            if (noSymptomOption) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== noSymptomOption);
                noSymptomOption.style.border = '';
            }
            if (selectMultiAns.includes(option)) {
                selectMultiAns = selectMultiAns.filter(opt => opt !== option);
                option.style.border = '';
            } else if (selectMultiAns.length < 3) {
                selectMultiAns.push(option);
                option.style.border = '2px solid #ff6b98';
            }
        }
    }

    selectMultiAns.length > 0 ? nextBtn.classList.add('active') : nextBtn.classList.remove('active');
    userAnswers[activeQuestions[index].numb] = selectMultiAns.map(opt => opt.querySelector('span').textContent);
}

function selectAnswer(option, index) {
    const activeQuestions = getQuestions();
    if (selectedAnswer) selectedAnswer.style.border = '';
    selectedAnswer = option;
    selectedAnswer.style.border = '2px solid #ff6b98';
    nextBtn.classList.add('active');

    userAnswers[activeQuestions[index].numb] = option.querySelector('span').textContent;

    if (activeQuestions[index].numb === 0) {
        year = option.textContent;
    }

    if (activeQuestions[index].numb === 1 || activeQuestions[index].numb === 3 || activeQuestions[index].numb === 4) {
        userAnswers[index] = Array.isArray(userAnswers[index]) ? userAnswers[index] : [];
        const answerText = option.querySelector('span').textContent;
        if (!userAnswers[index].includes(answerText)) userAnswers[index].push(answerText);
    } else {
        userAnswers[activeQuestions[index].numb] = option.querySelector('span').textContent;
    }
}

// ── Score update ───────────────────────────────────────────────────────────────
function updateScore(questionIndex, isCorrect) {
    const activeQuestions = getQuestions();
    const question = activeQuestions[questionIndex];
    const type = questionTypes[question.numb];

    if (answerStatus.hasOwnProperty(activeQuestions[questionIndex].numb)) {
        const prev = answerStatus[activeQuestions[questionIndex].numb];
        if (prev && !isCorrect) {
            type === 'Major' ? Major-- : Minor--;
        } else if (!prev && isCorrect) {
            type === 'Major' ? Major++ : Minor++;
        }
    } else {
        if (isCorrect) {
            type === 'Major' ? Major++ : Minor++;
        }
    }

    answerStatus[activeQuestions[questionIndex].numb] = isCorrect;
}

// ── Question counter ───────────────────────────────────────────────────────────
function questionCounter(index) {
    const activeQuestions = getQuestions();
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = t().questionCounter(index, activeQuestions.length);
}

// ── Next button ────────────────────────────────────────────────────────────────
nextBtn.onclick = () => {
    const activeQuestions = getQuestions();
    if (selectedAnswer || selectedOption4.length > 0 || selectMultiAns.length > 0) {
        const questionIndex = questionCount;
        const questionn     = activeQuestions[questionIndex];
        let isCorrect       = false;
        const firstRashText = t().firstRash;

        if (questionn.numb === 2) {
            if (userAnswers[questionIndex] === firstRashText) {
                const exists = activeQuestions.some(q => q.numb === 2.1);
                if (!exists) {
                    activeQuestions.splice(questionIndex + 1, 0, getQuestion21());
                }
            } else {
                const indexToRemove = activeQuestions.findIndex(q => q.numb === 2.1);
                if (indexToRemove !== -1) {
                    if (answerStatus[activeQuestions[indexToRemove].numb]) {
                        Major--;
                        delete answerStatus[activeQuestions[indexToRemove].numb];
                        delete userAnswers[activeQuestions[indexToRemove].numb];
                    }
                    activeQuestions.splice(indexToRemove, 1);
                }
            }
        }

        const noSymptomText = t().noSymptom;
        const noAllergyText = t().noAllergy;

        if (questionn.numb === 1) {
            const hasNoSymptom = selectMultiAns.some(opt => opt.querySelector('span').textContent === noSymptomText);
            isCorrect = !hasNoSymptom && selectMultiAns.length > 0;

        } else if (questionn.numb === 2 && userAnswers[questionIndex] !== firstRashText) {
            isCorrect = true;

        } else if (questionn.numb === 3) {
            if (year && year.includes(currentLang === 'en' ? 'Less than 2' : 'น้อยกว่า 2 ปี')) {
                questionn.answer = currentLang === 'en'
                    ? ['Face/ Cheeks', 'Arms or legs (outer side)']
                    : ['ใบหน้า/แก้ม', 'ด้านนอกของแขน หรือ ขา'];
            } else if (year && year.includes(currentLang === 'en' ? 'More than 2' : 'มากกว่า 2 ปี')) {
                questionn.answer = currentLang === 'en'
                    ? ['Arms or legs (inner side)', 'Neck folds / Armpits']
                    : ['ข้อพับแขน หรือ ขา', 'ซอกพับคอ รักแร้'];
            }
            isCorrect = selectMultiAns.some(ans => questionn.answer.includes(ans.querySelector('span').textContent));

        } else if (questionn.numb === 4) {
            const hasNoAllergy = selectedOption4.some(opt => opt.querySelector('span').textContent === noAllergyText);
            isCorrect = !hasNoAllergy && selectedOption4.length > 0;

        } else if (Array.isArray(questionn.answer)) {
            isCorrect = questionn.answer.every(ans => userAnswers[activeQuestions[questionIndex].numb].includes(ans));
        } else {
            isCorrect = questionn.answer.includes(userAnswers[activeQuestions[questionIndex].numb]);
        }

        updateScore(questionIndex, isCorrect);

        selectedOption4  = [];
        selectedAnswer   = null;
        selectMultiAns   = [];

        if (questionCount < activeQuestions.length - 1) {
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

// ── Back button ────────────────────────────────────────────────────────────────
backBtn.onclick = () => {
    if (questionCount > 0) {
        questionCount--;
        questionNumb--;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        if (questionNumb === 1) backBtn.classList.remove('active');
    }
};

// ── Result box ─────────────────────────────────────────────────────────────────
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const L = t();
    const isMet = Major >= 3 && Minor >= 3;

    const resultMessage     = isMet ? L.resultPositive     : L.resultNegative;
    const resultDescription = isMet ? L.resultDescPositive : L.resultDescNegative;
    const statusClass       = isMet ? 'status-positive'    : 'status-negative';

    const recommendItems = L.recommendList.map(item => `<li>${item}</li>`).join('');
    const resultRecommend = `
        <h4>${L.recommendTitle}</h4>
        <ul class="recommend-list">${recommendItems}</ul>
    `;

    const linkItems = L.resultLinks.map(link => `
        <a href="${link.url}" target="_blank">
            <img src="${link.icon}" alt="" class="link-icon"> ${link.label}
        </a>
    `).join('');
    const resultLinks = `
        <div class="result-links">
            <h3>${L.resultLinksTitle}</h3>
            <div class="link-container">${linkItems}</div>
        </div>
    `;

    resultBox.innerHTML = `
        <h2>${L.resultTitle}</h2>
        <div class="result-status ${statusClass}">${resultMessage}</div>
        <div class="result-description">${resultDescription}</div>
        <div class="result-recommend">${resultRecommend}</div>
        ${resultLinks}
        <div class="buttons">
            <button class="tryAgain-btn">${L.tryAgainBtn}</button>
            <button class="goHome-btn">${L.goHomeBtn}</button>
        </div>
        <footer class="about-footer">
            <p>${L.footerCopyright}</p>
            <p>${L.footerDev}</p>
        </footer>
    `;

    document.querySelector('.tryAgain-btn').onclick = tryAgainBtn.onclick;
    document.querySelector('.goHome-btn').onclick   = goHomeBtn.onclick;
}

// ── Try again / Go home ────────────────────────────────────────────────────────
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    Reset();
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    Reset();
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

// ── Popup / Start ──────────────────────────────────────────────────────────────
startQuiz.onclick = () => {
    Quizguide.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    Quizguide.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    Quizguide.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
};

// ── Language toggle ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    applyLang();

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'th' ? 'en' : 'th';
            localStorage.setItem('lang', currentLang);

            // Reset questions array to fresh copy of correct language
            Reset();
            applyLang();
            showQuestions(0);
            questionCounter(1);
        });
    }
});

// ── Modal ──────────────────────────────────────────────────────────────────────
function openModal(src, altText) {
    const modal      = document.getElementById('imageModal');
    const modalImg   = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src  = src;
    modalImg.alt  = altText;
    captionText.textContent = altText;

    modal.querySelector('.close').onclick = () => { modal.style.display = 'none'; };
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.key === 'Escape' && modal.style.display === 'block') modal.style.display = 'none';
});
