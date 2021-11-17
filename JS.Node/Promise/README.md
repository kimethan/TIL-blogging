# <span style="color: orange">Promise</span>

## <span style="color: skyblue">Promise?</span>

- **콜백을 핸들링하는 기능**<br>
  > Promise는 주로 자바스크립트의 비동기 처리에 사용된다.

<br>

### **promise가 왜 필요한가?**

**Promise는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용된다.**<br>
일반적으로 웹 애플리케이션을 구현할때 서버에서 데이터를 요청하고 받아오기 위해 아래와 비슷한 형식의 API를 사용한다.

<br>

```jsx
$.get('url 주소/products/1', function (res) {
  //res에 대한 작업
});
```

위 요청을 받으면 서버에 데이터를 보내달라는 요청을 하게 된다.<br>
그런데 여기서 [데이터를 받아오기도 전에 데이터를 출력하려고 하면 오류가 발생하거나 빈 화면이 뜬다](../asynchronous/README.md#비동기는-어떻게-사용하는가).
이런 문제를 해결하기 위한 방법으로 Promise를 사용할 수 있다.

## <span style="color: skyblue">Promise의 동작법 </span>

간단한 예제를 통해서 프로미스가 작동하는 체계를 이해해보자

```jsx
function detData(callback) {
  $.get('url주소/products/1', function (res) {
    callback(res);
    //서버에서 받아온 데이터를 callback()함수에 넘겨준다
  });
}

getData(function (tableData) {
  console.log(tableData); //get으로 받아온 res는 tableData에 담긴다
});
```

위는 비동기 콜백 함수로 작성된 아주 간단한 형태의 AJAX 통신의 예제이다.
이 코드를 promise로 작성하면 무엇이 다를까?

```jsx
function getData(callback) {
  return new Promise(function (resolve, reject) {
    //new Promise()가 추가
    $.get('url주소/products/1', function (res) {
      //데이터를 받아오면 resolve()를 호출
      resolve(res);
    });
  });
}

//getData()실행 후 .then()을 통해 다음 행동을 정의
getData().then(function (tableData) {
  //resolve()의 값이 tableData로 전달
  console.log(tableData);
});
```

여기서 `new Promise()`, `resolve()`, `then()` 과 같은 새로운 문법이 등장하는데, 각각은 무엇을 하는 것일까?

## <span style="color: skyblue">Promise의 3가지 상태</span>

**promise의 상태는 가장 기본적인 개념이다. 각 상태는 promise의 처리과정을 의미한다.**
`new Promise()`로 프로미스가 생성되고 종료될때까지 3가지 상태가 존재한다.

- **pending(대기): 비동기 처리 로직이 완료되지 않은 상태**<br>
  아래 처럼 **`new Promise()`를 통해 최초의 pending 상태로 만들 수 있다.**

  ```jsx
  new Promise();
  //일종의 클래스이기 때문에 대문자로 작성해주어야 한다.
  ```

  **`new Promise()`메서드를 호출할 때 콜백함수를 선언하고, 함수의 인자로는 `resolve`, `reject`가 들어간다.**

  ```jsx
  new Promise(function (resolve, reject) {
    //
  });
  ```

- **Fullfilled(이행, 완료): 비동기 처리가 완료되어 프로미스가 결과값을 반환한 상태**<br>
  이제 콜백함수의 인자인 **resolve를 아래처럼 실행하면 Fullfilled 상태가 된다.**

  ```jsx
  new Promise(function (resolve, reject) {
    resolve();
  });
  ```

  그리고 **Fullfilled 상태가 되면 아래처럼 then()을 이용해 처리 결과 값을 받을 수 있다.**

  ```jsx
  function getData() {
    return new Promise(function (resolve, reject) {
      let data = 100;
      resolve(data);
    });
  }

  //resolve()의 결과값 data를 resolveData로 받음
  getData().then(function (resolveData) {
    console.log(resolveData); //100
  });
  ```

- **Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태**<br>
  **`reject`를 호출 시 실패 상태가 된다.**<br>
  그리고 **실패 상태가 되면 실패한 이유(실패 처리 결과 값)를 `catch()`로 받을 수 있다.**

  ```jsx
  function getData(data) {
    return new Promise(function (resolve, reject) {
      resolve(data);
      reject(new Error('request is failed'));
    });
  }

  //reject()의 결과값  Error를 err에 받음
  getData()
    .then()
    .catch(function (err) {
      console.log(err); //Error: request is failed
    });
  ```

  - 앞선 AJAX 통신 예제에 프로미스의 모든 상태를 적용시키면 다음과 같다

  ```jsx
  function getData() {
    new Promise(function (resolve, reject) {
      $.get('url주소/products/1', function (res) {
        //요청한 res가 정상적일 경우 resolve()로 res를 전달
        if (res) {
          resolve(res);
        }
        reject(new Error('request is failed'));
      });
    });
  }

  //위 get의 결과에 따라 res 또는 Error를 출력
  getData()
    .then(function (data) {
      console.log(data); //받은 데이터가 정상적이라면 res 출력
    })
    .catch(function (err) {
      console.error(err); //받은 데이터가 err일 경우 err출력
    });
  ```

## <span style="color: skyblue">Promise 여러 개 연결하기</span>

프로미스의 또 다른 특징은 **여러개의 프로미스를 연결할 수 있다는 점이다.**
앞에서 then()메서드를 호출하고 나면 새로운 프로미스 객체가 반환된다.

```jsx
function getData() {
  return new Promise({
    //...
  });
}

//then()으로 Promise를 연결
getData()
  .then(function (data) {
    //..
  })
  .then(function () {
    //..
  })
  .then(function () {
    //..
  });
```

- Promise 연결 예제1 : `setTimeout()`

  ```jsx
  new Promise(function (resolve, reject) {
    //2초뒤에 resolve()에 1이 들어가는 Promise 객체
    setTimeout(function () {
      resolve(1);
    }, 2000);
  })
    .then(function (result) {
      console.log(result); //1
      return result + 10;
    })
    .then(function (result) {
      console.log(result); //11
      return result + 20;
    })
    .then(function (result) {
      console.log(result); //31
    });
  ```

- Promise 연결 예제2 : 로그인 인증

  ```jsx
  let userInfo = {
    id: 'promise@github.com',
    pw: '****',
  };

  function parseValue() {
    return new Promise({
      //..parsing code
    });
  }
  function auth() {
    return new Promise({
      //..secure code
    });
  }
  function display() {
    return new Promise({
      //..display code
    });
  }

  //로그인 과정은 다음과 같은 과정을 거친다
  getData(userInfo) //userInfo로 유저 정보가 담긴 객체를 불러옴
    .then(parseValue) //Value를 파싱해준다
    .then(auth) //보안에 관련된 프로미스를 반환하는 함수
    .then(display); //화면에 결과를 나타내는 프로미스를 반환하는 함수
  ```

## <span style="color: skyblue">Promise 에러 처리하기</span>

예제와는 다르게, 실제에서는 네트워트 연결이나 서버문제로 오류가 발생한다.
우리는 이때 reject로 에러에 대한 결과를 지정해주었다.
사실 에러를 처리하는데 두가지 방법이 존재한다.

1. `then()`의 두번째 인자로 에러를 처리하는 방법
2. `catch()`로 에러를 처리하는 방법

```jsx
function getData() {
  return new Promise({
    //..
  });
}

//1.then()의 두번째 인자로 에러를 처리하기
getData().then(
  function () {
    //... resolve
  },
  function (err) {
    console.log(err);
  }
);

//2.catch()로 에러를 처리하는 방법
getData()
  .then()
  .catch(function (err) {
    console.log(err);
  });
```

**그러나 가급적이면 `catch()`를 사용하는것이 더욱 효율적이고 안정적이다.**
예외의 경우 때문인데, 예를 들면 then()의 첫번째 콜백에서 에러가 나는 경우,<br> `catch()`로는 오류를 잡아내는 반면, 두번째 인자로 오류를 처리하는 경우는 잡아내지 못한다.

```jsx
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

//1.두번째 인자로 에러를 처리하는 경우
getData().then(
  function (result) {
    console.log(result);
    throw new Error('Error in then()');
  },
  function (err) {
    console.log('then error: ', err);
  }
);

//2.catch()로 오류를 처리하는 경우
getData()
  .then(function (result) {
    console.log(result);
    throw new Error('Error in then()');
  })
  .catch(function (err) {
    console.log('then error: ', err);
  });
```

각각의 실행 결과는 다음과 같다

<img src="">
<img src="">

[참고: 캡틴판교 블로그](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
