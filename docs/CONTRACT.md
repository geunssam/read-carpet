# Read Carpet 개발 약속 문서 (모든 작업자는 이 파일을 가장 먼저 읽을 것)

앱: Vite + React + Tailwind v4. 서버 없음, 브라우저 저장소만 사용. 화면 글은 전부 한국어.
색 토큰 v2 (근쌤 확정 2026-11-07, 로고에서 측정). 블랙 7 : 버건디 2 : 실버 1, 바탕은 크림.
| 이름 | 라이트 | 다크 | 쓰임 |
|---|---|---|---|
| cream | #F4EEE4 | #141012 | 앱 바탕 |
| ivory | #EBE1CF | #221B1D | 카드, 입력칸, 아이보리 책 |
| ink(블랙) | #141012 | #F4EEE4 | 글자, 굵은 선, 책 |
| ink-muted | #6B5F62 | #B5ABAD | 보조 글자 |
| burgundy | #6E1A2C | #B23A52 | 주요 단추, 강조, 카펫 |
| burgundy-deep | #4E1220 | #6E1A2C | 머리줄, 시상식 바탕 |
| silver | #A9ADB3 | #C9CCD3 | 반짝이, 뱃지, 별 (채움 전용, 글자 금지) |
| line | #E2D8CA | #3A3033 | 구분선 |

