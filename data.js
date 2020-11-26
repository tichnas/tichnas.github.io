let data;

(function () {
  const about = {
    typing: [
      'Sanchit Arora',
      'a Student',
      'a Developer',
      'an Enthusiast',
      'a lovely Human Being :)',
    ],
    resume:
      'https://drive.google.com/file/d/1UoGwSmKeJQwybdtnFiEzsrmSRYv5nRrL/view?usp=sharing',
    about: [
      `an 18-year-old sophomore pursuing my B.Tech. from IIIT Hyderabad in Computer Science and Engineering. I often go by the name of "tichnas" in online communities.`,
      `...and, I'm an introvert. Believe me, writing this section took more time than coding up the rest of the website. I hope to overcome this problem soon. Wish me luck.`,
    ],
  };

  const skills = [
    { name: 'Javascript', level: 85 },
    { name: 'CSS/SASS', level: 85 },
    { name: 'React JS', level: 80 },
    { name: 'React Native', level: 75 },
    { name: 'Express.js', level: 80 },
    { name: 'C/C++', level: 85 },
    { name: 'MySQL', level: 60 },
    { name: 'Shell Scripting', level: 60 },
    { name: 'DS & Algorithms', level: 80 },
    { name: 'OOPs', level: 70 },
    { name: 'DBMS', level: 70 },
    { name: 'Operating Systems', level: 50 },
  ];

  const projects = [
    {
      name: 'Classity',
      image: './img/Classity.png',
      about:
        'Platform to allow instructors from all over the world to create and teach courses. Students can enrol those courses and learn through them',
      view: 'https://classity-v09.herokuapp.com/',
    },
    {
      name: 'Ad Agency',
      image: './img/AdAgency.png',
      about:
        'Management system for an Ad Agency to store and manipulate Actors, Brands, Directors, add contracts between them and much more with a CLI in Python',
      code: 'https://github.com/tichnas/AdAgency',
    },
    {
      name: 'IIIT-GPS',
      image: './img/IIIT-GPS.png',
      about:
        'Platform to help students better understand and prepare for the courses they will be taking in upcoming semesters. Look at reviews, learning curve, etc.',
      code: 'https://github.com/tichnas/IIIT-GPS',
      view: 'https://tichnas.github.io/IIIT-GPS',
    },
    {
      name: 'C Shell',
      image: './img/C Shell.png',
      about:
        'Bash-like command interpreter, written in C, with support for process management, piping/redirection and built-in as well as system commands',
      code: 'https://github.com/tichnas/C-Shell',
    },
    {
      name: 'Advanced xv6',
      image: './img/xv6.png',
      about:
        'Improved xv6 with new scheduling techniques, system calls and user programs. Analysis of different scheduling algorithms is done using Python',
      code: 'https://github.com/tichnas/Advanced-xv6',
    },
  ];

  data = { about, skills, projects };
})();
