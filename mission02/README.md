## 네이버 로그인 페이지 구현

---

### 목표

썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

---

### 요구사항

1. 이벤트 처리 방식을 사용하여 클릭 이벤트를 걸어주세요.
   a. 이벤트 위임
   b. 반복문
2. 이미지와 색상의 데이터는 `data.js` 에서 불러와주세요.
3. 각 li 항목들을 클릭하면 배경 색상과 메인 비주얼 이미지를 변경해주세요.
   a. 배경색 변경 ( colorB의 기본값은 #000 으로 한다 )
   b. 이미지 변경
4. 비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요.
5. 함수를 분리시켜주세요.
   a. `setBgColor` 함수
   b. `setImage` 함수
   c. `setNameText` 함수
6. 가독성이 좋은 코드로 리팩토링 해주세요.

---

### 변수 설정

1. 함수에 사용될 요소들은 변수로 지정해서 코드 재활용성을 높임

```
    const ul = document.querySelector(".ul");
    const posterImg = document.querySelector(".visual img");
    const nickName = document.querySelector(".nickName");
```

### 함수 분리

클릭 이벤트 실행 시<br>

#### 배경색 변경 함수

1.  배경색 지정을 위해 data.js 파일의 객체 안 파일값에 접근 가능하도록 변수 설정
2.  body의 배경색을 바꿔주기 위해 dom 요소로 접근
3.  클릭 시 이미지 index num에 해당하는 객체값의 컬러를 순서대로 지정 <br>(첫번째 컬러 =[0],두번째 컬러 = [1])
4.  body의 배경색 = 매개변수로 지정된 색상으로 바뀌게 함수 선언

```
    const colorA = data[index - 1].color[0];
    const colorB = data[index - 1].color[1];

    function setBgColor(colorA, colorB = "#000") {
    document.body.style.background =`linear-gradient(to bottom, ${colorA}, ${colorB})`;
}
```

#### 이미지 변경 함수

1.  메인 이미지의 src 값에 클릭 이미지 순서(index)를 assets 폴더명 순으로 접근 할 수 있도록 설정
2.  메인 이미지의 alt 값에 클릭 이미지 순서(index)를 data 객체 안 alt순으로 접근 할 수 있도록 설정

```
    function setImage(index) {
    posterImg.src = `./assets/${data[index - 1].name.toLowerCase()}.jpeg`;
    posterImg.alt = data[index - 1].alt;
    }
```

#### 텍스트 변경 함수

1.  해당 이미지 캐릭터 이름값에 data 객체 안 name순으로 접근 할 수 있도록 설정

```
    function setNameText(index) {
      nickName.textContent = data[index - 1].name;
    }
```

### 이벤트 함수

1. handleClick 함수를 사용하고 preventDefault로 html 고유 동작 중지
2. e.target 속성으로 이벤트가 발생한 객체를 지정
3. .closest('li')로 li 포함한 부모요소 ul까지 선택하여 '이벤트 위임' 설정
4. if 문으로 li가 선택되지 않을땐 함수 종료 설정

```
    e.preventDefault();
    let li = e.target.closest("li");
    if (!li) return;
```

5. Array.from을 통해 ul의 자식요소들을 빈배열로 담아주고 변수로 지정
6. .forEach로 ul의 li 내 클래스 is-active값 초기화

```
    const list = Array.from(ul.children);
    list.forEach((li) => li.classList.remove("is-active"));
```

7. 선택된 이미지의 값(li의 data-index 클래스)을 dataset.index으로 접근하고 변수로 설정
8. 미리 분리해둔 함수 한꺼번에 실행
9. 함수가 실행된 이벤트 요소에 'is-active' 클래스 추가

```
    const index = li.dataset.index;
```

```
    setBgColor(colorA, colorB);
    setImage(index);
    setNameText(index);
```

```
    li.classList.add("is-active");
```

10. ul에 클릭 이벤트가 적용됐을때 handleClick 함수 실행

```
    ul.addEventListener("click", handleClick);

```

#### 이벤트 함수 최종 코드

```
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
```

### 결과

<p align="center"><img src='./readme-poster.gif'></p>

---

### 과제를 통해 느낀점

- 함수를 분리하고 한꺼번에 지정해서 사용할 수 있어 코드의 가독성이 높아짐을 알 수 있었다.
- 이벤트 위임과 dataset을 통해 클래스 값에 접근하는 방식을 활용할 수 있었다.
- 두번째 이벤트 함수를 활용한 과제를 통해 보다 이벤트 함수의 사용에 익숙해 질 수 있었다.
- 조금 더 깔끔한 코드를 작성할 수 있는 방법을 고안할 필요성을 느꼈다. 예를 들어, data[index-1]이 다양한 코드에서 활용되는데 변수로 지정할때 에러가 떠서 적용하지 못했지만 분명 방법이 있을거라 생각든다.
