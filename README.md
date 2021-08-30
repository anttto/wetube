# Youtube 대략적 기능.. Clone - 도저언!
> Front-end : Pug / Scss / Vanilla-js   
> Back-end : Node.js(Express) / MongoDB(mongoose)   
> all : Babel / Webpack   
   
배포 관련 : Heroku / aws-s3 / mongodb atlas
   
========================================================= 
# [Go to My Web](https://antovero-tube.herokuapp.com/)
=========================================================

## 1. Settings

#### (1) NodeJs 설치
#### (2) GIT 설정 add Repository - git init - remote setting
#### (3) NPM 셋팅 - npm init - package.jcon 생성
  > package.json & 실행js 파일만을 관리 : node_modules 폴더의 의존성
#### (4) 각종 node package 설치
  > Express 설치
  > Babel (es6 하위호환 문법 자동 수정)
  >
  > > 1. nodeJS babel 설치 @babel/core
  > > 2. 프리셋 설치 @babel/preset-env -> babel.config.json 세팅
  > > 3. Nodemon 세팅 : @babel/node 설치 -> nodemon 설치 (Script 세팅 : "nodemon --exec babel-node -- index.js")
  >
  > morgan 추가 (log정보 미들웨어)
#### (5) src 폴더(작업폴더) 생성 server.js 기본 세팅

```
import express from "express";
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
```

#### (6) Router 설정
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

#### (7)View엔진 : PUG (Jade) 적용

> 쉽게 말해 HTML 템플릿 언어 - 후에는 리액트, 뷰 교체 후 재작업 계획중..

- 기본 세팅
> 뷰 엔진 선언 app.set('view engine', 'pug');
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


#### (8)DataBase : MONGODB (feat.MONGOOSE)

> [MONGODB](https://www.mongodb.com/) 
- 문서지향적 데이터베이스. 대표 NoSQL 중 한개. 유동적인 스키마를 가질수 있음.

> [MONGOOSE](https://www.npmjs.com/package/mongoose) 
- Node.Js 환경에서 Mongdb 를 이용하기 수월하게 도와주는 모델링 도구
- 강력한 밸리데이션을 기본적으로 제공해줌 (꿀)


##### 1) db.js Settings
```
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 });

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
db.on("error", (error) => console.log("DB Error", error));
db.once("open", handleOpen);
```

##### 2) Mongoose를 이용한 Schema 예시
```
import bcrypt from "bcrypt";   //password 암호화(해싱)
import mongoose from "mongoose";    //import 몽구스

//유저 스키마
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },  // 타입을 지정
    avatarUrl: { type: String, default: "" },
    socialOnly: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },  //댓글의 경우에는 복수가 생성될 수 있기에 배열로 처리 
    ],
    videos: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Video" },   //업로드 비디오도 당연히 복수 가능성
    ]
})

// 패스워드의 경우에는 데이터를 저장하기 전에 Middleware의 개념으로 해싱처리를 진행함. (bcrypt)
userSchema.pre('save', async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})

//User Model로 지정 & export
const User = mongoose.model("User", userSchema);
export default User;
```
