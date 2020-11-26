let lastScroll = -100;

const animate = () => {
  if (lastScroll - 10 <= window.scrollY && window.scrollY <= lastScroll + 10)
    return;
  lastScroll = window.scrollY;

  const windowHeight = document.documentElement.clientHeight;
  const headerElement = document.querySelector('.header');
  const skillElements = document.querySelectorAll('.skill');
  const aboutImageElement = document.querySelector('.about__img-container');
  const aboutParaElements = document.querySelectorAll('.about__text');
  const projectElements = document.querySelectorAll('.project');
  const contactElement = document.querySelector('.contact-container');
  const navElement = document.querySelector('nav');

  const sectionElements = {
    home: headerElement,
    about: document.querySelector('#about'),
    skills: document.querySelector('#skills'),
    portfolio: document.querySelector('#portfolio'),
    contact: document.querySelector('#contact'),
  };

  const navLinkElements = {
    home: document.querySelector('#nav-home'),
    about: document.querySelector('#nav-about:not([style*="display:none"])'),
    skills: document.querySelector('#nav-skills'),
    portfolio: document.querySelector('#nav-portfolio'),
    contact: document.querySelector('#nav-contact'),
  };

  const headerAnimate = () => {
    const headerHeight = headerElement.getBoundingClientRect().height;
    const changeRatio =
      1 - (headerHeight - window.scrollY - 100) / headerHeight;

    if (changeRatio <= 1) {
      const minHeightPercent = 90 + changeRatio * 10;
      const maxHeightPercent = 99 + changeRatio;

      headerElement.style.clipPath = `polygon(0 0, 100% 0, 100% ${minHeightPercent}%, 75% ${maxHeightPercent}%, 25% ${minHeightPercent}%, 0 ${maxHeightPercent}%)`;
    }
  };

  const skillsAnimate = () => {
    skillElements.forEach(skill => {
      if (skill.getBoundingClientRect().bottom + 10 <= windowHeight)
        skill.classList.add('animate');
    });
  };

  const aboutAnimate = () => {
    if (aboutImageElement.getBoundingClientRect().bottom <= windowHeight)
      aboutImageElement.classList.add('animate');

    aboutParaElements.forEach(para => {
      if (para.getBoundingClientRect().bottom <= windowHeight)
        para.classList.add('animate');
    });
  };

  const projectsAnimate = () => {
    projectElements.forEach(project => {
      if (project.getBoundingClientRect().top <= windowHeight)
        project.classList.add('animate');
    });
  };

  const contactAnimate = () => {
    if (contactElement.getBoundingClientRect().bottom - 10 <= windowHeight)
      contactElement.classList.add('animate');
  };

  const navAnimate = () => {
    const headerHeight = headerElement.getBoundingClientRect().height;
    const changeRatio = Math.min(
      1 - (headerHeight - window.scrollY) / headerHeight,
      1
    );

    navElement.style.height = `${10 - 5 * changeRatio}rem`;
    navElement.style.backgroundColor = `rgba(37, 34, 39, ${0.9 * changeRatio})`;

    for (section in sectionElements) {
      if (
        sectionElements[section].getBoundingClientRect().top <=
          windowHeight / 2 &&
        !navLinkElements[section].classList.contains('active')
      ) {
        Object.values(navLinkElements).forEach(e =>
          e.classList.remove('active')
        );
        navLinkElements[section].classList.add('active');
      }
    }
  };

  headerAnimate();
  skillsAnimate();
  aboutAnimate();
  projectsAnimate();
  contactAnimate();
  navAnimate();
};

const typeStart = () => {
  const typingElement = document.querySelector('.running-text');
  const sentences = data.about.typing;

  const letterWait = 80;
  const sentenceWait = 2000;

  const type = (sentence = -1, letter = -1, erasing) => {
    if (sentence === sentences.length) return type(0, letter, erasing);

    if (letter === -1) {
      setTimeout(() => type(sentence + 1, 0, false), letterWait);
    } else if (letter === sentences[sentence].length) {
      setTimeout(() => type(sentence, letter - 1, true), sentenceWait);
    } else if (erasing) {
      typingElement.innerText = typingElement.innerText.slice(0, letter);

      setTimeout(() => type(sentence, letter - 1, true), letterWait);
    } else {
      typingElement.innerText += sentences[sentence][letter];

      setTimeout(() => type(sentence, letter + 1, false), letterWait);
    }
  };

  type();
};

const loadData = () => {
  const resumeElement = document.querySelector('.header__resume');
  const aboutTextElement = document.querySelector('.about__right-container');
  const skillsElement = document.querySelector('.skills');
  const projectsElement = document.querySelector('.projects');

  resumeElement.href = data.about.resume;

  data.about.about.forEach(
    para => (aboutTextElement.innerHTML += `<p class="about__text">${para}</p>`)
  );

  data.skills.forEach(
    ({ name, level }) =>
      (skillsElement.innerHTML += `<div class="skill">
          <p class="skill__name">${name}</p>
          <div class="skill__level-container">
            <div class="skill__level" style="width: ${level}%;"></div>
          </div>
        </div>`)
  );

  data.projects.forEach(
    ({ name, image, about, view, code }) =>
      (projectsElement.innerHTML += `<div class="project">
            <h3 class="project__name">${name}</h3>
            <div class="project__content">
              <div class="project__img">
                <img src="${image}" alt="${name}" />
              </div>
              <div class="project__hidden">
                <p class="project__description">${about}</p>
                <div class="project__btn">
                  ${code ? `<a href="${code}" target="_blank">CODE</a>` : ''}
                  ${view ? `<a href="${view}" target="_blank">VIEW</a>` : ''}
                </div>
              </div>
            </div>
          </div>`)
  );
};

const mail = e => {
  const sendButton = document.querySelector('.form [type="submit"]');
  const nameInput = document.querySelector('.form #name');
  const emailInput = document.querySelector('.form #email');
  const messageInput = document.querySelector('.form #message');
  const responseContainer = document.querySelector('#form-result');

  const toParams = data_js => {
    const form_data = [];
    for (let key in data_js) {
      form_data.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(data_js[key])
      );
    }

    return form_data.join('&');
  };

  e.preventDefault();

  sendButton.value = 'Sending…';
  sendButton.disabled = true;

  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200)
        responseContainer.innerHTML +=
          '<h3 class="response response__success">Form Submitted, Thanks!</h3>';

      if (request.status !== 200)
        responseContainer.innerHTML +=
          '<h3 class="response response__fail">Some error occured, please try again.</h3>';

      setTimeout(() => responseContainer.firstChild.remove(), 5000);

      sendButton.value = 'Send Message';
      sendButton.disabled = false;

      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    }
  };

  const data_js = {
    access_token: '9maor4jmrbm90qwbi8z2qy6z',
    subject: 'Personal Website Contact Form',
    text: `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nMessage: ${messageInput.value}`,
  };

  request.open('POST', 'https://postmail.invotes.com/send', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.send(toParams(data_js));
};

loadData();
typeStart();
animate();
window.onscroll = animate;
document.querySelector('.form').addEventListener('submit', mail);
