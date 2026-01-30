"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
  //usestateの返り値（state値,stateを更新する関数）をconst分割代入で受け取り、usestate関数のTypeScript型と引数の初期値(false)設定。
  //Reactの仕様で分割代入の内容は[値,関数]。setOpen(値)でisOpen(現在の状態)のboolean値更新。
  const [isOpen, setOpen] = useState<boolean>(false);
  //setOpen関数の値(true/false)でstateを更新するための関数を作成(トリガーボタンのonClickで呼び出しからisOpenの値を更新)
  //open/close関数を作成(アロー関数をconstに代入して定義している変数)
  //setOpenを呼び出してisOpenを更新(setOpen(isOpen))するトリガーopen/close関数
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  //const open = () => {document.querySelector("nav")?.classList.add(styles.open);};
  return (
    <div>
      {/*isOpenにtrue/falseのどちらが入ったかで条件分岐。trueならstyle.open追加。falseなら追加しない。 */}
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/news">ニュース</Link>
          </li>
          <li>
            <Link href="/members">メンバー</Link>
          </li>
          <li>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
        {/*buttonクラスとstyles.closeをcxで2つ追加*/}
        <button className={cx(styles.button, styles.close)} onClick={close}>
          <Image
            src="/close.svg"
            alt="閉じる"
            width={24}
            height={24}
            priority
          />
        </button>
      </nav>
      <button className={styles.button} onClick={open}>
        <Image src="/menu.svg" alt="メニュー" width={24} height={24} />
      </button>
    </div>
  );
}
