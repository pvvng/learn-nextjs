// client 가 붙었다고 react 마냥 클라이언트 사이드(브라우저)에서 render하는건 아님
// 기본적으로 서버에서 render하고 쏴주는거라 브라우저에서 자바스크립트 비활성화해도 ui 확인 가능함
// render는 js function (ex. react) 를 브라우저가 이해할 수 있는 형식으로 변경하는걸 의미함

// * hydration process (단순 html을 react application으로 초기화하는 작업)
// boring html load (기본값) -> javascript load (initializing) -> react component (interactive)
// hydrate -> 수분을 유지시키다. 생기있게 하는 느낌?

// 앞서 설명했듯 모든 컴포넌트는 SSR을 함. 다만 hydration은 모든 컴포넌트에서 발생하지 않음. 
// use client 키워드가 붙은 컴포넌트만 hydrate. client에서 interative 해야하는 필요를 명시하는 느낌

// next js의 렌더링 순서
// 1. backend(server)에서 non-interactive boring HTML render (pre-render)
// 2. give it user
// 3. initialize React, Framework(Next) / load javascript
// 4. hydrate "use client" componet to React Component in frontend(client) 
//    4-1. hydrate는 boring HTML을 "interactive component"로 만드는것을 의미

/** 결론
 * 
 * use client는 단순히 CSR만을 하는게 아님
 * backend에서 렌더링 된 후 frontend에서 hydrate 해야하는 컴포넌트임을 보여줌
 * 
 * 서버 컴포넌트가 로딩 속도가 빠른 이유는 다운 받을 js의 양이 적기 때문임
 * 또한, 서버 컴포넌트는 interaction이 없기 때문에 fetch 작업에서도 보안을 신경 쓸 필요가 없음. 어짜피 client로 안가니까
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === "/" ? "🔥" : ""}
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
          {path === "/about-us" ? "🔥" : ""}
        </li>
      </ul>
    </nav>
  );
}
