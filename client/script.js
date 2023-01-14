import bot from "./assets/bot.svg"
import user from "./assets/user.svg"

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container")

let loadInterval;

// loading . . . for loading time fro get data from backend---
function loader(element) {
  element.textContent = "";
  loadInterval = setImmediate(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300)
}

// type text from ai backend one by one work-------
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
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

        <div class="message" id=${uniqueId}>
         ${value}
        </div>

      </div>
    </div>
    `
  )
}


// Ai generated response --