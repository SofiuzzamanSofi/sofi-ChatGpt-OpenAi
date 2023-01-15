import bot from "./assets/bot.svg"
import user from "./assets/user.svg"




// get input text from searchbar---
const form = document.querySelector("form");
// get div to write ans from the backen-api-Ai message---
const chatContainer = document.querySelector("#chat_container")




// loading . . . for loading time fro get data from backend---
let loadInterval

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}


// type text from ai backend one by one work-------
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    }
    else {
      clearInterval(interval)
    }
  }, 20)
}



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
            src="${isAi ? bot : user}"
            alt="${isAi ? "bot" : "user"}"
          />
        </div>

        <div class="message" id=${uniqueId ? uniqueId : ""}>
         ${value}
        </div>

      </div>
    </div>
    `
  )
}




// Ai generated response --
const handleSubmit = async e => {
  e.preventDefault();

  // get input text from searchbar---
  const data = new FormData(form);


  // users's chatstripe---
  // define/get a from/"DIV" from HTML--to show outpur data from backend--
  // created chatStripe for use =(false) =--
  // data.get(promt) = data = form, .get()=method of javascript to get data from the form, "promt"= input textArea name--
  // name "name"= evabe likhle tar velu pawa jai
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  //bot's chatstripe
  // get uniqueId function for each each/unique search ---
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // scrollbar auto ---
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // start loading "..."--- 
  const messageDiv = document.getElementById(uniqueId);
  // console.log(messageDiv);
  loader(messageDiv);


  //fetch data from server ---
  const response = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    })
  })

  // stop loading "..."---
  clearInterval(loadInterval);

  // set ans to the div and display ans. ---
  messageDiv.innerHTML = "";

  if (response.ok) {
    const data = await response.json();
    const parseData = data.bot.trim();
    console.log({ parseData })
    typeText(messageDiv, parseData)
  } else {
    const error = await response.text();
    messageDiv.innerHTML = "Something went wrong.",
      alert(error);
  }

}


form.addEventListener("submit", handleSubmit);

// active on ENTER button ---
form.addEventListener("keyup", (e) => {
  // if(e.keyCode === 13){
  if (e.key === "Enter") {
    handleSubmit(e);
  }
})