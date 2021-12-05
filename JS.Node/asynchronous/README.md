# 비동기

## 비동기가 뭐야?

- **blocking vs non-blocking**

  <img src="https://user-images.githubusercontent.com/87476435/142168836-9996e831-dd80-41fa-90ef-cfd0ef1be42c.png" width="500" height="350">

  위의 사진처럼, blocking은 하나의 작업이 종료될때까지, 다른 작업을 수행할 수 없는 상태를 의미한다.<br>
  당연하게도 반대의 의미를 가진 **non-blocking에서는 이전 작업의 종료여부와 관계없이 다른 작업을 수행할 수 있다.**

- **비동기(asynchronous) vs 동기(synchronous)**

  **따라서 작업이 blocking이 되는걸 "동기적"/ non-blocking 되는걸 "비동기적"이라고 한다.**<br>
  그 중에서 비동기가 특히 중요한 이유는, **네트워크 요청을 비롯한 중요한 서비스들은 대부분 비동기적으로 이루어지기 때문이다.**

  _당신이 비동기를 사용하지 않는다면 네이버 로딩창을 띄우는 동안 컴퓨터에서 다른 작업(심지어는 메모장을 켜는것도)을 일절 못하는것이다. ~~그 시간에 국밥 한그릇을 더 먹~~_

  ## 비동기는 어떻게 사용하는가?

  우선 비동기를 사용한 가장 보편적인 사례를 보자면 **AJAX 통신**을 예로 들 수 있다.

  ```jsx
  function getData() {
    var tableData;
    $.get('https://domain.com/products/1', function (response) {
      tableData = response;
    });
    return tableData;
  }

  console.log(getData());
  ```

  위 코드를 설명하자면 getData라는 함수는 현재 https://domain.com/products/1 에 HTTP get요청을 통해서 1번 상품의 정보를 요청하는 것이다.
  <br>이 때, `$.get()`이 AJAX 통신을 하는 부분이다.(아직 모른다면 그런 것이구나 생각하고 넘어가도 충분하다)<br>

  이렇게 서버에서 받아온 데이터는 response라는 인자에 담기고, 우리는 tableData라는 변수에 그 값을 할당하기로 했다.<br>
  그렇다면 console.log를 통해 출력된 getData의 값은 과연 무엇일까?

  놀랍게도 undefined이다.(~~와우~~)<br>
  get 요청에 대한 이해가 없다면 상당히 의아할 것이지만, 앞서 말했듯이 AJAX 요청은 비동기를 사용하는 가장 보편적 사례라고 했다.

  즉, get요청이 이루어지고 난 뒤에 console.log가 실행되는것이 아닌 get과는 별개로 console.log가 실행되어,<br>
  아직 웹에서 데이터를 받아오지도 못했는데 출력시키니 undefined를 출력할 수 밖에 없는 꼴이다.

  또 다른 예로, 간단히 비동기와 같은 역할 실행할 수 있는 함수가 있다.<br>
  바로 **`setTimeout(callback, millisecond)` 함수이다.<br>
  이 함수는 Web API의 한 종류로, callback을 바로 실행하지 않고, millisecond(1000ms = 1sec)후에 실행하는 함수이다.**

  ```jsx
  console.log('who');

  setTimeout(function () {
    console.log('is');
  }, 3000);

  console.log('first');
  ```

  위의 함수에서 출력되는 순서는 who, is, first 일까?<br>
  오답이라는것을 아는 당신은 매우 영리하다.<br>
  setTimeout()은 비동기적인 함수라는 것을 알기에, 콘솔과는 별개로 실행된다는 것을 알 수 있다.<br>
  따라서 실제 콘솔에 출력되는 값은 who, first, is 이다.

  ## 비동기방식의 문제점 해결하기

  위에서 비동기 방식이 무엇이고, 어떻게 사용되는지 살펴보았다.<br>
  근데 이런 의문이 생길 수 있다.<br>

  _"그럼 AJAX에서 데이터를 어떻게 받아와야되는데?"_<br>

  비동기 방식을 사용하면 아까 본것처럼 데이터가 undefined가 사용될텐데, 그렇다고 모든 함수에 setTimeout()을 점점 늘려가며 사용할 수도 없는 노릇이다.

  답은 바로 **callback함수를 사용하는 것이다.**

  콜백이 무엇인가, 함수의 인자로 함수를 넘겨주는 것이다. 위의 AJAX요청에 callback함수를 이용해 보자.

  ```jsx
  function getData(callback) {
    $.get('https://domain.com/products/1', function (response) {
      callback(response);
    });
  }

  getData(function (tableData) {
    console.log(tableData);
  });
  ```

  위의 코드를 단계별로 보면,

  1. _getData 함수의 인자에 tableData를 출력하는 함수를 인자로 넣어준다._
  2. _getData 함수는 웹에서 get요청으로 데이터를 받아온다._
  3. _받아온 데이터를 response에 담고, callback 인자에 그 데이터를 담는다._
  4. _callback 함수의 인자인 tableData에 그 데이터가 담긴다._
  5. _웹에서 받아온 데이터 response는 tableData에 담겨 출력된다._

  이런 방식으로 callback을 이용해서 비동기 방식의 문제 해결이 가능하다.

  좀 다른 예제를 보자<br>
  카페에서 커피를 주문할 때도, 우리는 비동기적으로 주문을 하고, 음료를 받는다. <br>
  그런 상황을 코드로 구현한다면 다음과 같이 적을 수 있다.

  ```jsx
  function waitAsync(callback, ms) {
    setTimeout(callback, ms);
  }
  //callback 함수를 ms 이후에 실행하는 함수

  function drink(person, coffee) {
    console.log(`${person}이 ${coffee}를 마십니다.`);
  }

  let customer = [
    {
      name: 'ehtan',
      request: '카라멜마끼야또',
    },
    {
      name: 'dean',
      request: '아메리카노',
    },
  ];
  //고객과 주문이 담긴 객체

  function orderCoffee(menu, callback) {
    console.log(menu + '가 접수되었습니다');
    waitAsync(function () {
      callback(menu);
    }, Math.floor(Math.random() * 100) + 1);
  }
  //주문이 접수된걸 출력하고, 이후 몇초 뒤에 callback 함수에 menu인자를 넣어서 실행

  customer.forEach(function (customer) {
    orderCoffee(customer.request, function (coffee) {
      //고객 객체의 각 값에 orderCoffee함수를 실행한뒤, menu에는 주문된 커피를 담는다
      drink(customer.name, coffee);
      //orderCoffee의 callback에는 drink함수가 몇초 뒤에 실행된다.
    });
  });
  ```

  위 코드를 따라하면서 원하는 대로 콘솔에 구동되는지 확인해보는걸 추천한다.

  ## 비동기방식의 다른 문제점, callback hell

  만약, 당신이 로그인페이지를 하나 만든다고 치자.<br>
  사용자인증부터, 인코딩, 데이터 파싱등 다양한 작업을 거쳐야 하고, 모든 과정이 비동기적으로 이루어 진다면,<br>
  콜백이 수없이 꼬리에 꼬리를 무는 형태를 가지게 된다.

  ```jsx
  $.get('url', function (res) {
    parseValue(res, function (id) {
      auth(id, function (result) {
        display(result, function (text) {
          console.log(text);
        });
      });
    });
  });
  ```

  이런 형태를 **콜백지옥(callback hell)** 이라고 한다.<br>
  이런 콜백지옥을 벗어나는데는 간단하게 각 콜백함수를 따로 적어두는 방법도 있긴하지만(위의 커피 주문 방식이 해당된다),<br>
  **Promise와 Async를 사용하는것이 가장 유용하다.**
  [이에 대한 내용은 여기서 살펴보자.](../Promise/README.md)

[참고: 캡틴판교 블로그](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
