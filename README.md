## 📌 프로젝트 소개

이 프로젝트는 사용자가 입력한 이름과 업로드한 서명 이미지의 스타일을 결합해, 나만의 서명을 생성하는 AI 기반 서비스입니다.
기존 서명 생성기는 폰트 기반이라 항상 같은 결과를 출력하고, 연습 환경도 제공하지 않아 실제 사용에 한계가 있었습니다.

이 서비스는 AI로 스타일을 반영해 매번 새로운 서명을 생성하고 저장할 수 있으며, 연습 기능을 통해 따라 쓴 서명의 유사도를 점수로 확인하고 원하는 서명을 .png 파일로 내려받을 수 있습니다.

## 🔗 링크

<p align="center">
  <a href="https://signatelier.com/">웹사이트</a> &nbsp;|&nbsp;
  <a href="https://github.com/SignAtelier/sign-atelier-backend">서버 레포지토리</a>
</p>

## ⚙️ 레포지토리 구성 및 역할

### 클라이언트 레포지토리
- 사용자가 이름을 입력하고 서명 스타일 이미지를 업로드할 수 있는 웹 UI 제공
- 생성된 서명을 확인하고, 연습 기능을 통해 직접 따라 써볼 수 있는 캔버스 제공
- 실시간으로 유사도 점수를 계산하고, 마음에 드는 서명을 저장하거나 `.png`로 다운로드 가능
- 주요 기능
  - 이름 입력 및 스타일 이미지 업로드
  - 서명 생성 요청 및 결과 확인
  - 생성된 서명 목록 확인
  - 따라 쓰기 기능
  - 실시간 유사도 점수 계산
  - 서명 저장 및 다운로드
        
### 서버 레포지토리
- 클라이언트의 요청을 받아 AI 기반으로 서명 생성을 수행하고 각종 클라이언트 요청을  처리하는 FastAPI 서버
- 생성된 서명 이미지를 S3에 저장하고 pre-signed URL 발급 요청
- 사용자가 쉽게 따라 쓰고 연습할 수 있도록 서명 이미지의 윤곽선 추출 기능
- 주요 기능
  - AI 기반 서명 생성
  - 생성된 이미지 윤곽선 추출
  - 조회/저장 등 클라이언트 요청 처리


## 📑 목차