- 화면 코드의 Tailwind 클래스 이름은 예전 그대로 쓴다(값만 바뀜): `bg-surface-100`(cream) `bg-surface-200`(ivory) `text-ink` `text-ink-muted` `border-line` `bg-carpet-red`(burgundy) `bg-velvet`(burgundy-deep) `bg-trophy-gold`(silver) `text-gold-ink`(burgundy 글자) `bg-spotlight`(옅은 버건디).
- 그림(SVG)은 라이트 값으로 칠하고 윤곽선은 `#141012`. 금색·밝은 빨강(#C8102E, #D4A72C 등) 사용 금지.
- 글꼴: 화면 글자는 전부 프리텐다드. 로고는 `public/assets/brand/`의 그림 파일만 쓴다.
- 그림 방향: 미니홈피 방(미니룸)과 캐릭터는 위에서 내려다본 픽셀, 싸이월드 느낌, 캐주얼하고 귀엽게. 단추·카드는 단정하게.

## 1. 폴더 소유권 (겹치면 안 됨)
| 작업자 | 소유 폴더/파일 | 건드리면 안 되는 곳 |
|---|---|---|
| 코덱스 A (그림) | `public/assets/**`, `src/data/shopItems.json` | 나머지 전부 |
| 코덱스 B (데이터) | `src/data/books.json`, `sentences.json`, `users.json`, `forum.json` | 나머지 전부 |
| 코덱스 C (광장) | `src/features/plaza/**` | 나머지 전부 |
| 코덱스 D (픽셀 미니룸, 2차) | `public/assets/miniroom/**` | 나머지 전부 |
| 코덱스 E (픽셀 캐릭터, 2차) | `public/assets/character-pixel/**` | 나머지 전부 |
| 코덱스 F (로비 지도, 3차) | `public/assets/lobby/**` | 나머지 전부 |
| 클로드 | 위에 없는 `src/**`, 설정 파일 (2차부터 `src/features/plaza/**`도 클로드가 고침) | — |

## 2. 데이터 모양 (파일 이름·키 이름 정확히)

### src/data/books.json — 책 20권 (B)
```json
[{ "id": "b01", "title": "데미안", "author": "헤르만 헤세", "year": 1919,
   "taste": "classic", "blurb": "한 줄 소개(40자 이내)", "coverColor": "#7A1022" }]
```
- id는 b01~b20. taste는 `classic`(고전 문학) / `humanities`(과학·인문·철학) / `essay`(에세이·시) 중 하나. 세 가지가 최소 6권씩.
- coverColor는 위 색 토큰 라이트 값 중에서만(carpet-red, velvet, trophy-gold, ink 등).
- 표지 그림은 없음. 앱이 제목 글자로 표지를 만든다.

### src/data/sentences.json — 문장 60개 (B)
```json
[{ "id": "s001", "bookId": "b01", "text": "문장(15~120자)" }]
```
- 책 한 권당 정확히 3개. id는 s001~s060. 점수 필드는 여기에 없다(점수는 앱이 계산).

### src/data/users.json — 가짜 사용자 4명 (B)
```json
[{ "id": "u1", "nickname": "새벽서재", "title": "밤의 낭독가", "tier": "beginner",
   "taste": "essay", "bodyColor": "ink",
   "equipped": { "hat": "hat-beret", "glasses": null, "effect": null, "bg": "bg-night" },
   "intro": "한 줄 소개", "favoriteBookIds": ["b03","b09"],
   "shelf": [{ "sentenceId": "s007", "power": 8 }] }]
```
- tier: u1 `beginner`(power 6~10, 카드 6장), u2 `intermediate`(power 10~25, 카드 6장), u3 `advanced`(power 25~45, 6장), u4 `master`(power 45~70, 6장).
- taste 세 가지가 골고루(최소 각 1명). bodyColor는 `red` / `gold` / `ink` 중 하나.
- equipped 값은 아래 자산 파일 이름(확장자 제외)이거나 null. shelf의 sentenceId는 sentences.json에 실제 있는 id.
- 한 사용자의 shelf 문장은 서로 달라야 한다.

### src/data/forum.json — 책 포럼 글 5개 (B)
```json
[{ "id": "p1", "bookId": "b01", "userId": "u1", "title": "제목(30자 이내)",
   "body": "평론 본문(80~200자)", "createdAt": "2026-11-01",
   "comments": [{ "userId": "u2", "text": "댓글(10~60자)" }] }]
```
- 서로 다른 책 5권, 글마다 댓글 2~3개. userId는 u1~u4.

### src/data/shopItems.json — 상점 물건 (A)
```json
[{ "id": "hat-beret", "category": "hat", "name": "베레모", "price": 40,
   "desc": "한 줄 설명", "file": "/assets/character/hat-beret.svg" }]
```
- category: `hat` / `glasses` / `effect` / `bg` / `frame` / `wallpaper` / `title`
- id는 파일 이름(확장자 제외)과 같다. title 종류는 file 없이 `"file": null`.

## 3. 그림 자산 목록 (A) — 전부 SVG, 글자 없음
캐릭터 조각은 **모두 같은 `viewBox="0 0 200 200"`**, 배경만 채우고 나머지는 투명. 쌓는 순서(아래→위): bg → effect → body → glasses → hat.

앵커(모든 조각이 지킬 기준): 머리 원 중심 (100,100) 반지름 45. 눈 (85,100)과 (115,100). 모자는 머리 윗부분 y 40~70에 얹힘. 안경은 y 90~110. 몸통은 머리 아래 y 140~190에 어깨선. 캐릭터는 책을 좋아하는 둥근 얼굴의 귀여운 읽는 사람(책 한 권을 가슴에 안고 있음).

`public/assets/character/`
- body: `body-red.svg`(carpet-red 계열) `body-gold.svg`(trophy-gold 계열) `body-ink.svg`(ink·velvet 계열) (기본 3종, 무료)
- hat: `hat-beret.svg` `hat-crown.svg` `hat-scholar.svg` `hat-tophat.svg`
- glasses: `glasses-round.svg` `glasses-shades.svg` `glasses-monocle.svg`
- effect(캐릭터 뒤): `effect-aura.svg` `effect-sparkle.svg` `effect-flame.svg`
- bg(200x200 꽉 채움): `bg-library.svg` `bg-neon.svg` `bg-carpet.svg`(붉은 카펫, carpet-red와 velvet) `bg-night.svg`

`public/assets/minihome/`
- frame(테두리 겹침 덮개, 가운데 투명): `frame-01.svg` `frame-02.svg` `frame-03.svg` — `viewBox="0 0 400 300"`
- wallpaper(꽉 채움): `wallpaper-01.svg` `wallpaper-02.svg` `wallpaper-03.svg` — `viewBox="0 0 400 300"`

`public/assets/ui/`
- `card-back.svg`(`viewBox="0 0 120 168"`, 문장 카드 뒷면, velvet 바탕에 trophy-gold 문양)
- `logo.svg`(`viewBox="0 0 240 60"`, 글자 대신 도형 로고 마크만)

shopItems.json 가격: hat/glasses 40~80, effect 100~150, bg 60~120, frame/wallpaper 80~150, title 5개(100~500).
title 5개 id: `title-guest` `title-collector` `title-nightreader` `title-noble` `title-observer`.

## 4. 저장 키 (localStorage)
| 키 | 내용 |
|---|---|
| `rc_user` | `{ nickname, taste, bodyColor, equipped:{hat,glasses,effect,bg,frame,wallpaper}, title, mastery, hideScore, onboardingStep, picks:{bookIds,sentenceIds} }` — onboardingStep은 0,1,2,3 또는 `"done"` |
| `rc_shelf` | 문장 카드 배열 `{ id, bookId, sentenceId, text, title, author, score, collectedAt, source }` — source는 `onboarding`/`own`/`copied` |
| `rc_items` | 가진 물건 id 배열 |
| `rc_battles` | `{ id, opponentId, won, rounds, gainedCardId, at }` 배열 |
| `rc_daily` | `{ date:"YYYY-MM-DD", counts:{ 행동키: 횟수 } }` — 날짜가 바뀌면 초기화 |
| `rc_forum` | `{ posts:[내가 쓴 글], comments:{ 글id:[내가 쓴 댓글] } }` (PRD 5개 키에 이 1개를 더함) |

## 5. 숙련도 표 (src/lib/masteryTable.js — 클로드가 작성)
`attendance` 5/1회, `todayBook` 5/1회, `collect` 10/10회, `quiz` 10/3회, `comment` 10/5회, `photo` 20/3회, `review` 50/2회, `event` 50/무제한, `arenaWin` 30/5회, `arenaLose` 5/무제한 (점수 / 하루 상한)

## 6. 클로드가 만드는 공용 부품과 저장소 사용법 (C가 가져다 씀)
```js
import { useStore } from '../../storage/StoreContext'
const { state, actions } = useStore()
// state.user, state.shelf, state.items, state.forum, state.daily
// actions.earn('quiz')            -> { ok: boolean, gained: number, message: string }  // 하루 상한 넘으면 ok:false
// actions.addForumPost({ bookId, title, body })   // 내 글 저장 (review 점수는 호출한 쪽이 actions.earn('review')로)
// actions.addForumComment(postId, text, bookId)   // bookId를 주면 같은 책 문장 카드 점수가 +1
// actions.addForumPost는 같은 책 카드 점수를 +5 올려 줌. 반환값은 저장된 글 객체. 글 id가 "me"로 시작하는 건 내 글, userId가 "me"면 닉네임은 state.user.nickname
import Character from '../../components/Character'   // <Character bodyColor="red" equipped={{hat,glasses,effect,bg}} size={160} />
import BookCover from '../../components/BookCover'   // <BookCover book={book} size="sm|md|lg" />  제목 글자로 만든 표지
import SentenceCard from '../../components/SentenceCard' // <SentenceCard card={{text,title,author}} />
import books from '../../data/books.json'   // 그 외 데이터도 같은 방식
```
- 새 의존 패키지 설치 금지. React + Tailwind 클래스만 사용. 라우터 없음(화면 안 전환은 자기 state로).
- 터치 대상 44px 이상, 320px 폭에서 가로 넘침 없음. 한 파일 200줄 이내로 쪼갤 것.
- 색은 위 토큰 클래스만 쓸 것.
