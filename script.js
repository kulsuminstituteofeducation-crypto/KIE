document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => currentPage === page ? ' class="active"' : '';
  const navigation = () => `
    <ul class="inst-links">
      <li><a href="index.html"${isActive('index.html')}>Home</a></li>
      <li><a href="about.html"${isActive('about.html')}>About</a></li>
      <li><a href="courses.html"${isActive('courses.html')}>Courses</a></li>
      <li><a href="spoken-english.html"${isActive('spoken-english.html')}>Spoken English</a></li>
      <li class="inst-dropdown"><details><summary>Explore <span>+</span></summary>
        <div class="inst-dropdown-panel">
          <a href="free-courses.html"${isActive('free-courses.html')}>Free resources</a>
          <a href="free-test.html"${isActive('free-test.html')}>Learning assessment</a>
          <a href="spoken-english-tests.html"${isActive('spoken-english-tests.html')}>English quizzes</a>
          <a href="workshop.html"${isActive('workshop.html')}>Workshops</a>
          <a href="readers-club.html"${isActive('readers-club.html')}>Readers club</a>
          <a href="ebooks.html"${isActive('ebooks.html')}>Ebook library</a>
        </div>
      </details></li>
      <li><a href="contact.html"${isActive('contact.html')}>Contact</a></li>
    </ul>`;

  document.querySelectorAll('.inst-links').forEach((links) => { links.outerHTML = navigation(); });

  document.querySelectorAll('.site-header').forEach((header) => {
    header.classList.add('inst-header');
    const wrap = header.querySelector('.nav-wrap');
    if (!wrap) return;
    wrap.className = 'inst-container inst-nav';
    wrap.innerHTML = `
      <a class="inst-brand" href="index.html" aria-label="Kulsum Institute home"><span class="inst-mark">K</span><span>Kulsum <b>Institute</b></span></a>
      <nav aria-label="Main navigation">${navigation()}</nav>
      <a class="inst-button inst-button-dark nav-cta" href="contact.html">Talk to us <span>→</span></a>
      <button class="inst-menu" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>`;
  });

  const logo = 'assets/logo/logo.jpg';
  document.querySelectorAll('.inst-mark').forEach((mark) => {
    mark.innerHTML = '<img src="' + logo + '" alt="Kulsum Institute of Education logo">';
  });
  document.querySelectorAll('.site-footer .footer-grid > div:first-child').forEach((footerBrand) => {
    if (!footerBrand.querySelector('.footer-logo')) {
      footerBrand.insertAdjacentHTML('afterbegin', '<img class="footer-logo" src="' + logo + '" alt="Kulsum Institute of Education logo">');
    }
  });

  document.querySelectorAll('.inst-menu').forEach((button) => {
    button.addEventListener('click', () => {
      const menu = button.parentElement.querySelector('.inst-links');
      if (!menu) return;
      const open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
});
function renderTopics(){
  grid.innerHTML='';
  TOPICS.forEach(function(t,i){
    const count=DATA[t.name].length;
    const level=t.level||'Basic &amp; medium level';
    const d=document.createElement('div');
    d.className='feature-card';
    d.innerHTML='<div class="eyebrow">Test '+(i+1)+'</div><h3>'+t.name+'</h3><p>'+count+' questions &middot; '+level+'</p><button type="button" class="btn btn-gold topic-button">Start Test</button>';
    d.querySelector('button').onclick=function(){openQuiz(t.name)};
    grid.appendChild(d);
  });
}

function openQuiz(name){
  current=name;
  const total=DATA[name].length;
  tv.style.display='none';
  qv.style.display='block';
  result.classList.remove('show');
  document.getElementById('quiz-title').textContent=name;
  document.getElementById('quiz-head').textContent=name;
  document.getElementById('quiz-desc').textContent=total+' questions. Select one answer for each question, then submit to get your score, percentage and explanations.';
  box.innerHTML='';
  DATA[name].forEach(function(x,i){
    const d=document.createElement('div');
    d.className='test-question';
    let o='';
    x.options.forEach(function(v,j){
      const letter=String.fromCharCode(65+j);
      o+='<label class="test-option"><input type="radio" name="q'+i+'" value="'+letter+'"> <span><strong>'+letter+'.</strong> '+v+'</span></label>';
    });
    d.innerHTML='<h3>'+(i+1)+'. '+x.question+'</h3><div class="test-options">'+o+'</div>';
    box.appendChild(d);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

form.onsubmit=function(e){
  e.preventDefault();
  const qs=DATA[current], total=qs.length;
  let score=0, missing=[];
  qs.forEach(function(x,i){
    const s=form.querySelector('input[name="q'+i+'"]:checked');
    if(!s) missing.push(i+1);
    else if(s.value===x.answer) score++;
  });
  if(missing.length){
    alert('Please answer question(s): '+missing.join(', ')+'.');
    return;
  }
  const pct=Math.round((score/total)*100);
  last={topic:current,score:score,total:total,percentage:pct,date:new Date().toLocaleString()};
  document.getElementById('score').textContent=score+' / '+total;
  document.getElementById('percent').textContent='Percentage: '+pct+'%';
  document.getElementById('message').textContent=pct>=80?'Excellent work! Review the solutions and keep practising.':pct>=60?'Good progress! Review the explanations and practise again.':'Keep practising. Review the solutions and try the test again.';
  showSolutions();
  result.classList.add('show');
  result.scrollIntoView({behavior:'smooth',block:'center'});
};
