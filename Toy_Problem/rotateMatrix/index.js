const rotateMatrix = function (matrix, k) {
  /*예시로 3*3의 매트릭스를 살펴본다면
  [1,2,3]
  [4,5,6]
  [7,8,9]
  위 배열을 90도로 회전시킨다면
  [7,4,1]
  [8,5,2]
  [9,6,3]
  이 된다. 각 행을 reverse()할 경우
  [1,4,7]
  [2,5,8]
  [3,6,9]
  가 되는데,(
  이를 살펴보면 row(행)에 해당하는 값이 col(열)로 바뀐것을 알 수 있다
  이를 이용해서 코드를 구현하면
  */
  if (!matrix.length) return [];
  let result = [];//결과가 저장되는 배열
  for (let n = 0; n < matrix[0].length; n++) {
    //result를 matrix와 같은 구조로 만듬
    result.push([])
  }

  for (let i = 0; i < matrix[0].length; i++) {
    //각 행의 값만큼 반복
    for (let j = 0; j < matrix.length; j++) {
      //각 열의 값만큼 반복
      //행의 값은 열의 값이 되어야한다.
      result[i].push(matrix[j][i])
    }
    //한 행씩 추가 되었을 경우 reverse()해준다
    result[i].reverse()
  }

  //회전수 k의 경우 4로 나눈 나머지로 각각 판단할 수 있다
  if (k === 0 || k % 4 === 0) {
    //회전수가 없는 경우는 받은 matrix를 그대로 반환
    return matrix;
  } else if (k === undefined || k % 4 === 1) {
    //회전수가 1인경우 위에서 구한 result를 반환
    return result;
  } else if (k % 4 === 2) {
    //회전수가 2인 경우 180도 돌린것과 마찬가지
    //이 경우는 각 행이 반대가 된후 reverse()된것과 마찬가지이다
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].reverse()
    }
    matrix.reverse()
    return matrix;
  } else {
    //회전수가 3일 경우는 result가 2번 반전된 경우이다
    for (let i = 0; i < result.length; i++) {
      result[i].reverse()
    }
    result.reverse()
    return result;
  }
};
