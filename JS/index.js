var intro = document.querySelector('#intro');
var enter = document.querySelector('#enter');

//teste comentario comitt

let mudarDiv = () => {
   setTimeout(() => {
      intro.style.opacity = '0';
      intro.style.display = 'none';
      enter.style.display = 'block';
      enter.style.opacity = '100';
   }, 4000);
};

mudarDiv();
