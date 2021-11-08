# 환경변수

- **Achivement Goals**
    - [ ]  파일의 소유자와 파일에 적용된 사용 권한을 확인하고 이해할 수 있다. `ls -l`
    - [ ]  파일에 적용된 사용 권한을 변경할 수 있다. `chmod`

---

# Read, Write, Execute 권한

## 1. d,- / rwf / user, group, other

터미널 상에 다음과 같이 파일과 폴더를 만들어 보자
```bash
mkdir linux
nano helloworld.js
```

이후 터미널에 `ls -l` 명령어를 입력하면 다음과 같은 화면이 나온다

```bash
-rw-r--r-- 1 [username] staff 28 11 8 10:10 helloworld.js
drwxr-xr-x 2 [username] staff 64 11 8 10:09 linux
```

여기서 사용자명 앞의 문자열을 주목하면, 각 문자열은 다음과 같은 의미를 가지고 있다.

![[그림] 폴더나 파일의 권한 정보](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bf158532-b16c-44ce-9c5b-0b9250f2d57b/Untitled.png)

[그림] 폴더나 파일의 권한 정보

- 맨 앞의 `d`는 directory와 non-directory를 구분한다. 폴더의 경우 `d`, 파일의 경우 `-`로 표기된다
- 각 그룹의 `rwx`는 각각 Read, Write, Execute permission을 의미한다. 예로  helloworld.js의 경우  소유자(owner)는 읽기와 쓰기가 가능하고(`rw-`) 다른 그룹(group)과 나머지(other)는 읽기만 가능하다(`r-—`).
- user
    
    파일의 소유자, 기본적으로는 파일을 만든사람이 해당된다.
    
- group
    
    여러 user가 포함된다. 그룹에 해당되면 파일에 대해서 동일한 엑세스 권한을 부여받는다. 이를 통해서 많은 사람과 프로젝트를 공유하는 경우 각 user에게 일일히 권한을 할당하지 않고도 권한을 부여할 수 있다.
    
- other
    
    파일을 만들지 않은(소유자가 아닌) 다른 모든 user를 말한다. 따라서 other를 설정한다면 전역(global)권한 설정이 된다.
    

## 2. `chmod` : 권한을 변경하는 명령어

만약 OS에 로그인한 사용자와 폴더와 파일의 소유자가 동일한 경우엔 chmod를 이용해서 권한을 변경할 수 있다.

그때는 `chmod` 를 사용하면 된다. 또한 만일 로그인한 사용자가 소유자와 다른 경우엔 `sudo`로 관리자 권한을 획득한 후에 권한 변경이 가능하다

### `chmod`를 이용하는 두 가지 방법

- **Symbolic method**
    
    Symbolic method는 `+, -, =` 와 엑세서 유형을 표기해서 변경하는 방법을 말한다.
    
    디테일하게는 엑세스 클래스, 연산자, 액세스 타입으로 구분된다.
    
    ![스크린샷 2021-11-08 오전 10.29.04.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b899d02c-0caa-44b6-b83c-903eab4e96d7/스크린샷_2021-11-08_오전_10.29.04.png)
    
    위의 helloworld.js의 권한을 symbolic method로 변경한다면 다음과 같다
    
    ```bash
    # 현재 helloworld권한은 -rw-r--r--
    chmod a=rw helloworld.js # a(모든 유저의권한을) rw로 할당, -rw-rw-rw-
    chmod u= helloworld.js # u(사용자의 권한을) 어떤것도 할당하지 않음, ----rw-rw-
    chmod a+rx helloworld.js # a(모든 유저의 권한에) rx권한을 추가함, -r-xrwxrwx
    chmod go-wx helloworld.js # go(group과 other권한의) wx권한을 삭제함, -r-xr--r--
    chmod a= helloworld.js # a(모든 유저의 권한을) 어떤것도 할당하지 않음, ----------
    chmod u+rwx helloworld.js # u(사용자의 권한에) rwx를 추가함, -rwx------
    ```
    
    ![chmod 명령어를 사용해 권한을 바꾼 파일](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/590339a4-45a5-4cad-8964-f968cb0c2ae9/스크린샷_2021-11-08_오전_10.48.35.png)
    
    chmod 명령어를 사용해 권한을 바꾼 파일
    
    symbolic method를 사용하기 위해선 액세스 클래스 연산자와 엑세스 타입을 모두 기억해야 한다
    
- **Absolute form**
    
    Absolute form은 숫자 7까지 나타내는 3bits의 합으로 표기한다
    
    사용자, 그룹 또는 다른 사용자나 그룹마다 `rwx`가 나타나고 각 영역의 boolean 값으로 표기한다.
    
    ![스크린샷 2021-11-08 오전 10.51.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/145dbb08-e7ae-477c-bdb9-a3f2483af147/스크린샷_2021-11-08_오전_10.51.50.png)
    
    ```bash
    #user를 rwx, group과 other를 r--로 변경하고자 한다면, 위 표의 숫자의 합을 user, group, other 순으로 입력하여 사용한다
    # u=rwx(4+2+1=7), go=r(4+0+0=4)
    chmod 744 helloworld.js # -rwxr--r--
    ```
    
    ![스크린샷 2021-11-08 오전 10.55.01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b059d18a-9a70-4b1c-bdc3-e5c7654b9c11/스크린샷_2021-11-08_오전_10.55.01.png)
    
    - Absolute form에서 사용되는 각 숫자
        
        ![스크린샷 2021-11-08 오전 10.55.31.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d2dad62d-0d36-47dc-ac4a-654860e36b97/스크린샷_2021-11-08_오전_10.55.31.png)
