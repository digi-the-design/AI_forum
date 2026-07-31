"use client"; // ClientComponentを使用するための宣言
// GA
import { sendGAEvent } from "@next/third-parties/google";
// _actions/contact.tsxのcreateContactData関数をimportするための宣言
import { createContactData } from "@/app/_actions/contact";
// ReactのuseActionStateを使用するための宣言
import { useActionState } from "react";
import styles from "./index.module.css";

// ⬛︎ 初期状態を定義するオブジェクト ServerActionの戻り値と型が入る
// initialStateは、フォームの状態を管理するためのオブジェクト
const initialState = {
  // status: "", message: ""は、フォームの状態を管理するためのプロパティで、初期値として空文字列を設定している
  status: "",
  message: "",
};

// ⬛︎ ContactFormコンポーネントを定義する関数
// 状態判別
// state：ServerActionの戻り値（結果）初期状態はinitialState
export default function ContactForm() {
  // ⬛︎ ReactフックのuseActionState関数を使用
  // ServerAction関数（createContactData）の戻り値を管理するstateに保持しフォームの送信状態を管理する

  // useActionState(FormAction関数, 初期状態)の形で使用する
  // 配列分割代入でstate,formActionを定義
  // 引数① stateに初期状態としてinitialStateが格納される
  // 引数② formActionはフォームの送信時に（createContactData）を呼び出す関数になる
  const [state, formAction] = useActionState(createContactData, initialState);

  console.log(state);

  // GA4イベント送信対応
  const handsubmit = () => {
    sendGAEvent({ event: "contact", value: "submit" });
  };

  // ⬛︎ フォームの送信が成功した場合、サンクスページを表示する
  // state.statusはcreateContactData()関数の戻り値のstatusプロパティを参照している
  if (state.status === "success") {
    return (
      <p className={styles.success}>
        お問い合わせありがとうございました。
        <br />
        内容を確認の上、担当者よりご連絡いたします。
      </p>
    );
  }

  return (
    // ⬛︎ フォームJSXを返す
    // action属性にformActionを設定し、フォームの送信時にcreateContactData関数が実行される
    <form className={styles.form} action={formAction} onSubmit={handsubmit}>
      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="lastname">
            姓
          </label>
          <input
            className={styles.textfield}
            // htmlForとinputのidを一致させる
            // labelをクリックした際にinputにフォーカス
            type="text"
            id="lastname"
            name="lastname"
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="firstname">
            名
          </label>
          <input
            className={styles.textfield}
            type="text"
            id="firstname"
            name="firstname"
          />
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="company">
          会社名
        </label>
        <input
          className={styles.textfield}
          type="text"
          id="company"
          name="company"
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="email">
          メールアドレス
        </label>
        <input
          className={styles.textfield}
          type="text"
          id="email"
          name="email"
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label} htmlFor="message">
          メッセージ
        </label>
        <textarea className={styles.textarea} id="message" name="message" />
      </div>
      <div className={styles.actions}>
        {/* ⬛︎ state.statusが"error"の場合、エラーメッセージを表示する */}
        {state.status === "error" && (
          <p className={styles.error}>{state.message}</p>
        )}
        <input type="submit" value="送信する" className={styles.button} />
      </div>
    </form>
  );
}
