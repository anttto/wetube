# Youtube Clone - Challenge !!!!!

## 1. Settings

- (1) NodeJs 설치
- (2) GIT 설정 add Repository - git init - remote setting
- (3) NPM 셋팅 - npm init - package.jcon 생성
  > package.json & 실행js 파일만을 관리 : node_modules 폴더의 의존성
- (4) 각종 node package 설치
  > Express 설치
  > Babel (es6 하위호환 문법 자동 수정)
  >
  > > 1. nodeJS babel 설치 @babel/core
  > > 2. 프리셋 설치 @babel/preset-env -> babel.config.json 세팅
  > > 3. Nodemon 세팅 : @babel/node 설치 -> nodemon 설치 (Script 세팅 : "nodemon --exec babel-node -- index.js")
  >
  > morgan 추가 (log정보 미들웨어)
- (5) src 폴더 생성 server.js 기본 세팅

```
import express from "express";
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
```
