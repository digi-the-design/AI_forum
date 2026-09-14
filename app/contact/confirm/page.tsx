"use client";
// useSearchParams（Next.js）:URL（クエリパラメータ等）を取得
// useRouter（Next.js）:指定ページに遷移
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createContactData } from "@/app/_actions/contact";
import styles from "./page.module.css";
// データが渡る順番
// useSearchParams　パラメータ取得
// params.get("プロパティ名")　値を取得
// button + API(async/await) 非同期処理
// FormData()　値を専用のコンテナ（FormData()）に追加
// await createContactData　渡したFormData()のデータを呼び戻し結果を受け取る
// useRouter complete.tsxに遷移

function ConfirmPageContent() {
  // ⬛︎ コンポーネント側で作成したURL（クエリパラメータ）をparamsに格納
  const params = useSearchParams();
  const router = useRouter();

  // params.get()で値を取得 + null値チェック
  const furigana = params.get("furigana") || "";
  const lastname = params.get("lastname") || "";
  const seibetsu = params.get("seibetsu") || "";
  const company = params.get("company") || "";
  const zip = params.get("zip") || "";
  const juusho = params.get("juusho") || "";
  const tatemonomei = params.get("tatemonomei") || "";
  const heyabangou = params.get("heyabangou") || "";
  const phone = params.get("phone") || "";
  const email = params.get("email") || "";
  const message = params.get("message") || "";
  const categoryString = params.get("category") || "";
  const category = categoryString ? categoryString.split(",") : [];

  // ⬛︎ ボタン要素に設定するhandleSubmit関数　非同期処理でデータ送信を制御
  // ボタンを押すとformDataがcreateContactData関数でSeverActionsに送られる
  const handleSubmit = async () => {
    // FormData()インスタンスを作成し送信データをまとめる処理
    // FormData()はJavaScriptのインスタンス
    const formData = new FormData();
    // formDataに（key,value）を追加
    formData.append("furigana", furigana);
    formData.append("lastname", lastname);
    formData.append("seibetsu", seibetsu);
    formData.append("company", company);
    formData.append("zip", zip);
    formData.append("juusho", juusho);
    formData.append("tatemonomei", tatemonomei);
    formData.append("heyabangou", heyabangou);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("message", message);
    category.forEach((value) => {
      if (value) {
        formData.append("category", value);
      }
    });
    // 非同期処理でcreateContactData関数から戻り値を取得し変数に格納
    // 非同期処理:HubSpotの通信が終わるのを待って結果を受け取る
    const result = await createContactData(null, formData);

    // createContactData関数の戻り値を条件に遷移処理
    if (result.status === "success") {
      // router（useRouter)で完了画面に遷移
      router.push("/contact/complete");
    } else {
      alert(result.message);
    }
  };

  // 以下JSX
  return (
    <div className={styles.form}>
      <h2>入力内容の確認</h2>
      <div className={styles.form_group}>
        <label className={styles.label}>
          フリガナ：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{furigana}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          氏名：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{lastname}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          性別：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{seibetsu}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          団体・会社名：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{company}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          郵便番号：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{zip}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          住所：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{juusho}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>建物名：</label>
        <p className={styles.input}>{tatemonomei}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>部屋番号：</label>
        <p className={styles.input}>{heyabangou}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          電話番号：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{phone}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          メールアドレス：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{email}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>お問い合わせ分類：</label>
        <p className={styles.input}>{category.join("、")}</p>
      </div>
      <div className={styles.form_group}>
        <label className={styles.label}>
          お問い合わせ内容：
          <span className={styles.red}>必須</span>
        </label>
        <p className={styles.input}>{message}</p>
      </div>
      <button onClick={() => router.back()}>戻る</button>
      {/*handleSubmit関数を実行*/}
      <button className={styles.contact_button} onClick={handleSubmit}>
        送信する
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className={styles.form}>読み込み中...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}
