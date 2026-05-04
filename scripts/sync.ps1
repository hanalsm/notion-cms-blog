# sync.ps1 — 다른 컴퓨터에서 최신 코드 받기 + 이 컴퓨터에서 작업 후 올리기
# 사용법:
#   .\scripts\sync.ps1 pull   → GitHub에서 최신 코드 받기 (다른 컴퓨터에서 시작할 때)
#   .\scripts\sync.ps1 push   → 작업 후 GitHub에 올리기

param([string]$action = "")

if ($action -eq "pull") {
    Write-Host "`n[1/2] 원격 변경사항 가져오기..." -ForegroundColor Cyan
    git fetch origin

    Write-Host "[2/2] main 브랜치 최신화..." -ForegroundColor Cyan
    git pull origin main

    Write-Host "`n완료! 이제 'npm run dev' 로 개발 서버를 실행하세요." -ForegroundColor Green
}
elseif ($action -eq "push") {
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "변경된 파일이 없습니다." -ForegroundColor Yellow
        exit 0
    }

    Write-Host "`n변경된 파일:" -ForegroundColor Cyan
    git status --short

    $msg = Read-Host "`n커밋 메시지를 입력하세요"
    if (-not $msg) { $msg = "작업 내용 업데이트" }

    Write-Host "`n[1/3] 변경사항 스테이징..." -ForegroundColor Cyan
    git add .

    Write-Host "[2/3] 커밋 생성..." -ForegroundColor Cyan
    git commit -m $msg

    Write-Host "[3/3] GitHub에 푸시..." -ForegroundColor Cyan
    git push origin main

    Write-Host "`n완료! GitHub에 업로드됐습니다." -ForegroundColor Green
    Write-Host "Vercel이 자동으로 재배포를 시작합니다. (약 1~2분 소요)" -ForegroundColor Green
}
else {
    Write-Host @"

사용법:
  .\scripts\sync.ps1 pull    다른 컴퓨터에서 최신 코드 받기
  .\scripts\sync.ps1 push    작업 후 GitHub + Vercel에 반영

워크플로우:
  [컴퓨터 A에서 작업]  →  push  →  GitHub  →  Vercel 자동 배포
  [컴퓨터 B에서 시작]  →  pull  →  최신 코드 동기화  →  npm run dev
"@
}
