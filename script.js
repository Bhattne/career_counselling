// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        window.scrollTo({ top: target.offsetTop-60, behavior:'smooth' });
        navLinks.classList.remove('active');
    });
});

// Modal
function showModal(type){
    let content='';
    switch(type){
        case 'schedule':
            content=`<h3>Book Counselling</h3><p>Fill the form & our experts will contact you.</p>
            <form>
            <input type="text" placeholder="Your Name" required><br><br>
            <input type="email" placeholder="Your Email" required><br><br>
            <input type="tel" placeholder="Phone" required><br><br>
            <button type="submit" class="btn btn-primary">Submit</button></form>`;
            break;
        case 'service1': content='<h3>Stream Selection</h3><p>Guidance for 10th/12th stream selection.</p>'; break;
        case 'service2': content='<h3>Entrance Exam Prep</h3><p>Guidance for exams like JEE/NEET/CAT.</p>'; break;
        case 'service3': content='<h3>College Selection</h3><p>Find best colleges & admission guidance.</p>'; break;
    }
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML=`<div class="modal-content">
        <span class="modal-close" onclick="closeModal(this)">×</span>${content}</div>`;
    document.body.appendChild(modal);
}

function closeModal(el){ el.closest('.modal').remove(); }

// Career paths
function showCareerDetails(path){ alert('More info about ' + path + ' careers coming soon!'); }

// Assessment
let currentQ=0; let answers=[];
const quizQuestions=[
    {q:'Do you enjoy working with numbers?', options:['Yes','No']},
    {q:'Do you like helping people?', options:['Yes','No']},
    {q:'Do you enjoy creative work?', options:['Yes','No']},
    {q:'Are you interested in technology?', options:['Yes','No']}
];

function startAssessment(){
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');
    showQuestion();
}

function showQuestion(){
    const quizScreen = document.getElementById('quizScreen');
    if(currentQ>=quizQuestions.length){ showResults(); return; }
    const question = quizQuestions[currentQ];
    quizScreen.innerHTML = `<div class="question">
        <h3>${question.q}</h3>
        <div class="options">${question.options.map((opt,i)=>`<div class="option" onclick="selectOption(${i})">${opt}</div>`).join('')}</div>
    </div>
    <div class="quiz-navigation">
        <button class="btn btn-secondary" onclick="prevQuestion()">Previous</button>
        <button class="btn btn-primary" onclick="nextQuestion()">Next</button>
    </div>`;
    if(answers[currentQ]!=undefined) selectOption(answers[currentQ]);
}

function selectOption(i){
    answers[currentQ]=i;
    document.querySelectorAll('.option').forEach((el, idx)=>el.classList.toggle('selected', idx===i));
}

function nextQuestion(){ currentQ++; showQuestion(); }
function prevQuestion(){ if(currentQ>0){ currentQ--; showQuestion(); } }

function showResults(){
    const quizScreen = document.getElementById('quizScreen');
    let score = answers.filter(a=>a===0).length;
    quizScreen.innerHTML = `<h3>Your Recommended Career Paths</h3>
        <ul>
        ${score>=3?'<li>Engineering / Tech</li>':''}
        ${score>=2?'<li>Management / Business</li>':''}
        ${score>=1?'<li>Creative / Design</li>':''}
        </ul>
        <button class="btn btn-primary" onclick="restartQuiz()">Restart</button>`;
}

function restartQuiz(){ currentQ=0; answers=[]; document.getElementById('startScreen').classList.add('active'); document.getElementById('quizScreen').classList.remove('active'); }

// Testimonials slider
let currentSlide=0;
const slides=document.querySelectorAll('.testimonial-card');
function showSlide(i){ slides.forEach((s,idx)=>s.style.display=idx===i?'block':'none'); }
setInterval(()=>{ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide); },4000);
showSlide(currentSlide);
