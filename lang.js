const LANG = {
    th: {
        // index.html - home section
        homeSubtitle: "แบบทดสอบเบื้องต้น",
        homeTitle: "สำหรับการวินิจฉัย<br>โรคผื่นภูมิแพ้ผิวหนัง",
        startBtn: "เริ่มทำแบบทดสอบ",
        aboutBtn: "เกี่ยวกับเรา",
        langBtn: "English",

        // popup
        popupTitle: "มาเริ่มทำแบบคัดกรองกัน !!",
        popupInfo: "แบบคัดกรองนี้เป็นการประเมินเบื้องต้น ในการวินิจฉัยโรคผื่นภูมิแพ้ผิวหนัง ลักษณะแบบคัดกรอง เป็นข้อมูลถามตอบ เกี่ยวกับอาการของผื่นที่ท่านเป็น ใช้เวลาในการทำแบบคัดกรอง ประมาณ 1-2 นาที",
        popupCancel: "ยกเลิก",
        popupStart: "เริ่มกันเลย",

        // quiz
        quizTitle: "แบบทดสอบเพื่อการวินิจฉัยเบื้องต้น",
        backBtn: "ย้อนกลับ",
        nextBtn: "ต่อไป",
        questionCounter: (cur, total) => `${cur} จาก ${total} คำถาม`,

        // result
        resultTitle: "ผลการวินิจฉัยเบื้องต้น",
        resultPositive: "เข้าเกณฑ์",
        resultNegative: "ไม่เข้าเกณฑ์",
        resultDescPositive: "จากผลการทำแบบทดสอบเบื้องต้น ผื่นที่เป็นเข้าเกณฑ์การวินิจฉัยผื่นภูมิแพ้ผิวหนัง แนะนำให้ไปพบแพทย์เพื่อยืนยันการวินิจฉัยโรคและวางแผนการรักษาต่อไป",
        resultDescNegative: "จากผลการทำแบบทดสอบเบื้องต้น ผื่นที่เป็นยังไม่เข้าเกณฑ์การวินิจฉัยผื่นภูมิแพ้ผิวหนัง ให้ติดตามอาการของผื่นหากมีอาการผื่นเป็นซ้ำให้ทำแบบประเมินซ้ำอีกครั้ง หรือปรึกษาพบแพทย์เพื่อยืนยันการวินิจฉัยโรค",
        recommendTitle: "คำแนะนำ",
        recommendList: [
            "ไม่แนะนำให้รักษาผื่นเอง แนะนำให้พบแพทย์เฉพาะทางผิวหนังเพื่อยืนยันการวินิจฉัยและรักษาโรค",
            "ไม่แนะนำให้งดอาหารโดยไม่จำเป็นในทุกกรณี หากยังไม่ได้รับการทดสอบยืนยันจากแพทย์เฉพาะทาง",
            "การงดอาหารก่อนการทดสอบยืนยัน อาจส่งผลให้เกิดภาวะการขาดสารอาหารหลายประเภทโดยไม่จำเป็น",
            "ท่านสามารถทาสารเพิ่มความชุ่มชื้นผิวหนังได้ โดยสามารถศึกษาเพิ่มเติมได้จากข้อมูลด้านล่าง"
        ],
        resultLinksTitle: "ท่านสามารถศึกษาข้อมูลเกี่ยวกับการดูแลรักษาโรคผื่นภูมิแพ้ผิวหนังเบื้องต้น โดยสามารถรับชมจากวีดิทัศน์ในหัวข้อต่างๆ ด้านล่างนี้",
        resultLinks: [
            { icon: "icons/5.png", url: "https://youtu.be/EoSOHvYs_Ts?si=l2zQwg1139bHadSD", label: "การดูแลผิวในโรคผื่นภูมิแพ้ผิวหนัง" },
            { icon: "icons/6.png", url: "https://youtu.be/KGcZMS4hk0U?si=3JS7mXRr-8A_pDgl", label: "แนวทางการดูแลรักษาโรคผื่นภูมิแพ้ผิวหนัง" },
            { icon: "icons/7.png", url: "https://youtu.be/kMKpU2Bu2RY?si=S0FikkwDx7g260KG", label: "ข้อควรรู้เกี่ยวกับการหลีกเลี่ยงปัจจัยกระตุ้น" },
            { icon: "icons/8.png", url: "https://youtu.be/YTOcUgwbzUk?si=uDH6_Wg150QaMA3e", label: "ยาทาสเตียรอยด์และยาทาต้านการอักเสบอื่นๆ" }
        ],
        tryAgainBtn: "ลองอีกครั้ง",
        goHomeBtn: "กลับหน้าแรก",

        // footer
        footerCopyright: '© Copyright <a href="about.html" target="_blank" class="highlight-primary">KKU ADBot</a> All Rights Reserved',
        footerDev: 'Developed by <a href="https://mypisit.com" target="_blank" class="highlight-secondary">mypisit.com</a>',

        // about.html
        aboutTitle: "KKU ADBot",
        aboutH2: "เกี่ยวกับ KKU ADBot",
        aboutDesc: "KKU AD Bot เป็นเว็บไซต์ที่ถูกพัฒนาขึ้น เพื่อใช้ในการคัดกรองและวินิจฉัยโรคผื่นภูมิแพ้ผิวหนัง (Atopic dermatitis; AD) เบื้องต้นด้วยตนเอง ลักษณะแบบคัดกรองเป็นข้อมูลชุดคำถาม ในลักษณะการถามตอบเกี่ยวกับอาการของผื่น โดยชุดคำถามเหล่านี้อ้างอิงตามเกณฑ์การวินิจฉัยโรคผื่นภูมิแพ้ผิวหนังของ Hanafin and Rajka Diagnostic Criteria for Atopic dermatitis โดยถูกปรับให้อยู่ในเว็บไซต์รูปแบบอิเล็กทรอนิกส์ ที่พัฒนาโดยอาจารย์ประจำหน่วยโรคผิวหนัง สาขาวิชากุมารเวชศาสตร์ คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น ร่วมกับอาจารย์ประจำภาควิชาวิศวกรรมศาสตร์คอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น",
        teamTitle: "ผู้พัฒนา KKU ADBot",
        backToHome: "กลับหน้าหลัก",
        team: [
            {
                img: "about/3.png", alt: "leelawadee",
                email: "leelawadee@kku.ac.th",
                name: "ศ.พญ.ลีลาวดี เตชาเสถียร",
                role: "อาจารย์ประจำหน่วยผิวหนัง<br>สาขากุมารเวชศาสตร์",
                faculty: "คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น"
            },
            {
                img: "about/4.png", alt: "piyaaratrat",
                email: "piyaas@kku.ac.th",
                name: "อ.พญ.ปิยะดารัตน์ อัศวะสกุลโชคดี",
                role: "อาจารย์ประจำหน่วยผิวหนัง<br>สาขากุมารเวชศาสตร์",
                faculty: "คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น"
            },
            {
                img: "about/2.png", alt: "wanida",
                email: "wanida@kku.ac.th",
                name: "ศ.ดร.วนิดา แก่นอากาศ",
                role: "อาจารย์ประจำภาควิชาวิศวกรรมคอมพิวเตอร์",
                faculty: "คณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น"
            },
            {
                img: "about/1.png", alt: "pisit",
                email: "pisit.sr@kkumail.com",
                name: "นายพิสิษฐ์ ศรีชำนาจ",
                role: "นักศึกษาสาขาวิชาวิศวกรรมคอมพิวเตอร์",
                faculty: "คณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น"
            }
        ],

        // exclusive options used in logic checks
        noSymptom: "ไม่มีอาการดังกล่าว",
        noAllergy: "ไม่มีประวัติภูมิแพ้",
        firstRash: "เป็นผื่นลักษณะนี้ครั้งแรก",
    },

    en: {
        // index.html - home section
        homeSubtitle: "Screening test",
        homeTitle: "for Atopic Dermatitis",
        startBtn: "Let's get start",
        aboutBtn: "About us",
        langBtn: "ไทย",

        // popup
        popupTitle: "Let's start the screening!",
        popupInfo: "This screening is a basic assessment to help check for eczema (atopic dermatitis). It is a simple question-and-answer form about the rash symptoms you have. It takes about 1–2 minutes to complete.",
        popupCancel: "Back",
        popupStart: "Start",

        // quiz
        quizTitle: "Screening test",
        backBtn: "Back",
        nextBtn: "Next",
        questionCounter: (cur, total) => `${cur} of ${total} Questions`,

        // result
        resultTitle: "Results",
        resultPositive: "Suspected Atopic Dermatitis",
        resultNegative: "Not consistent with Atopic Dermatitis",
        resultDescPositive: "From the results of the preliminary assessment, the rash meets the criteria for atopic dermatitis. It is recommended to see a doctor for confirmation of the diagnosis and further treatment planning.",
        resultDescNegative: "Based on the results of the preliminary assessment, the rash does not yet meet the diagnostic criteria for atopic dermatitis. Please monitor the rash, and if it recurs, repeat the assessment or consult a doctor for confirmation of the diagnosis.",
        recommendTitle: "Recommendations",
        recommendList: [
            "It is not recommended to self-treat the rash. Should go to see a dermatologist for confirmation of the diagnosis and appropriate treatment.",
            "It is not recommended to avoid foods unnecessarily in any case unless confirmed by testing from a specialist physician.",
            "Avoiding foods before confirmatory testing may lead to unnecessary nutritional deficiencies.",
            "You may apply moisturizers to the skin, and you can learn more from the information provided below."
        ],
        resultLinksTitle: "Watch these videos on basic skin care for atopic dermatitis.",
        resultLinks: [
            { icon: "icons/5.png", url: "https://youtu.be/EoSOHvYs_Ts?si=l2zQwg1139bHadSD", label: "Basic skin care for Atopic dermatitis" },
            { icon: "icons/6.png", url: "https://youtu.be/KGcZMS4hk0U?si=3JS7mXRr-8A_pDgl", label: "Atopic dermatitis management" },
            { icon: "icons/7.png", url: "https://youtu.be/kMKpU2Bu2RY?si=S0FikkwDx7g260KG", label: "Things to know how to avoiding trigger factors" },
            { icon: "icons/8.png", url: "https://youtu.be/YTOcUgwbzUk?si=uDH6_Wg150QaMA3e", label: "Topical corticosteroid and others" }
        ],
        tryAgainBtn: "Try again",
        goHomeBtn: "Back to Home",

        // footer
        footerCopyright: '© Copyright <a href="about.html" target="_blank" class="highlight-primary">KKU ADBot</a> All Rights Reserved',
        footerDev: 'Developed by <a href="https://mypisit.com" target="_blank" class="highlight-secondary">mypisit.com</a>',

        // about.html
        aboutTitle: "KKU ADBot",
        aboutH2: "About KKU ADBot",
        aboutDesc: "KKU AD Bot is a web-based tool designed for preliminary self-screening of Atopic Dermatitis (AD). It uses a questionnaire about rash symptoms and related history to help assess the likelihood of the condition. The questions are based on the Hanifin and Rajka Diagnostic Criteria for Atopic Dermatitis and have been adapted into an electronic format. The platform was developed through a collaboration between the Faculty of Medicine and the Faculty of Engineering at Khon Kaen University.",
        teamTitle: "KKU ADBot Developers",
        backToHome: "Back to Home",
        team: [
            {
                img: "about/3.png", alt: "leelawadee",
                email: "leelawadee@kku.ac.th",
                name: "Professor Leelawadee Techasatian, MD.",
                role: "Dermatology Division, Pediatric Department",
                faculty: "Faculty of Medicine, Khon Kaen University"
            },
            {
                img: "about/4.png", alt: "piyaaratrat",
                email: "piyaas@kku.ac.th",
                name: "Piyadarat Asawasakulchokedee, MD.",
                role: "Dermatology Division, Pediatric Department",
                faculty: "Faculty of Medicine, Khon Kaen University"
            },
            {
                img: "about/2.png", alt: "wanida",
                email: "wanida@kku.ac.th",
                name: "Professor Wanida (Pensuwon) Kanarkard, Ph.D.",
                role: "Department of Computer Engineering",
                faculty: "Faculty of Engineering, Khon Kaen University"
            },
            {
                img: "about/1.png", alt: "pisit",
                email: "pisit.sr@kkumail.com",
                name: "Mr. Pisit Srichumnart",
                role: "Computer Engineering student",
                faculty: "Faculty of Engineering, Khon Kaen University"
            }
        ],

        // exclusive options used in logic checks
        noSymptom: "None",
        noAllergy: "None",
        firstRash: "This rash has appeared for the first time",
    }
};

