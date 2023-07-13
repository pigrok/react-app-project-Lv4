# 📚 Create ALgorithm Trends

<br/>
<br/>

# 🚩 Goal : 나만의 React App 만들기

- 지금까지 배운 내용을 활용하여 나만의 React App 을 만들어봅시다.
  - 주제는 반드시 Todo List가 아니여도 됩니다. 본문과 댓글을 가진 구조의 웹 서비스면 OK!
    <br/>
    <br/>

# ✅ Checklist : 과제 진행 간 고민해야 하는 부분

- 상태관리 ( 유지 / 초기화 ) 가 잘 되어있나요?
- 각 컴포넌트의 재사용성이 높나요?
- 예외처리가 미흡한 부분은 없나요?
  <br/>
  <br/>

# ⚙️ features

- (1) 공통
  - UI 구현하기
  - API 명세서 작성하기
- (2) 본문 (ex: 할일) CRUD 구현
  - 본문 리스트 조회 하기
  - 본문 조회 하기
  - 본문 추가 하기
  - 본문 삭제 하기
  - 본문 수정 하기
- (3) 배포
  - json-server 서버 배포 => 글리치
  - 리액트 프로젝트 배포 (S3, vercel 등 자유)

<br/>
<br/>

# 📌 Requirement : 과제에 요구되는 사항이에요.

- (1) UI/UX
  - 창의적인 UI/UX로 과제를 만드세요. (예시는 예시일뿐 입니다)
  - 예시에 없어도 만들고 싶은 기능이 있다면 OK!
- (2) 필수 요구 사항
  - 동적 라우팅을 사용하세요.
  - 1개 이상의 Custom Hook을 구현하세요.
    - **Form에 유효성 검증 기능을 적용**하세요. _유효성 검증이란, 아래의 예시들을 의미합니다._
    - ex: 제목을 10글자 이상 기입하지 않으면, 글을 추가할 수 없도록 제한 → `Alert` 으로 안내
    - ex: Form에서 모든 input에 값을 입력하지 않으면, 버튼이 비활성화
  - 버튼 컴포넌트 1개로 모든 버튼을 구현하세요. 모든 스타일과 기능을 버튼을 구현할 수 있는 만능 버튼을 만들어보는 것 입니다.
  - development 환경에서만 redux devtool이 활성화 되도록 처리합니다.
  - 배포된 결과물에서는 console.log() 가 보이지 않도록 처리합니다.
  - .env 를 이용해서 API 서버의 URL 코드상에서 숨기도록 처리합니다.
- (3) API 명세서 (프로젝트 완료 후 작성)
  - 프로젝트가 완료되었다면, 간이 API 서버에서 어떤 API를 사용하였는지 명세서를 작성해주세요.

<br/>
<br/>

# 🔖 References: 과제에 참고할 가이드

- 예시 사이트 : https://hh99-react-lv4.vercel.app/
  - 댓글 기능은 없어도 됩니다!
- Material ui 등 필요한 ui 라이브러리 써도 OK!
  - 왜 많고 많은 라이브러리 중에 ‘우리가 쓰기로 한 이 라이브러리’를 써야만 했는지는 고민해보세요!
    <br/>
    <br/>

# 📁./src/api/

- `posts.js` `review.js`
  <br/>

# 📁./src/components/

- button / `Button.jsx`
- common / `Banner.jsx` `Category.jsx` `Footer.jsx` `Header.jsx` `Layout.jsx`
- input / `Input.jsx`
- post / `Post.jsx` `CategoryPost.jsx`
- modalWrite / `ModalWrite.jsx`
- review / `Review.jsx`
  <br/>

# 📁./src/hooks/

- `useInput.js`
  <br/>

# 📁./src/pages/

- `Detail.jsx` `Home.jsx`
  <br/>

# 📁./src/rq/

- `postQuery.js`
  <br/>

# 📁./src/shared/

- `Router.jsx`
  <br/><br/>

🔸 API 명세 🔸
https://jazzy-harmony-6a1.notion.site/30596fba69844cd9ae7d740c1edc27e9?v=ac25d193045a4853b66c96db0355fc82&pvs=4

# 🖥️ Layout

<img src="https://github.com/pigrok/react-app-project-Lv4/assets/129926477/ff89929e-8e53-4ada-b4d2-2200c78e7d16" width="2000"/>
<br/>
<br/>
<br/>

<img src="https://github.com/pigrok/react-app-project-Lv4/assets/129926477/a9620557-4fe6-46ff-969e-1bb9c87a5f2e" width="2000"/>
<br/>
<br/>
<br/>

<img src="https://github.com/pigrok/react-app-project-Lv4/assets/129926477/5824d140-b7ac-4b81-8635-29aeb5b13092" width="2000"/>
