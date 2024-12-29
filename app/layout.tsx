import '../styles/global.css';

import { Metadata } from "next";
import Navigation from "../components/navigation";

// page.tsx에서 metadata title을 추가하면서 메타데이터 동적으로 생성가능함
// %s 자리에 title이 동적으로 merge
// default 설정가능
export const metadata: Metadata = {
  title: {
    template : "%s | Next Movies",
    default : "Next Movies"
  },
  description: "The BEST movie App on the BEST framwork",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
