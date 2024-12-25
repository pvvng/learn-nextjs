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