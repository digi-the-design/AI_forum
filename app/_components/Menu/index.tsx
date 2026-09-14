"use client";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import styles from "./index.module.css";
import SnsIcon from "@/app/_components/SNSIcon";

import { useState, useEffect } from "react";
type MenuProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function Menu({ isOpen, onOpen, onClose }: MenuProps) {
  // ⬛︎ スクロールでCSS追加を判別するための状態管理useStateを定義
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownMenu, setHasShownMenu] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (window.scrollY > 550) {
        setIsVisible(true);
        setHasShownMenu(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // ← 依存配列を空にして一度だけリスナー登録

  // ⬛︎ メニューリストanimationDelay追加
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const modalList = document.querySelector(
      `.${styles.modal_items}`,
    ) as HTMLUListElement | null;

    if (!modalList) return;

    const items = Array.from(modalList.children) as HTMLLIElement[];

    items.forEach((item, index) => {
      item.classList.add(styles.modal_item_reveal);
      item.style.animationDelay = `${index * 200}ms`;
    });
  }, [isOpen]);

  // ⬛︎ 以下はモバイル版メニューの開閉状態を管理するためのコードです。
  // ここでisOpenの状態を管理するuseStateを定義：初期値false（閉じている状態）
  // open関数とclose関数を定義して、メニューの開閉状態を切り替える
  const handleLinkClick = () => {
    setTimeout(onClose, 500);
  };

  return (
    <nav
      className={cx(
        styles.nav,
        isOpen && styles.open,
        isVisible && styles.showMenu,
        hasShownMenu && styles.hasShownMenu,
      )}
    >
      {!isOpen && (
        <>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/img/logo.png"
              alt="SIMPLE"
              width={188}
              height={58}
              className={styles.logo}
              priority
            />
          </Link>
          <nav className={styles.navUl}>
            <ul className={styles.items}>
              {/* top */}
              <li>
                <Link href="/" onClick={handleLinkClick}>
                  トップ
                </Link>
              </li>

              {/* TOPICS（第二階層あり） */}
              <li className={styles.hasChild}>
                <span className={styles.parent}>TOPICS</span>
                <ul className={styles.subItems}>
                  <li>
                    <Link href="/influence/" onClick={handleLinkClick}>
                      AIの進化とその影響
                    </Link>
                  </li>
                  <li>
                    <Link href="/future_society/" onClick={handleLinkClick}>
                      AIと未来社会
                    </Link>
                  </li>
                  <li>
                    <Link href="/ethic/" onClick={handleLinkClick}>
                      AIと倫理
                    </Link>
                  </li>
                </ul>
              </li>

              {/* news */}
              <li>
                <Link href="/news" onClick={handleLinkClick}>
                  ニュース
                </Link>
              </li>

              {/* blog（第二階層あり） */}
              <li className={styles.hasChild}>
                <span className={styles.parent}>ブログ</span>
                <ul className={styles.subItems}>
                  <li>
                    <Link href="/blog/" onClick={handleLinkClick}>
                      BLOG & REPORT
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/members" onClick={handleLinkClick}>
                      MEMBER
                    </Link>
                  </li>
                </ul>
              </li>

              {/* about（第二階層あり） */}
              <li className={styles.hasChild}>
                <span className={styles.parent}>会社情報</span>
                <ul className={styles.subItems}>
                  <li>
                    <Link href="/about/" onClick={handleLinkClick}>
                      ご挨拶
                    </Link>
                  </li>
                  <li>
                    <Link href="/perspective/" onClick={handleLinkClick}>
                      沿革
                    </Link>
                  </li>
                  <li>
                    <Link href="/access/" onClick={handleLinkClick}>
                      アクセス
                    </Link>
                  </li>
                </ul>
              </li>

              {/* contact */}
              <li>
                <Link href="/contact" onClick={handleLinkClick}>
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.rightBlock}>
            {/* SnsIcon */}
            <SnsIcon variant="header" url="" title="" />
            <button className={styles.button} onClick={onOpen}>
              <Image
                src="/img/menu.svg"
                alt="メニュー"
                width={24}
                height={24}
              />
            </button>
          </div>
        </>
      )}

      {isOpen && (
        <>
          <div className={styles.nav_open_column_l}>
            <Link href="/" className={styles.nav_open_logoLink}>
              <Image
                src="/img/logo.png"
                alt="SIMPLE"
                width={240}
                height={58}
                className={styles.logo}
                priority
              />
            </Link>
          </div>
          <div className={styles.nav_open_column_r}>
            <nav className={styles.nav}>
              <ul className={styles.modal_items}>
                {" "}
                <li>
                  <Link href="/" onClick={handleLinkClick}>
                    トップ
                  </Link>
                </li>
                <li className={styles.hasChild}>
                  <span className={styles.parent}>TOPICS</span>
                  <ul className={styles.subItems_02}>
                    <li>
                      <Link href="/influence/" onClick={handleLinkClick}>
                        AIの進化とその影響
                      </Link>
                    </li>
                    <li>
                      <Link href="/future_society/" onClick={handleLinkClick}>
                        AIと未来社会
                      </Link>
                    </li>
                    <li>
                      <Link href="/ethic/" onClick={handleLinkClick}>
                        AIと倫理
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/news" onClick={handleLinkClick}>
                    ニュース
                  </Link>
                </li>
                <li className={styles.hasChild}>
                  <span className={styles.parent}>ブログ</span>
                  <ul className={styles.subItems_02}>
                    <li>
                      <Link href="/blog/" onClick={handleLinkClick}>
                        BLOG & REPORT
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/members" onClick={handleLinkClick}>
                        MEMBER
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.hasChild}>
                  <span className={styles.parent}>会社情報</span>
                  <ul className={styles.subItems_02}>
                    <li>
                      <Link href="/about/" onClick={handleLinkClick}>
                        ご挨拶
                      </Link>
                    </li>
                    <li>
                      <Link href="/perspective/" onClick={handleLinkClick}>
                        沿革
                      </Link>
                    </li>
                    <li>
                      <Link href="/access/" onClick={handleLinkClick}>
                        アクセス
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact" onClick={handleLinkClick}>
                    お問い合わせ
                  </Link>
                </li>
              </ul>{" "}
              <div className={styles.openNav_sns_icon}>
                <SnsIcon variant="openNav" url="" title="" />
              </div>
            </nav>
            <button
              className={cx(styles.close_button, isOpen && styles.close)}
              onClick={onClose}
            >
              <Image
                src="/img/close.svg"
                alt="閉じる"
                width={24}
                height={24}
                priority
              />
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
