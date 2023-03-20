import bot from './assets/bot.svg'
import user from './assets/user.svg'



// get input text from searchbar---
const form = document.querySelector('form')

// get div to write ans from the backen-api-Ai message---
const chatContainer = document.querySelector('#chat_container')



// loading . . . for loading time fro get data from backend---
let loadInterval

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}



// type text from ai backend one by one work-------
function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element

// generate unique for every single message --
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
// console.log(generateUniqueId());



// chat stripe chat bot iconn and written ---
function chatStripe(isAi, value, uniqueId) {
  return (
    `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
  )
}



// Ai generated response --
const handleSubmit = async (e) => {
  e.preventDefault()
  // get input text from searchbar---
  const data = new FormData(form)
  const inputDataText = document.getElementById('prompt').value;
  // console.log({ inputDataText });

  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

  // to clear the textarea input 
  form.reset()

  // bot's chatstripe
  //bot's chatstripe
  // get uniqueId function for each each/unique search ---
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // to focus scroll to the bottom 
  // scrollbar auto for input from scrollbar ---
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 

  const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  // start loading "..."--- 
  loader(messageDiv)


  // console.log({ name: data.get('prompt') })

  //fetch data from server ---
  const response = await fetch('https://sofi-chatgpt-ai.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: inputDataText,
    })
  })


  // stop loading "..."---
  clearInterval(loadInterval)

  // set ans to the div and display ans. ---
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 


    // insert data/ text from the api backend on client show---
    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = "Something went wrong"
    alert(err)
  }
}


// active on ENTER button ---
// form.addEventListener('submit', handleSubmit)
form.addEventListener('keydown', (e) => {
  // if(e.keyCode === 13){
  if (e.key === "Enter") {
    handleSubmit(e)
  }
})