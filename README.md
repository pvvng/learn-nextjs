# Next.js Rendering Process and `use client`

## 기본 개념

- **Client-side Render**: `use client`가 붙었다고 React처럼 클라이언트 사이드(브라우저)에서만 렌더링하는 것은 아님.
- **기본 동작**: 
  - Next.js는 기본적으로 서버에서 렌더링하여 HTML을 브라우저에 전달.  
  - 브라우저에서 자바스크립트가 비활성화되어 있어도 UI를 확인할 수 있음.
- **Render의 의미**: 
  - 자바스크립트 함수(e.g., React)를 브라우저가 이해할 수 있는 형식으로 변환하는 작업.

## Hydration Process

- **Hydration**: 단순 HTML을 React 애플리케이션으로 초기화하는 작업.
  1. **Boring HTML Load** (기본 HTML 로드)
  2. **JavaScript Load** (초기화 작업)
  3. **React Component** (인터랙티브하게 전환)
- **Hydration 의미**: 단어 그대로 '수분을 유지시키다', 즉 생기를 불어넣는 느낌.
- **특징**: 모든 컴포넌트가 SSR(Server-side Rendering)을 수행하지만, **hydration은 모든 컴포넌트에서 발생하지 않음**.
  - `use client` 키워드가 붙은 컴포넌트만 hydrate.
  - 클라이언트에서 상호작용(interactive)이 필요함을 명시.

## Next.js 렌더링 순서

1. **Backend (Server)**:
   - Non-interactive boring HTML render (pre-rendering).
2. **HTML 전달**:
   - 클라이언트에 HTML 전달.
3. **React 초기화**:
   - JavaScript를 로드하여 React 및 Next.js 프레임워크 초기화.
4. **Hydration**:
   - `use client`가 명시된 컴포넌트만 **HTML을 React Component로 전환**.
   - **Hydration 정의**:
     - 단순 HTML을 "Interactive Component"로 만드는 과정.

## 결론

1. `use client`는 단순히 CSR(Client-side Rendering)만을 의미하지 않음.
2. **서버에서 렌더링된 후**, 프론트엔드에서 hydrate해야 하는 컴포넌트를 명시.
3. **서버 컴포넌트의 속도 이점**:
   - 다운받는 JavaScript의 양이 적음 → 로딩 속도 향상.
   - 서버 컴포넌트는 상호작용이 없으므로 fetch 작업에서도 보안 우려가 적음 (클라이언트로 데이터가 전송되지 않기 때문).


# Fetch 최적화 방법

## 방법 1: `Promise.all`로 병렬 통신
- **문제점**: `await`를 연달아 사용하면(직렬 fetch) 시간이 너무 오래 걸림.
- **해결**: `Promise.all`을 활용하여 병렬로 `fetch`를 처리하여 시간을 단축시킴.
- **주의사항**: 두 통신이 모두 완료될 때까지 UI가 보이지 않는다는 문제가 있음.

```javascript
const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
```

## 방법 2: `Suspense`를 활용하여 컴포넌트를 나눠서 대기하기
- **원리**: 컴포넌트를 나누어 각각 필요한 데이터를 fetch하도록 쪼갬.
- **장점**: 
  - `Suspense`로 로딩 상태일 때 `fallback`을 보여줌.
  - 둘 중 하나가 통신 시간이 오래 걸려도 먼저 완료된 데이터만 렌더링 가능.
  - 병렬적으로 데이터를 처리하면서도, 먼저 로딩된 부분부터 사용자에게 보여줄 수 있음.

### 코드 예시:
```tsx
import { Suspense } from "react";

function App({ id }) {
  // Loading 컴포넌트는 오직 client만 가능함.
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MovieComponent id={id} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <VideosComponent id={id} />
      </Suspense>
    </>
  );
}
```

# `generateMetadata`로 동적 Metadata 처리하기

## 요약
- `fetch`를 써서 `metadata`를 반환하고 활용 가능.
- `metadata title`을 동적으로 설정할 수 있음.

---

## 주요 포인트

- `server component`의 dynamic route parameter처럼 `generateMetadata`도 `params`를 받을 수 있음.

---

## 코드 설명

```typescript
export async function generateMetadata({ params }: IParams) {
  // dynamic route parameter 꺼내기
  const { id } = await params; 
  // `id`로 영화 데이터 가져오기
  // 이후 getMovie가 사용되어도 어짜피 캐싱되니까 부담 없음
  const movie = await getMovie(id); 

  return {
    title: movie.title, // 동적 title 설정
  };
}
```