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
