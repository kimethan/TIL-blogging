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
    > *Constant Complexity
    입력값과 상관없이 연산시간은 일정하다.
    >
    ![O1복잡도](https://user-images.githubusercontent.com/87476435/140919049-15673f04-9d62-46bd-a4d4-2fc957da1024.png)
    ```jsx
    function O_1_algorithm(arr, index) {
      return arr[index]
    }
    
    let result = O_1_algorithm([1, 2, 3], 1)
    console.log(result)//2
    ```