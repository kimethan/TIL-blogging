# 비동기

  ## 비동기가 뭐야?
- **blocking vs non-blocking**

  <img src="https://user-images.githubusercontent.com/87476435/142168836-9996e831-dd80-41fa-90ef-cfd0ef1be42c.png" width="500" height="350">

   위의 사진처럼, blocking은 하나의 작업이 종료될때까지, 다른 작업을 수행할 수 없는 상태를 의미한다.<br>
   당연하게도 반대의 의미를 가진 **non-blocking에서는 이전 작업의 종료여부와 관계없이 다른 작업을 수행할 수 있다.**
 
- **비동기(asynchronous) vs 동기(synchronous)**
  
  **따라서 작업이 blocking이 되는걸 "동기적"/ non-blocking 되는걸 "비동기적"이라고 한다.**<br>
  그 중에서 비동기가 특히 중요한 이유는, **네트워크 요청을 비롯한 중요한 서비스들은 대부분 비동기적으로 이루어지기 때문이다.**
  
  *당신이 비동기를 사용하지 않는다면 네이버 로딩창을 띄우는 동안 컴퓨터에서 다른 작업(심지어는 메모장을 켜는것도)을 일절 못하는것이다. ~~그 시간에 국밥 한그릇을 더 먹~~*
  
  ## 비동기는 어떻게 사용하는가?
  
  우선 비동기를 사용한 가장 보편적인 사례를 보자면 **AJAX 통신**을 예로 들 수 있다.
  
  ```jsx
  function getData() {
    var tableData;
    $.get('https://domain.com/products/1', function(response) {
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
  console.log('who')
  
  setTimeout(function() {
    console.log('is');
    }, 3000);
    
  console.log('first');
  ```
  위의 함수에서 출력되는 순서는 who, is, first 일까?<br>
  오답이라는것을 아는 당신은 매우 영리하다.<br> 
  setTimeout()은 비동기적인 함수라는 것을 알기에, 콘솔과는 별개로 실행된다는 것을 알 수 있다.<br>
  따라서 실제 콘솔에 출력되는 값은 who, first, is 이다.
  
  
