import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import ContactFormBtn from "@/app/_components/ContactFormBtn";
import SnsIcon from "@/app/_components/SNSIcon";

export default function Footer() {
  return (
    <>
      <ContactFormBtn />
      <footer className={styles.footer}>
        <div className={styles.footer_container}>
          <div className={styles.footer_logo}>
            <Image
              src="/img/logo_footer.png"
              width={240}
              height={120}
              alt="ロゴ画像"
            />
            <div className={styles.contact_info}>
              <h4>東京オフィス</h4>
              <p>〒123-4567 東京都渋谷区</p>
              <p>info@example.com</p>
              <p>0120-345-6789</p>
            </div>
            <div className={styles.sns_block}>
              <SnsIcon variant="footer_sns" />
            </div>
          </div>
          <div className={styles.link_block}>
            <div className={styles.link_block_container}>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">
                    リンク1-1 テキストテキストテキスト テキストテキストテキスト
                  </a>
                </li>
                <li>
                  <a href="#">リンク1-2 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク2-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク2-2 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク3-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク3-2 テキストテキストテキスト</a>
                </li>
              </ul>
            </div>
            <div className={styles.link_block_container}>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク1-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク1-2 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク1-3 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク2-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク2-2 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク3-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク3-2 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク3-3 テキストテキストテキスト</a>
                </li>
              </ul>
            </div>
            <div className={styles.link_block_container}>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク1-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク1-2 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク1-3 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク2-1 テキストテキストテキスト</a>
                </li>
                <li>
                  <a href="#">リンク2-2 テキストテキストテキスト</a>
                </li>
              </ul>
              <ul>
                <h4>見出し</h4>
                <li>
                  <a href="#">リンク3-1 テキストテキストテキスト</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </footer>
    </>
  );
}
