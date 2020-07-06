const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');


const data = [
  {
    image: './img/drink.jpg',
    text: "Tengo sed"
  },
  {
    image: './img/food.jpg',
    text: "Tengo hambre"
  },
  {
    image: './img/tired.jpg',
    text: "Tengo sueño"
  },
  {
    image: './img/hurt.jpg',
    text: "Me duele"
  },
  {
    image: './img/happy.jpg',
    text: "Estoy contento"
  },
  {
    image: './img/angry.jpg',
    text: "Estoy enfadado"
  },
  {
    image: './img/sad.jpg',
    text: "Estoy triste"
  },
  {
    image: './img/scared.jpg',
    text: "Tengo miedo"
  },
  {
    image: './img/outside.jpg',
    text: 'Quiero ir fuera'
  },
  {
    image: './img/home.jpg',
    text: 'Quiero ir a casa'
  },
  {
    image: './img/school.jpg',
    text: 'Quiero ir a la escuela'
  },
  {
    image: './img/grandma.jpg',
    text: 'Quiero ver a los abuelos'
  }
];

data.forEach(createBox);

// Cajas ejemplos
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Efecto active
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Inicialización del SpeechSynth
const message = new SpeechSynthesisUtterance();


let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}


function setTextMessage(text) {
  message.text = text;
}


function speakText() {
  speechSynthesis.speak(message);
}


function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}


speechSynthesis.addEventListener('voiceschanged', getVoices);



voicesSelect.addEventListener('change', setVoice);


readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
