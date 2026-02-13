function showFlower() {
  var flowerContainer = document.querySelector(".flower-container");

  flowerContainer.innerHTML = flowercontent;
  flowerContainer.classList.remove("not-loaded");
}

const mainC = document.createElement("div");
mainC.innerHTML = `
<div class="night"></div>
<div class="flower-container not-loaded"></div>
<div class="container">
<div class="text-container">
    <h2 id="text"></h2>
</div>
<button id="kirim-pesan">Kirim Pesan</button>
</div>
<div class="popup-container d-none">
      <div class="popup">
        <span class="loader"></span>

        <h1 class="popup-title">Klike</h1>
        <textarea rows="7" class="form-input"></textarea>
        <button class="popup-button">OK</button>
      </div>
    </div>
`;
const audio = new Audio(musik);
audio.loop = true;
audio.autoplay = true;

document.querySelector("body").appendChild(mainC);

function typeTextUcapan(text, container, speed, next) {
  container.textContent = "";
  const characters = text.split("");
  const typingSpeed = speed;

  return new Promise((resolve) => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const char = characters[currentIndex];

      if (char == "#") {
        var charElement = document.createElement("br");
      } else {
        var charElement = document.createElement("span");
        charElement.textContent = char;
        charElement.style.animation = "glowucapan .3s ease-in-out";
      }
      container.appendChild(charElement);

      currentIndex++;

      if (currentIndex === characters.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          next();
          resolve();
        }, 0);
      }
    }, typingSpeed);
  });
}

const formContainer = document.querySelector(".form-container");
const btnPesan = document.querySelector("#kirim-pesan");

var typContainer = document.querySelector("#text");
let indz = 0;
function startUcapan(indzz) {
  typeTextUcapan(ucapan[indzz], typContainer, speedText, () => {
    if (indz < ucapan.length - 1) {
      setTimeout(() => {
        indz++;
        startUcapan(indz);
      }, 2000);
    }
    if (indz == ucapan.length - 1) {
      if (nomorWhatsapp != "") {
        btnPesan.classList.add("up");
        btnPesan.onclick = kirimPesan;
      }
    }
  });
}

btnPesan.onclick = () => {
  kirimPesan();
};

const openContainer = document.querySelector(".open");
const btnOpen = openContainer.querySelector("i");
let isClick = false;

btnOpen.addEventListener("click", () => {
  if (!isClick) {
    audio.play();
    isClick = true;
    openContainer.classList.add("out");
    setTimeout(() => {
      openContainer.remove();
    }, 1000);
    setTimeout(() => {
      showFlower();
    }, 500);
    setTimeout(() => {
      startUcapan(0);
    }, 4000);
  }
});
function showPopup({ title = "Default Title", btnText = "OK", showInput = false, showLoader = false, showBtn = true, funcAfter = () => {} }) {
  return new Promise((resolve, reject) => {
    const popupContainer = document.querySelector(".popup-container");

    const popupTitle = popupContainer.querySelector(".popup-title");
    const formInput = popupContainer.querySelector(".form-input");
    const loader = popupContainer.querySelector(".loader");
    const btnTxt = popupContainer.querySelector(".popup-button");
    formInput.value = "";
    popupContainer.classList.add("d-none");

    showInput ? formInput.classList.remove("d-none") : formInput.classList.add("d-none");
    showInput
      ? () => {
          setTimeout(() => {
            formInput.focus();
          }, 1000);
        }
      : () => {};
    showLoader ? loader.classList.remove("d-none") : loader.classList.add("d-none");
    showBtn ? btnTxt.classList.remove("d-none") : btnTxt.classList.add("d-none");

    popupTitle.textContent = title;
    btnTxt.innerHTML = btnText;

    btnTxt.onclick = () => {
      popupContainer.classList.add("d-none");
      if (showInput) return resolve(formInput.value);
      else resolve();
      funcAfter();
    };
    setTimeout(() => {
      popupContainer.classList.remove("d-none");
    }, 1);
  });
}