# mymemory

자신의 영화 리뷰를 남기고 공유하는 앱입니다. 


## 개요
* 영화를 본 후 그당시의 느낌과 기분을 글로 남길 수 있는 앱입니다. 
또한 여러사람들과 영화 리뷰 정보를 공유 할 수 있습니다.

## 개발 환경
* 언어 : javascript(node.js)
* framework: IONIC framework
## 데이터 베이스 설계
* mongoDB

## 주요 기능
### 1. 영화 리뷰 등록
* 영화정보, 감상평, 명대사 등을 등록할 수 있습니다.
### 2.영화API  검색 기능
* themoviedb api를 이용하여 영화 정보 검색이 가능합니다.
### 3. 마이페이지 관리
* multer module 을 활용하여 프로필 사진을 업로드 할 수 있습니다.
### 4. CGV 페이지 크롤링
* cgv 페이지 크롤링을 통해 최신 인기 영화에 대한 정보를 받아옵니다.
### 5. 영화 리뷰 검색 기능
* 최신순/추천순/조회순 으로 나누어 다른 사람들과 영화를 공유할수 있습니다.
### 6. 실시간 채팅 기능
* Soket.IO 를 이용하여 실시간 채팅 기능을 구현하였습니다.(오픈채팅)