// ── questions EN ──────────────────────────────────────────────────────────────
const questionsEN = [
    {
        numb: 0,
        question: "Age",
        answer: "a",
        options: [
            "Less than 2 years old",
            "More than 2 years old"
        ]
    },
    {
        numb: 1,
        type: "Major",
        question: "Itch symptoms (You can select more than 1)",
        options: [
            "Itch",
            "Scratching or rubbing the rash",
            "Scratch marks or bleeding on the rash",
            "None"
        ],
        answer: ["Itch", "Scratching or rubbing the rash", "Scratch marks or bleeding on the rash"]
    },
    {
        numb: 2,
        type: "Major",
        question: "Duration of the rash",
        options: [
            "This rash has appeared for the first time",
            "Rash occurred before, comes and goes",
            "Recurrent rash after treatment"
        ],
        answer: [
            "Rash occurred before, comes and goes",
            "Recurrent rash after treatment"
        ]
    },
    {
        numb: 3,
        type: "Major",
        question: "Location of rash (You can select more than 1)",
        options: [
            "Face/ Cheeks",
            "Head / Scalp",
            "Hairline",
            "Trunk",
            "Arms or legs (outer side)",
            "Arms or legs (inner side)",
            "Neck folds / Armpits"
        ],
        answer: ["S."]
    },
    {
        numb: 4,
        type: "Major",
        question: "Allergy history",
        options: [
            "History of allergy rhinitis or asthma",
            "Family history: eczema, rhinitis or asthma",
            "None"
        ],
        answer: [
            "History of allergy rhinitis or asthma",
            "Family history: eczema, rhinitis or asthma"
        ]
    },
    {
        numb: 5.1, type: "Minor",
        question: "Do you have dry skin?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.2, type: "Minor",
        question: "Do you have dryness or darkening of the skin around the eyes?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.3, type: "Minor",
        question: "Do you have white patches on your skin or pityriasis alba?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.4, type: "Minor",
        question: "Do you have deep or very visible lines on your palms?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.5, type: "Minor",
        question: "Do you have a dry rash around your mouth?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.6, type: "Minor",
        question: "Do you have itchy eyes or recurring eye inflammation?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.7, type: "Minor",
        question: "Do you have small bumps or rash around your hair follicles?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.8, type: "Minor",
        question: "Do you have dry or itchy rash around your nipple?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.9, type: "Minor",
        question: "Do you have itching when you sweat?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.11, type: "Minor",
        question: "Do you have a history of food or milk allergy?",
        options: ["Yes", "No", "Not sure"], answer: "Yes"
    },
    {
        numb: 5.12, type: "Minor",
        question: "Do you feel skin irritation when wearing rough clothes?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.13, type: "Minor",
        question: "Is your rash affected by seasonal changes?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.14, type: "Minor",
        question: "Do white marks appear on your skin after scratching?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.15, type: "Minor",
        question: "Do you have lines or folds on the front of your neck?",
        options: ["Yes", "No"], answer: "Yes"
    },
    {
        numb: 5.16, type: "Minor",
        question: "Did the rash start before the age of 2?",
        options: ["Yes", "No"], answer: "Yes"
    }
];

const Question21EN = {
    numb: 2.1,
    question: "How long have you had this rash?",
    options: ["1–2 weeks", "3–4 weeks", "1–3 months", "3–6 months"],
    answer: ["3–6 months"]
};
