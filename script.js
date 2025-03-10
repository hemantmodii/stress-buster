container.addEventListener("click", (event) => {
  const circle = document.createElement("div");
  if(circle) {
    circle.classList.remove("pulse");
  }
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  circle.classList.add("circle");

  const circleX = event.clientX;
  const circleY = event.clientY;
  circle.style.left = `${circleX}px`;
  circle.style.top = `${circleY}px`;
  container.appendChild(circle);

  const randomColor = Math.ceil(Math.random() * 16777215).toString(16);
  circle.style.backgroundColor = `#${randomColor}`;

  circle.innerHTML = `<p>${circleX}, ${circleY}</p>`;
  circle.style.fontSize = "8px";
  circle.style.textAlign = "center";

  function createLine(
    className,
    startX,
    startY,
    endX,
    endY,
    isHorizontal,
    randomColor
  ) {
    const line = document.createElement("div");
    line.classList.add(className);
    line.style.position = "absolute";
    line.style.transition = "all 0.4s cubic-bezier(1,0,.52,.94)";

    if (isHorizontal) {
      line.style.left = `${startX}px`;
      line.style.top = `${startY}px`;
      line.style.width = "2px";
      line.style.height = "2px";
    } else {
      line.style.left = `${startX}px`;
      line.style.top = `${startY}px`;
      line.style.width = "2px";
      line.style.height = "2px";
    }

    container.appendChild(line);
    line.style.backgroundColor = `#${randomColor}`;

    setTimeout(() => {
      if (isHorizontal) {
        line.style.left = `${Math.min(startX, endX)}px`;
        line.style.width = `${Math.abs(endX - startX)}px`;
      } else {
        line.style.top = `${Math.min(startY, endY)}px`;
        line.style.height = `${Math.abs(endY - startY)}px`;
      }

      setTimeout(() => {
        if (isHorizontal) {
          if (startX > endX) {
            line.style.left = `${Math.max(startX, endX)}px`;
          }
          line.style.width = `0px`;
        } else {
          if (startY > endY) {
            line.style.top = `${Math.max(startY, endY)}px`;
          }
          line.style.height = `0px`;
        }
      }, 400);
    }, 10);
  }

  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  // Right line
  createLine(
    "horizontal-line",
    circleX + 30,
    circleY,
    maxWidth,
    circleY,
    true,
    randomColor
  );

  // Left line
  createLine(
    "horizontal-line",
    circleX - 30,
    circleY,
    0,
    circleY,
    true,
    randomColor
  );

  // Top line
  createLine(
    "vertical-line",
    circleX,
    circleY - 30,
    circleX,
    0,
    false,
    randomColor
  );

  // Bottom line
  createLine(
    "vertical-line",
    circleX,
    circleY + 30,
    circleX,
    maxHeight,
    false,
    randomColor
  );

  setTimeout(() => {
    circle.classList.add("show");
    circle.classList.add("pulse");

    setTimeout(() => {
      circle.classList.remove("show");
    }, 500);
  }, 100);
});


const text = document.getElementById("text");
text.textContent = `${window.innerWidth < 760 ? "Tap" : "Click"} anywhere`;

const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.textContent = "🌜";
toggleTheme.addEventListener("click", () => {
  if (toggleTheme.textContent === "🌜") {
    toggleTheme.style.backgroundColor = "black";
    toggleTheme.style.color = "white";
    toggleTheme.textContent = "🌞";
    toggleTheme.style.setProperty("--toggle-circle-border", "2px solid white");
    toggleTheme.style.setProperty("--theme-border", "2px solid skyblue");
    toggleTheme.style.backgroundColor = "skyblue";
    container.style.backgroundColor = "white";
    container.style.color = "black";
    text.style.color = "black";
    circle.style.color = "black";
    
  } else {
    toggleTheme.style.backgroundColor = "white";
    toggleTheme.style.color = "black";
    toggleTheme.textContent = "🌜";
    toggleTheme.style.setProperty("--toggle-circle-border", "2px solid black");
    toggleTheme.style.setProperty("--theme-border", "2px solid darkblue");
    toggleTheme.style.backgroundColor = "darkblue";
    container.style.backgroundColor = "black";
    container.style.color = "white";
    text.style.color = "white";
    circle.style.color = "white";
  }

  setInterval(() => {
    circle.style.opacity = Math.random();
  }, 1000);
});