- [🛠 기술 스택](#-기술-스택)
  - [Zustand 도입 배경](#zustand-도입-배경)
- [🚀 핵심 기능](#-핵심-기능)
  - [서명 생성 요청](#서명-생성-요청)
  - [서명 생성 및 저장](#서명-생성-및-저장)
  - [서명 목록 조회 및 이름 수정](#서명-목록-조회-및-이름-수정)
  - [서명 연습 및 연습 기록 조회](#서명-연습-및-연습-기록-조회)
  - [연습 기록 삭제](#연습-기록-삭제)
  - [서명 삭제 및 복구](#서명-삭제-및-복구)
- [🧠 기술적 챌린지](#-기술적-챌린지)
  - [서명 연습 기능과 채점](#서명-연습-기능과-채점)
- [🗓 일정](#-일정)
- [💭 개인 회고](#-개인-회고)


## 🛠 기술 스택

### 클라이언트 기술 스택

<span>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-443D4A?style=for-the-badge&logo=react&logoColor=white">
</span>

#### Zustand 도입 배경
로그인 상태를 전역에서 관리하기 위해 도입함. 가볍고 보일러플레이트 코드가 적어 구현 속도가 빠르며, React와 자연스럽게 결합되어 인증 상태를 여러 컴포넌트에서 손쉽게 공유하고 갱신할 수 있음.

<details> <summary>프로젝트 전체 기술 스택</summary>

#### 클라이언트

<span>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-443D4A?style=for-the-badge&logo=react&logoColor=white">
</span>

#### 서버

<span>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
</span>

#### 저장소

<span>
  <img src="https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white">
</span>

#### 배포

<span>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
</span>

</details>

## 🚀 핵심 기능

### 서명 생성 요청

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/7f159938-dc9d-4f5a-93ea-8bfc3118df86" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/d75412bd-367d-4a88-af8f-a767fdf3efa1" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/e191f92d-4d98-4bbc-a280-e0e88c407cc4" />

</details>

- 사용자가 원하는 스타일의 이미지를 업로드하고 이름을 입력합니다.
- 생성 버튼을 통해 AI 서명 생성 요청을 할 수 있습니다.

### 서명 생성 및 저장

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/1095e02c-9dc9-4b92-9438-640ec0f47e37" />

</details>
    
- 생성된 서명의 결과를 웹을 통해 확인할 수 있습니다.
- 현재 서명이 마음에 들지 않으면 재생성을 할 수 있습니다.
- 마음에 드는 서명이 생성된 경우에는 저장하기를 눌러 서명을 저장할 수 있습니다.

### 서명 목록 조회 및 이름 수정

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/98426224-613c-4aee-b6be-52bbcfb6fcc7" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/add302ce-2d5a-4c0a-a641-89c8c97216f2" />

</details>
    
- 서명 목록을 통해서 이 사용자가 생성한 서명들을 확인할 수 있습니다.
- 목록에서 수정을 원하는 서명 박스에 마우스를 올리면 수정 아이콘이 나타나고, 수정 아이콘을 눌러 서명 이름을 사용자 마음대로 수정할 수 있습니다.
- 서명 목록에서 연습하기를 눌러 해당 서명 연습 화면으로 이동할 수 있습니다.

### 서명 연습 및 연습 기록 조회

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/43f2b9f2-eeab-4609-be47-91ea9727afdf" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/ef19587e-5df0-418c-930a-4467df429708" />

</details>
    
- 연습 화면으로 만들어진 서명과 해당 서명의 윤곽선을 확인할 수 있습니다.
- 캔버스에서 서명 윤곽선을 따라 쓰며 연습할 수 있습니다.
- 사용자가 잘 따라 쓰고 있는지를 캔버스 우측 상단에 점수를 통해 확인할 수 있습니다.
- 윤곽선, 평가 모드는 on/off가 가능하며, 캔버스 크기 또한 수정이 가능합니다.
- 다시 그리기 버튼을 눌러 다시 그리거나 저장하기를 눌러 저장할 수 있습니다.
- 저장한 연습 기록은 우측 하단에서 확인할 수 있습니다.

### 연습 기록 삭제

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/188f8e06-a4da-493c-9436-e957c61f336b" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/e5c9ae2d-d363-44a8-a67d-994f7aee1339" />

</details>
    
- 연습 기록에서 선택 버튼을 눌러 삭제 모드에 들어갈 수 있습니다.
- 개별로 선택이 가능하고 전체 선택 기능도 제공합니다.
- 사용자가 삭제 요청을 하면 즉각적으로 DB와 S3에서 삭제됩니다.

### 서명 삭제 및 복구

<details>
<summary>🖼️ preview</summary>
  
<br>
  
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/1c9cb913-e7df-4949-8fa4-5c27c63cbe68" />
  <img width="1000" alt="Image" src="https://github.com/user-attachments/assets/9e4b0a95-1d52-4ece-ab0a-64f2236b3c7f" />

</details>
    
- 서명 목록에서 x 아이콘을 눌러 서명을 삭제할 수 있습니다.
- 삭제 요청을 하면 30일 간 삭제 목록에서 확인이 가능하고, 30일이 지나거나 사용자가 다시 삭제 요청을 하는 경우, DB와 S3에서 서명과 관련된 연습기록들을 모두 삭제합니다.

## 🧠 기술적 챌린지

### 서명 연습 기능과 채점

#### 문제 정의

서명 연습 기능과 채점 기능을 구현하면서 가장 먼저 고민한 부분은 사용자가 작성한 서명이 정답 이미지와 얼마나 유사한지를 어떤 기준으로 측정할지였습니다. 이를 위해 이미지 유사도 측정 방법을 조사했고 다음과 같은 유사도 평가 지표들이 있었습니다.

- F1 Score: 정답 영역과 겹친 비율의 정밀도 + 재현율을 조합한 지표(잘 그린 영역은 높은 점수, 잘못 그린 부분은 감점)
- IoU: 겹치는 영역 / 전체 합집합 영역으로 계산하지만 픽셀 단위로 평가하여 기준이 까다로움
- Dice Coefficient: F1 score와 유사하고, 겹치는 영역을 두 배하여 계산함. IoU보다 관대한 기준

#### 초기 접근과 한계

여러 평가 지표 중에서 가장 적합하다고 판단한 방식은 F1 Score였으며, 이를 우선적으로 테스트하였습니다.
F1 Score는 정답 영역과 사용자의 입력이 얼마나 정확하게 겹쳤는지를 평가하는 방식으로, 정밀도와 재현율을 동시에 고려할 수 있다는 점이 장점이었습니다. 단순히 많이 그렸는지보다 얼마나 정확하게 따라 그렸는지를 반영할 수 있다는 점에서 적합하다고 판단하였습니다.

하지만 실제로 적용해보니, 정답 윤곽선을 충분히 채우지 않으면 점수가 낮게 나오거나, 반대로 살짝만 닿아도 점수가 비정상적으로 높게 나오는 경우가 발생하였습니다. 평가 기준이 불안정하다고 느껴졌기 때문에 이를 보완하고자 두 번째로 IoU 방식을 테스트해보았습니다.
IoU는 이미지 간의 교집합과 합집합 면적을 비율로 계산하는 방식이지만, 기준이 지나치게 엄격하여 실제로 꽤 잘 따라 그렸음에도 불구하고 점수가 1점 만점에 0.3점 수준으로 낮게 나오는 경우가 많았습니다.

#### 발견한 문제점

이 과정에서 확인된 핵심 원인은 AI가 생성한 서명의 선 두께가 랜덤이라는 점이었습니다. 선이 두껍게 생성된 경우, 사용자가 캔버스에 따라 그린 선은 얇아 선 두께 차이로 인해 면적 기반 지표에서 점수가 낮게 나오는 한계가 있었습니다.

#### 문제 해결을 위해 스켈레톤 도입

이러한 문제를 해결하기 위해, 최종적으로 윤곽선이 아닌 스켈레톤 기반 비교 방식으로 구조를 변경하였습니다. 윤곽선은 스타일이나 두께가 일정하지 않아 비교 기준으로 적절하지 않았고, 정답 이미지를 얇은 선 형태의 스켈레톤으로 변환한 뒤 이를 기준으로 사용자가 연습한 이미지와 비교하는 방식이 더 적합하다고 판단하였습니다.

> 스켈레톤은 윤곽선과는 달리 서명 형태의 뼈대를 구하는 것으로 불필요한 두께나 노이즈를 제거하고 구조만 남기는 전처리 방식입니다.

사용자의 입력은 일반적으로 일정한 펜 두께를 가지고 있기 때문에, 정답 스켈레톤과 비교할 때 두께 차이로 인한 불이익이 발생하지 않도록 스켈레톤 이미지를 적절히 확장하는 후처리를 추가하였습니다. 이후 사용자 입력 이미지와 스켈레톤 이미지를 마스킹하여 겹치는 영역의 면적을 기준으로 점수를 계산하는 방식으로 수정하여 문제를 해결하였습니다.

#### 채점 구조와 장점

채점 로직은 클라이언트에서 동작하며, 사용자의 마우스 입력이 끝나는 시점(mouseup 또는 mouseleave 이벤트)에 평가가 수행됩니다. 이러한 구조는 실시간 피드백이 가능하다는 장점이 있으며, 별도의 서버 통신 없이 점수를 계산할 수 있어 통신 비용이 발생하지 않습니다. 또한 특정 이벤트 시점에만 채점이 동작하므로 과도한 계산으로 인한 자원 낭비를 방지할 수 있다는 점에서도 효과적입니다.

#### 추가로 발견된 버그

기능이 완성되었다고 판단하였지만, 이후 캔버스 크기를 변경했을 때 채점이 제대로 동작하지 않는 문제가 발생하였습니다. 웹 어셈블리 기반 openCV.js의 처리 구조에서는 오류 메시지가 명확하지 않았고, 관련 정보를 검색해도 찾기 어려웠습니다.
디버깅을 통해 확인해보니, 사용자가 입력하는 캔버스의 크기와 서버에서 받은 스켈레톤 이미지의 크기가 일치하지 않아 마스킹 이미지 간의 교집합 계산에서 문제가 생기고 있었습니다. 이를 해결하기 위해, 캔버스 크기 변경이 발생하면 스켈레톤 이미지도 해당 크기에 맞춰 변경되도록 수정하였습니다.

#### 개선

현재 채점 점수가 약 50점에서 시작되며, 아무리 정확하게 따라 그려도 최고 점수가 약 85점 수준으로 나오고 있습니다. 이를 보완하여, 계산된 점수를 0점부터 100점 사이로 보다 자연스럽게 분포시키는 정규화 과정을 적용할 예정입니다. 이로써 사용자에게 보다 직관적이고 납득할 수 있는 점수 피드백을 제공하고자 합니다.

## 🗓 일정

진행 기간 : 4주
작업자 : 개인

- 1주차
    - 아이디어 선정
    - 기술 스택 조사
    - 칸반 작성
- 2주차
    - 프로젝트 환경 세팅
    - 공통 컴포넌트 구현
    - 로그인 구현
    - AI 모델 테스트
- 3주차
    - 서명 저장/조회/삭제 구현
    - 연습 기능 구현
    - 연습 기록 저장/조회/삭제 구현
    - 서명 이름 수정 기능 구현
- 4주차
    - 토글 컴포넌트 구현
    - 캔버스 크기 변경 구현
    - 채점 기능 구현
    - 배포

## 💭 개인 회고

### 잘한 점

- 클라이언트 기반 채점 구조

서명 채점을 클라이언트에서 실시간으로 수행해 서버 요청 없이 빠른 피드백이 가능했고, 통신 비용과 서버 자원 소모를 줄일 수 있었습니다.

- 스켈레톤 기반 비교로 구조 전환

윤곽선 두께 차이로 인한 점수 편차 문제를 해결하기 위해, 정답 이미지를 스켈레톤 형태로 변환해 두께·스타일에 영향받지 않는 일관된 평가가 가능해졌습니다.

### 아쉬웠던 점

서명 생성 기능에 예상보다 많은 시간이 소요되었고, 스타일 적용을 포함한 AI 생성 구조에 한계가 있다는 판단에 따라 데일리 스크럼에서 이를 보고했습니다. 피드백으로는 AI 생성은 추후 학습 데이터 보완 후 개선하고, 우선 웹 구현을 먼저 진행하라는 제안을 받았으며, 이를 수용해 방향을 전환했습니다. 
지금 돌아보면 이 결정을 2~3일만 더 일찍 내렸다면 다른 작업에 더 많은 시간을 확보해 전체 일정을 효율적으로 운영할 수 있었을 것입니다.

### 개선점

- AI 생성 기능 개선 또는 대체 : 학습 데이터를 확보하여 하나의 서명이라도 품질을 향상시키거나, ChatGPT같은 API 를 활용
- 채점 로직 개선: 최대 점수가 85점 근처에서 제한되는 문제를 해결하고, 0~100점 사이로 자연스럽게 분포시키는 정규화 로직 추가
