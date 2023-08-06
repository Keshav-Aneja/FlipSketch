"use strict";

const colorItem = document.querySelectorAll(".color");
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const dropdown = document.getElementById("dropdown");
const menuItems = document.querySelectorAll(".item");
// const colorBar = document.getElementById("colorSelector");
const overlay = document.querySelector(".panel");
const tri = document.querySelector(".arrow");
const panel = document.querySelectorAll(".panel img");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let lineColor = "#9fde54";
const weightPanel = document.querySelector(".weights");
let activeColorItem = colorItem[0];
let activeMenuItem = menuItems[0];
let activeBackground = "#fff";
let lineThickness = dropdown.value;
let activePanelItem = panel[1];
let activeColor = activeColorItem.getAttribute("data-key");
let shapeSize = 40;
const downloadBtn = document.querySelector(".dwn");
const yesBtn = document.querySelector(".yes");
const seeker = document.querySelector("#seeker");
colorItem.forEach((color) => {
  color.style.backgroundColor = color.getAttribute("data-key");
  color.addEventListener("click", function () {
    activeColorItem.classList.remove("active");
    color.classList.add("active");
    activeColorItem = color;
    activeColor = activeColorItem.getAttribute("data-key");
  });
});
let prevItem;
let activeFont = "Arimo";
const fontSelector = document.getElementById("fontFamily");
fontSelector.addEventListener("change", function () {
  activeFont = fontSelector.value;
});

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    activeMenuItem.classList.remove("active");
    item.classList.add("active");
    activeMenuItem = item;
    if (prevItem != item) {
      if (prevItem) {
        let np = prevItem.querySelector("p");
        np.style.display = "none";
      }
      let nearp = item.querySelector("p");
      nearp.style.display = "block";
      prevItem = item;
    }
    if (activeMenuItem === menuItems[0]) {
      canvas.style.cursor = `url("Assets/ICON-${0}.ico"), pointer`;
      weightPanel.style.display = "flex";
      seeker.style.display = "none";
    }
    if (activeMenuItem === menuItems[1]) {
      canvas.style.cursor = `url("Assets/ICON-${1}.ico"), pointer`;
      weightPanel.style.display = "flex";
      seeker.style.display = "none";
    }
    if (activeMenuItem === menuItems[3]) {
      canvas.style.cursor = `url("Assets/ICON-${3}.ico"), pointer`;
    }
    if (activeMenuItem === menuItems[2]) {
      overlay.style.opacity = 1;
      tri.style.opacity = 1;
      overlay.style.zIndex = 10;
      canvas.style.cursor = `url("Assets/ICON-${2}.ico"), pointer`;
      weightPanel.style.display = "none";
      seeker.style.display = "block";
      // seeker.disabled = false;
      // seeker.style.backgroundColor = "#668cd3";
    }
    if (activeMenuItem !== menuItems[2]) {
      overlay.style.opacity = 0;
      tri.style.opacity = 0;
      overlay.style.zIndex = -1;
      // seeker.disabled = true;
      // seeker.style.backgroundColor = "grey";
    }
    if (activeMenuItem === menuItems[4]) {
      document.querySelector(".textPanel").style.opacity = 1;
      document.querySelector(".arrow2").style.opacity = 1;
      document.querySelector(".textPanel").style.zIndex = 10;
      canvas.style.cursor = `url("Assets/ICON-${4}.ico"), pointer`;
      weightPanel.style.display = "none";
      seeker.style.display = "block";
      // seeker.disabled = false;
      // seeker.style.backgroundColor = "#668cd3";
    }
    if (activeMenuItem !== menuItems[4]) {
      document.querySelector(".textPanel").style.opacity = 0;
      document.querySelector(".textPanel").style.zIndex = -1;
      document.querySelector(".arrow2").style.opacity = 0;
      textArea.value = "";
      seeker.value = "40";
      shapeSize = 40;
      // seeker.disabled = true;
      // seeker.style.backgroundColor = "grey";
    }
    if (activeMenuItem === menuItems[2] || activeMenuItem === menuItems[4]) {
      seeker.disabled = false;
      seeker.style.backgroundColor = "#668cd3";
    } else {
      seeker.disabled = true;
      seeker.style.backgroundColor = "grey";
    }
  });
});
seeker.addEventListener("change", function () {
  shapeSize = seeker.value;
});

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}
function motion(e) {
  if (!isDrawing) return;
  const { x, y } = getMousePos(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineThickness;
  ctx.stroke();
  lastX = x;
  lastY = y;
}
function draw(e) {
  motion(e);
  //   ctx.strokeStyle = activeColorItem.getAttribute("data-key");
  ctx.strokeStyle = activeColor;
}
function erase(e) {
  motion(e);
  ctx.strokeStyle = activeBackground;
}
function paint(e) {
  //   canvas.style.backgroundColor = activeColor;
  //   activeBackground = activeColor;
  ctx.fillStyle = activeColor;
  activeBackground = activeColor;
  ctx.beginPath();
  ctx.arc(lastX, lastY, 2000, 0, 2 * Math.PI);
  ctx.fill();
}
panel.forEach((pan) => {
  pan.addEventListener("click", function () {
    pan.classList.add("active-b");
    activePanelItem.classList.remove("active-b");
    activePanelItem = pan;
  });
});
function drawShape(e) {
  const { x, y } = getMousePos(e);
  lastX = x;
  lastY = y;
  ctx.fillStyle = activeColor;
  if (activePanelItem === panel[0]) {
    ctx.beginPath();
    ctx.moveTo(lastX - shapeSize / 2, lastY - shapeSize / 2);
    ctx.lineTo(lastX + shapeSize / 2, lastY - shapeSize / 2);
    ctx.lineTo(lastX + shapeSize / 2, lastY + shapeSize / 2);
    ctx.lineTo(lastX - shapeSize / 2, lastY + shapeSize / 2);
    ctx.lineTo(lastX - shapeSize / 2, lastY - shapeSize / 2);
    ctx.fill();
  }
  if (activePanelItem === panel[1]) {
    ctx.beginPath();
    ctx.arc(lastX, lastY, shapeSize, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (activePanelItem === panel[2]) {
    ctx.beginPath();
    ctx.moveTo(lastX - shapeSize / 2, lastY);
    ctx.lineTo(lastX, lastY - shapeSize / 1.5);
    ctx.lineTo(lastX + shapeSize / 2, lastY);
    ctx.fill();
  }
}
let textInput = "";
const textArea = document.querySelector(".textPanel textarea");
textArea.addEventListener("input", function () {
  textInput = textArea.value;
});
function writeText(e) {
  const { x, y } = getMousePos(e);
  lastX = x;
  lastY = y;
  ctx.fillStyle = activeColor;
  ctx.font = `${shapeSize}px ${activeFont}`;
  ctx.textAlign = "center";
  ctx.fillText(textInput, lastX, lastY);
}
yesBtn.addEventListener("click", function (e) {
  paint(e);
  document.querySelector(".warning").style.display = "none";
});
document.querySelector(".no").addEventListener("click", function () {
  document.querySelector(".warning").style.display = "none";
});
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const { x, y } = getMousePos(e);
  lastX = x;
  lastY = y;
  if (activeMenuItem === menuItems[3]) {
    document.querySelector(".warning").style.display = "flex";
  } else if (activeMenuItem === menuItems[2]) {
    drawShape(e);
  } else if (activeMenuItem === menuItems[4]) {
    writeText(e);
  }
});

dropdown.addEventListener("change", function () {
  lineThickness = dropdown.value;
});

canvas.addEventListener("mousemove", (e) => {
  if (activeMenuItem === menuItems[0]) {
    draw(e);
  } else if (activeMenuItem === menuItems[1]) {
    erase(e);
  }
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));
// colorBar.addEventListener("input", () => {
//   activeColor = colorBar.value;
// });

// Function to save the canvas as a PNG file
function saveCanvasAsPNG() {
  // Get the data URL of the canvas as PNG
  const dataURL = canvas.toDataURL("image/png");

  // Create a new image element with the data URL as the source
  const img = new Image();
  img.src = dataURL;

  // Create a temporary anchor element to trigger the download
  downloadBtn.href = dataURL;
  downloadBtn.download = "drawing.png"; // File name for the downloaded image
}

downloadBtn.addEventListener("click", saveCanvasAsPNG);

const aboutBtn = document.querySelector(".about");
const overlayScrn = document.querySelector(".overlayScreen");
const aboutCard = document.querySelector(".aboutCard");
aboutBtn.addEventListener("click", function () {
  overlayScrn.style.display = "block";
  aboutCard.style.display = "flex";
});
overlayScrn.addEventListener("click", function () {
  overlayScrn.style.display = "none";
  aboutCard.style.display = "none";
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    overlayScrn.style.display = "none";
    aboutCard.style.display = "none";
  }
});

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  activeBackground = "white";
});
