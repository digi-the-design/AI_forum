import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

//RootLayoutはNext.jsによってchildrenを自動的にpropsとして受け取る。
//React.ReactNodeとはどのような型でも受け取れる特殊な型でReactのデフォルト型定義に含まれている

//型別の書き方で説明：type Props = { children: React.ReactNode; }; export default function RootLayout({ children }: Props) {〜}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
