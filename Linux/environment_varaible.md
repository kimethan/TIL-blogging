> *API key와 같이 공개할 수 없는 정보가 코드에 포함될 경우, 네트워크를 통해 API key가 공개될 수 있다. 
이를 방지하기 위해, JavaScript에서 변수에 문자열을 할당하는 것처럼, API key를 PC에서 사용하는 변수에 할당하여 API key를 PC에 저장해두고 사용해야 한다. 
그러나 JavaScript의 변수는 스코프에 따라 파일 A에서 전역변수로 선언하더라도, 다른 파일 B에서 파일 A의 전역변수에 접근할 수 없다.
따라서 파일 A의 전역변수를 `export` 하여 파일 B에서 파일 A의 전역변수에 접근 할 수 있도록 한다.
Linux 기반의 운영체제의 PC에는 시스템 자체에 전역변수를 설정할 수 있고 그런 전역변수를 환경변수라고 한다. 그리고 `export` 명령어를 이용해 환경변수를 설정할 수 있다.*
> 
- **Achivement Goals**
    - [ ]  PC에 저장된 환경변수를 확인할 수 있다. `export`
    - [ ]  PC에 저장된 환경변수를 불러올 수 있다. `dotenv`
    - [ ]  Node.js에서 환경변수를 영구적용할 수 있다. `.env`

---

# 환경변수 사용법

## 1. `export`

> *환경 변수 확인 및 환경 변수 임시 적용*
> 

Linux에는 이미 많은 환경 변수가 설정되어 있다. `export` 명령어를 사용하면 기록된 환경변수를 조회할 수 있다

<img src="https://user-images.githubusercontent.com/87476435/140715507-1565644f-8607-405f-8d4a-a7ce44c4c122.png" width="300" height="150">

이렇듯 다양한 환경변수를 조회할 수 있다

또, `export` 명령어는 조회 뿐 아니라 새로운 환경변수의 설정도 가능하다.

```bash
#이 때는 등호표시 앞뒤로 반드시 공백이 없도록 한다
export urclass='is good'
```

새롭게 적용된 환경변수를 확인하려면 `echo` 명령어를 사용한다. 그리고 변수의 앞에는 `$` 을 표시하여 찾고자 하는 값이 변수임을 명시한다.

<img src="https://user-images.githubusercontent.com/87476435/140715719-4ccb7026-3edc-4f32-becd-32f24b180d7b.png" width="300" height="120">

## 2. `dotenv`

> JavaScript에서 환경변수 사용하기
> 

이것은 npm 모듈중 dotenv를 사용해서 환경변수를 사용하는 방법이다.

모듈을 사용하기 위해 새로운 폴더를 만들고 `npm init` 을 입력한다. 이후 `npm i dotenv` 를 입력해서 모듈을 설치할 수 있다(생성된 폴더와 설치할 모듈의 이름이 같으면 안된다)

```bash
mkdir environment_variable
cd environment_variable
npm init
npm i dotenv
```

이후 설치된 dotenv를 통해 환경변수에 접근할 수 있다.

새로운 파일 index.js를 생성하고 process.env를 출력시킨 후 Node.js의 내장객체 `process.env`를 이용하면 `export`로 확인한 내용과 동일한 내용을 객체로 출력한다

<img src="https://user-images.githubusercontent.com/87476435/140715869-415872c6-573d-4ee4-86ae-f0155a58fe0b.png" width="" height="">

<img src="https://user-images.githubusercontent.com/87476435/140715923-bbf099a0-1a64-4710-a189-b481aaefde13.png" width="440" height="140">

node와 export의 결과가 동일하다

## 3. `.env`

> Node.js에서 환경변수 영구적으로 적용하기
> 

`export` 명령어를 사용한 환경변수는 사용중인 터미널에서만 임시적으로 적용된다.

영구적으로 저장하는 방법 중 하나는Node.js 를 이용하는 것이다.

1. .env 파일을 만들고, 사용하고자 하는 환경변수를 입력한 뒤 저장한다
    
    <img src="https://user-images.githubusercontent.com/87476435/140715985-fd2a128c-641d-45a1-a29a-bba4831588bd.png" width="" height="">
    
2. dotenv 모듈을 이용해서 파일 .env에 저장한 환경변수를 조회하거나 수정할 수 있다
    
    <img src="https://user-images.githubusercontent.com/87476435/140716025-02aaf10c-044f-412c-99a3-b50126b04689.png" width="" height="">
    

# 환경변수 사용의 필요성

API keys나 DB Password와 같은 보안이 중요한 정보는 외부에게 유출되지 않고도 컴퓨터에 저장되어야 한다. 

그 뿐 아니라 서로 다른 PC나 여러 .env 파일에서 같은 변수 이름에 다른 값을 할당할 때도 있다.

실제 서비스를 개발하는 과정에서는 개발 환경(local, development)과 테스트 서버(test)의 환경, 그리고 실제 제품을 제공하는 환경(production)이 있다.

구글 API를 이용해서 웹 애플리케이션을 만든다면, 개발환경에서는 개발자 개인의  API키를 이용할 수 있지만 제품을 서비스할때는 개인 API key를 사용한다면, 일일 요청량을 초과하는 경우 서비스가 제대로 작동할 수 없다.

이런 경우를 방지하기 위해서 실제 서비스에서는 기업용 API key를 사용한다.

이처럼 개발환경과 제품제공 환경의  API key가 다른경우, 환경변수를 이용해서 환경을 구분하고, 코드를 작성할 수 있다.

데이터베이스 또한 개발, 테스트, 제품환경으로 구분된다.

<img src="https://user-images.githubusercontent.com/87476435/140716067-9865e6c4-1341-47b9-b4e0-5d694c323498.png" width="300" height="200">
