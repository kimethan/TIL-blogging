# async & await

## async & await?

> 비동기 처리 패턴 중 가장 최근에 나온 문법으로,
> **_기존의 콜백 함수나 프로미스의 단점을 보완하며, 개발자가 읽기 좋은 코드를 작성하기 위함_**

- **_개발자가 읽기 좋은 코드란 무엇일까??_**
  ```jsx
  let user = {
    id: 1,
    name: 'Josh',
  };
  if (user.id === 1) {
    console.log(user.name);
  }
  ```
  우리는 이렇게 **순차적으로 위에서 아래로 읽으면서 사고하는 것이 편하다.**
  그리고 **<span style="color: orange">이런 방식으로 비동기 함수를 작성한 것이 async & await 이다.</span>**

## 쉽게 이해하는 async & await 사용 이유

- **콜백을 사용한 비동기 함수**

```jsx
function logName() {
  //fetchUser는 url이라는 서버에서 데이터를 받아오는 통신코드라고 가정
  let user = fetchUser('url', function (user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```

위처럼 콜백을 사용한 함수는 내용을 이해하기도 어려울 뿐더러, <br>내용이 길고 복잡할 수록 코드가 작동하는 방식을 예측하기 어렵다.

- **async & await를 사용한 비동기 함수**

```jsx
async function logName() {
  let user = await fetchUser('url');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

async를 사용하면 콜백 없이 순차적으로 함수를 작성하기 때문에 코드를 작성하기도, 이해하기도 쉽다.

## async & await 함수 사용법과 예제

- **기본 문법**

```jsx
async function 함수() {
  await 비동기처리코드();
}
```

1. **<span style='color: darkviolet'>async는 예약어이다.</span> `'나 이 함수 비동기 처리할 거야!'`**
2. **await는 비동기 처리되는 코드 앞에 붙는다.**  
   **<span style='color: darkviolet'>비동기 처리 메소드가 반드시 프로미스 객체를 반환할 때만 await가 작동된다.</span>`'기다려!'`**
   일반적으로 await의 대상이 되는 비동기 처리코드는 [Axios](https://github.com/axios/axios)등 프로미스를 반환하는 API호출 함수이다.

- **_예제1_**

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
}

//async 를 사용해서 Promise객체를 받아온다
//만약 async를 사용하지 않는다면?
function callback_pickFruits() {
  return getApple().then((apple) => {
    return getBanana().then(
      (banana) => `${apple}+${banana} from callback hell😈`
    );
  });
}

callback_pickFruits().then(console.log);

//위와 같은 콜백지옥을 맛볼 수 있다
//async를 쓴다면

async function async_await_pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple}+${banana} from async&await!!`;
}

async_await_pickFruits().then(console.log);
//위와 같이 우리가 훨씬 이해하기 쉬운방식으로 볼 수 있다.
```

- **_예제2_**

```jsx
function fetchUser() {
  let url = 'https://domain.com/user/1';
  return fetch(url).then(function (res) {
    return res.json();
  });
}
```

위와 같이 서버로부터 유저 정보를 프로미스 객체로 가져오는 통신 함수가 있다고 하자.
우리가 async와 await로 구현해야할 로직은

1. fetchUser()를 하여 사용자 정보를 호출한다.
2. 받아온 사용자의 아이디가 1이면 콘솔에 사용자 정보를 출력한다

```jsx
async function logUserData() {
  let user = await fetchUser();
  if (user.id === 1) {
    console.log(user.info);
  }
}
```

위처럼 우리가 사용하는 함수의 동작 방식과 동일하게 비동기 처리를 할 수 있다.
위에서 사용된 [fetch는 HTTP통신에 관련된 API메소드](브라우저/AJAX/README.nd)이다.

## async & await 에러 처리

프로미스에서 에러를 처리할 때 `.catch()`를 사용했다면, **async는 `try{} catch{}`를 사용한다.**  
위의 예제2 로 살펴보면

```jsx
function fetchUser() {
  let url = 'https://domain.com/user/1';
  throw 'error';
  return fetch(url).then((res) => res.json());
}
//만일 함수에서 error가 발생한다면

async function logUserData() {
  try {
    let user = await fetUser();
    if (user.id === 1) {
      console.log(user.info);
    }
  } catch (error) {
    console.log(error);
  }
}
```

위와 같은 방법으로 에러를 처리할 수도 있다.

## await의 병렬처리

예제 1을 다시 살펴보면,

```jsx
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
}

async function async_await_pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple}+${banana} from async&await!!`;
}

async_await_pickFruits().then(console.log);
```

apple과 banana를 가져오는데 각각 1초씩 소요가 된다.

> getApple await 1초 + getBanana await 1초 = 2초

이것은 상당히 비효율적이기 때문에 await를 병렬처리하여 한번에 Promise를 받아올 수 있다.

1. ~~**_Promise를 먼저 받아오기_**~~

```jsx
/*
...(생략)...
*/
async function pickFruits() {
  const promiseApple = getApple();
  const promiseBanana = getBanana();
  //await를 사용하지 않고 비동기 함수를 호출하면 Promsie를 먼저 반환한다.
  //즉 둘은 독립적으로 값을 가져오고
  const apple = await promiseApple;
  const banana = await promiseBanana;
  //그럼 1초씩 기다리지 않아도 둘은 한번에 await 시킬 수 있다
  return `${apple}+${banana}`;
}
```

그러나 보시다시피 이 코드는 보기도 길어질 뿐더러 상당히 작성하기 귀찮다.  
그래서 이때 사용하는 유용한 API가 있다.

2. **_`Promise.all()` 사용하기_**

```jsx
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(' + ')
  );
}
pickAllFruits().then(console.log);
```

위처럼 작성하면 한번에 여러 Promise객체를 받아올 수 있다

- **_혹은 먼저 출력되는 값을 보고싶을 땐 `Promise.race()`_**

```jsx
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
```

[Promise.all()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)과 [Promise.race()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)에 대한 설명은 공식문서를 참고하자
