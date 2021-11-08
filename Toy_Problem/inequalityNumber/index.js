const inequalityNumber = function (signs) {
    //반복문을 이용해서 0부터 9까지 숫자를 탐색한 후, 재귀를 사용해서 signs의 부등호를 탐색한다
    //부등호를 조회하기 쉽도록 배열로 만든다
    signs = signs.split(' ')
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    //재귀함수를 선언해준다. 부등호 배열을 조회할 인덱스, 부등호 배열, 숫자 배열, 결과값이 저장될 배열, 숫자를 방문했는지 판별하는 배열이 인자로 들어간다
    const aux = (idx, signs, numbers, result, isVisited) => {
        //base case : 모든 부등호를 다 조회했다면 종료
        if (idx === signs.length) {
            return parseInt(result.join(''))
        }

        //각 부등호에대해서 반복문을 실행한다. 0부터 9(max의 경우 9부터 0)의 숫자를 탐색하면서 대소관계를 만족하는지를 탐색하면 된다.만족한다면 결과에 추가한뒤 다음 부등호로 넘어간다.
        //위 과정을 위해 우선 현재 탐색하는 부등호를 지정한다
        const sign = signs[idx]
        for (let i = 0; i < numbers.length; i++) {
            //현재 탐색하는 숫자를 변수로 선언하고, 만약 현재 숫자를 이미 방문했다면 다음 숫자로 넘어간다            
            const now = numbers[i]
            if (isVisited[now]) continue;

            //방문하지 않았다면, 두가지 경우로 나눠서 살펴볼수 있다
            //첫 번째로 탐색하는 부등호가 아닐때, 부등호와 숫자간의 대소관계가 알맞지 않은 경우는 건너뛴다
            if (idx >= 0) {
                //바로 직전에 탐색한 수를 변수로 선언한다
                const before = result[result.length - 1];
                if (sign === "<" && before >= now) continue;
                if (sign === ">" && before <= now) continue;
            }
            // 첫 번째로 탐색하는 부등호이거나 부등호 대소관계가 맞는경우 다음 부등호로 넘어가며 결과 배열에 해당되는 수를 추가한다
            isVisited[now] = true;
            const target = aux(idx + 1, signs, numbers, result.concat(now), isVisited);
            //그리고 재귀함수가 종료된다면 종료된 후의 값을 반환한다
            if (target !== undefined) {
                return target;
            }
            //종료 후에도 target이 반환되지 않았다면 현재 방문한 수를 방문하지 않은것으로 선언해준다
            isVisited[now] = false;
        }
        //모든 수를 돌았어도 어떤 값도 반환되지 않은 경우
        return undefined;
    }
    //최대값과 최소값을 구한 후 뺀다
    const min = aux(-1, signs, numbers, [], Array(10).fill(false))
    const max = aux(-1, signs, numbers.reverse(), [], Array(10).fill(false))

    return (max - min);
}

/*
keypoint : idx를 -1로 시작한다는 점, 그리고 isVisited를 이용해서 반복되는 수가 없도록 한다는 점

아직도 모르겠는점 : 왜 push는 되지 않고 concat만 가능한것인지(push 사용시 undefined라는 에러가 출력), isVisited를 미리 선언해놓지 않고 max와 min안에서 선언해야 하는점
*/