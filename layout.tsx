import "./index.css";
//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
