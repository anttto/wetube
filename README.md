# Youtube Clone - Challenge !!!!!

## 1. Settings

### (1) NodeJs 설치
### (2) GIT 설정 add Repository - git init - remote setting
### (3) NPM 셋팅 - npm init - package.jcon 생성
  > package.json & 실행js 파일만을 관리 : node_modules 폴더의 의존성
### (4) 각종 node package 설치
  > Express 설치
  > Babel (es6 하위호환 문법 자동 수정)
  >
  > > 1. nodeJS babel 설치 @babel/core
  > > 2. 프리셋 설치 @babel/preset-env -> babel.config.json 세팅
  > > 3. Nodemon 세팅 : @babel/node 설치 -> nodemon 설치 (Script 세팅 : "nodemon --exec babel-node -- index.js")
  >
  > morgan 추가 (log정보 미들웨어)
### (5) src 폴더 생성 server.js 기본 세팅

```
import express from "express";
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
```

### (6) Router 설정
  > Router 영역과 Controller 영역을 나눠서 관리

```
-기본 구조 예시-
[server.js]
import videoRouter from "./routers/videoRouter"
app.use('/videos', videoRouter);
---------------------
[routers/videoRouter.js]
import express from "express";
import { watch } from "../controllers/videoController";
const videoRouter = express.Router();
videoRouter.get('/:id(\\d+)', watch);
export default videoRouter;
---------------------
[controllers/videoController.js]
export const watch = (req, res) => res.render("watch");

URL - http://localhost/videos/1234
```

### (7)View엔진 : PUG (Jade) 적용

> 뷰 앤진 선언 app.set('view engine', 'pug');
> 뷰 폴더 연결 app.set('views', process.cwd() + '/src/views');

```
npm i pug
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
```

> javascript 사용 -> #{}

```
footer &copy; #{new Date().getFullYear()} Wetube
```

> extends - block 상속의 개념

```
[Base] (base.pug)
block content
---------------------
[extend]
extends base.pug
block content
    h1 Home!!
```

> partial (include개념)

```
include partials/footer.pug
```

> 변수처리 가능 -> #{variable}

```
해당 변수는 render함수의 agument 를 이용함
ex) res.render("pagename", {pageTitle:"Home"})
pageTitle 변수값 선언 : {pageTitle:"Home"}
```

> Conditionals -> if, elfe if

```
ul
  if fakeUser.loggedIn
      li
          a(href="/logout") Log out
  else
      li
          a(href="/login") Login
```

> Iteration -> each

```
ul
  each val in [1,2,3,4,5]
  li=val
```

> Mixin -> 똑똑한 patial 개념으로 이해 (데이터를 받기 때문 )

```
ul
  each val in [1,2,3,4,5]
  li=val
```
