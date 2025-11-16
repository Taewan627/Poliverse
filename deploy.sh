#!/bin/bash

echo "🚀 PoliVerse Korean v3 MVP 배포 시작..."

# 빌드 실패 시 에러 핸들링
if ! npm run build; then
    echo "❌ 빌드 실패! 'npm install'를 먼저 실행하세요."
    exit 1
fi

echo "✅ 빌드 성공!"

# dist 디렉토리로 이동
cd dist

# README.md 파일 생성 (HF Spaces용)
cat > README.md << 'EOF'
---
title: PoliVerse
emoji: 🚀
colorFrom: blue
colorTo: purple
sdk: static
app_file: index.html
---

# PoliVerse Korean v3

AI 기반 정책 시뮬레이션 플랫폼

## 기능

- 대시보드: 실시간 정책 파라미터 조절
- 예측 분석: 경제 영향 시각화
- 여론 분석: 사회적 반응 예측
- 시나리오: 사전 구성된 정책 시나리오

## 사용 방법

1. 슬라이더로 정책 파라미터 조절
2. 시뮬레이션 실행 버튼 클릭
3. 결과를 차트와 그래프로 확인

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
EOF

# Git 초기화 및 커밋
git init
git add .
git commit -m "Deploy v3"

# 기존 원격 저장소가 있다면 제거
if git remote get-url origin > /dev/null 2>&1; then
    git remote remove origin
fi

# HuggingFace Spaces 원격 저장소 추가
git remote add origin https://huggingface.co/spaces/devmeta/poliverse

# 강제 푸시
git push -f origin main

# 루트 디렉토리로 복귀
cd ..

echo "🎉 배포 완료! https://huggingface.co/spaces/devmeta/poliverse 에서 확인하세요."