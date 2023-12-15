/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// 변수 설정
const ul = document.querySelector(".ul");
const posterImg = document.querySelector(".visual img");
const nickName = document.querySelector(".nickName");

// 함수 설정 및 분리
// 1) 배경색 변경
function setBgColor(colorA, colorB = "#000") {
  document.body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
}
// 2) 이미지 변경
function setImage(index) {
  // posterImg.src = `./assets/${data[index - 1]["name"].toLowerCase()}.jpeg`;
  posterImg.src = `./assets/${data[index - 1].name.toLowerCase()}.jpeg`;
  posterImg.alt = data[index - 1].alt;
}

// 3) 텍스트 변경
function setNameText(index) {
  nickName.textContent = data[index - 1].name;
}

// 이벤트 함수
function handleClick(e) {
  e.preventDefault();
  let li = e.target.closest("li");
  if (!li) return;

  const list = Array.from(ul.children);
  list.forEach((li) => li.classList.remove("is-active"));

  const index = li.dataset.index;
  const colorA = data[index - 1].color[0];
  const colorB = data[index - 1].color[1];
  setBgColor(colorA, colorB);
  setImage(index);
  setNameText(index);
  li.classList.add("is-active");
}

ul.addEventListener("click", handleClick);
