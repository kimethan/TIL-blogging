# Time Complexity(시간 복잡도)
> *알고리즘 문제는 해답을 찾는 것 만큼 효율적인 방법으로 문제를 해결했는지도 중요하다
여기서 말하는 효율적인 방법은 시간복잡도를 고민했는지를 말하는것이다
"입력값의 변화에 따라 연산을 실행할 때, 연산횟수에 비해 시간이 얼만큼 걸리는지"*
>

# Big-O 표기법
  시간복잡도에 따라 세가지로 구분된다
  - Big-O
  - Big-Ω(빅-오메가)
  - Big-θ(빅-세타)
  
  각각의 표기법은 최악, 최선, 평균의 시간 복잡도를 나타낸다.
  그 중에서 Big-O를 주로 다루는 이유는, 프로그램에서 실행되는 최악의 상황을 고려하기 때문에 최적화에 있어서 고려해야하는 필수적인 시간복잡도이기 때문이다
  
## O(1)
 > Constant Complexity <br>
입력값에 상관없이 즉시 출력이 가능하다
>


  <img src="https://user-images.githubusercontent.com/87476435/140919049-15673f04-9d62-46bd-a4d4-2fc957da1024.png">   

  ```jsx
  function O_1_algorithm(arr, index) {
    return arr[index];
  }

  let result = O_1_algorithm([1, 2, 3], 1)
  console.log(result)//2
  ```

## O(n)의 시간복잡도

> Linear Complexity
입력값과 시간이 비례한 경우, 입력값이 커질수록 연산이 길어진다
>
  <img src="https://user-images.githubusercontent.com/87476435/140920210-1c972af8-2201-451d-9d66-6ec9ebe0b921.png">
  
  ```jsx
  function O_n(n) {
    for(let i=0; i < n; i++) {
     //something for 1second
     }
  }
  
  function another_O_n(n) {
    for(let i=0; i < 2n; i++) {
      //something for 1second
    }
  }
  ```
  위의 코드들을 보면 입력값이 1씩 증가함에 따라 각각 1초 2초씩 연산속도가 증가함을 확인할 수 있다.
  즉 입력값에 따라 같은 비율로 연산시간이 증가하고, 이러한 복잡도를 가지는 것을 O(n)으로 표기할 수 있다

## O(log n)의 시간복잡도

> Logarithmic Complexity
  Big-O 표기법중  O(1) 다음으로 빠른 표기법.
  연산을 진행할때마다 다음 연산의 범위를 절반으로 줄여나가기 때문에 연산속도가 빠르다

  <img src="https://user-images.githubusercontent.com/87476435/140922730-d54102a9-9b02-4796-8843-862d6238a7dc.png">
  
  이 시간복잡도는 BST에서 절반으로 범위를 줄여나가면서 탐색하는 것과 동일한 로직이다.
  아무리 최악의 경우라도 7번이면 원하는 숫자를 찾을 수 있기 때문에 O(1)다음으로 빠른 시간복잡도이다

## O($n^2$)의 시간복잡도

> Quadratic Complexity
입력값에 따라 시간이 n의 제곱수 비율로 증가하는 로직

  ```jsx
  function quadra(n) {
    for(let i=0; i < n; i++) {
      for(let j=0; j < n; j++) {
        //do something for 1second
      }
    }
  }
  
  function another_quadra(n) {
    for(let i=0; i < n; i++) {
      for(let j=0; j < n; j++) {
        for(let k=0; k < n; k++) {
          //do something for 1second
        }
      }
    }
  }
  ```
  위의 코드를 보면 n * n에 비례하는 연산을 수행한다. 이렇듯 n의 제곱수에 비례하는 로직은  O($n^2$)으로 표기할 수 있다
<img src="">

<img src="">
