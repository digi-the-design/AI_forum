<<<<<<< HEAD
"use client";
// ⬛︎ Next.js/ReactHook
// useRouter（Next.js）:指定ページに遷移
// useState（ReactHook）:コンポーネント内部のデータの状態を記憶・保持・管理
import { useRouter } from "next/navigation";
import { useState } from "react"; // クリックカウント・入力データ・boolean...etc
import styles from "./index.module.css";

// ⬛︎ Server Actionsの成否とエラーメッセージ表示用（送信自体に影響なし）
// fetch処理使用（contact.tsx）の為以下設定必須
const initialState = {
  // "error" or "success",が入る
  status: "",
  // "お問い合わせに失敗しました" or "OK",が入る
  message: "",
};

// ⬛︎ 全体の流れ
// ①ボタンクリック: ユーザーが確定ボタンを押す。
// ②エラー検証: handleConfirm が走り、空欄チェックなどをして newErrors（一時的なメモ）を作る。
// ③ここで実行: setErrors(newErrors) を呼び出す。Reactが画面を自動で描き直し、ユーザーの目に入力エラーが表示される。
// ④遷移: エラーがない場合paramsに渡されたデータをurlに変換・追加し確認ページに遷移

// データが渡る順番
// input　入力
// onChange　トリガー
// updateField（setFormValues関数　上書き更新作業）
// formValues
// validationを通過しURLSearchParamsインスタンスでパラメータ取得
// useRouterでconfirmに渡す

// ⬛︎ 入力フォーム設定
export default function ContactForm() {
  const router = useRouter();

  // ⬛︎ ①②:入力・エラーチェック用プロパティ・関数・usestate初期化設定（JSX入力フォームから）

  // ①フォーム入力項目（フリガナ、メールアドレス、etc）の現在の値をリアルタイムに管理するオブジェクトを作成
  // 仕組み:ユーザーがキーボードで１文字入力するたびにonChangeイベントを発動、setFormValuesを呼び出し、値を更新
  // formValues（第一要素:状態の変数）現在の状態（値）を指す
  // setFormValues（第二要素:状態を更新するための関数）formValuesの中身を更新するための関数
  // useState():（key,value）の初期化（初期値設定）
  // const [現在値,更新関数]=useState({設定})で分割代入
  const [formValues, setFormValues] = useState({
    furigana: "",
    lastname: "",
    seibetsu: "",
    company: "",
    zip: "",
    juusho: "",
    tatemonomei: "",
    heyabangou: "",
    phone: "",
    email: "",
    category: [] as string[], // 配列として定義
    message: "",
  });

  // ②エラー入力をリアルタイムに管理するオブジェクトを作成
  // 仕組み:ボタンが押されたタイミングで入力内容をチェックし、問題があればsetErrorsを使ってメッセージを書き込む
  // errors（第一要素:エラー状態の変数）現在のエラー状態（値）を指す
  // setErrors（第二要素:errorsの状態を更新するための関数）errorsの中身を更新するための関数
  // useState():（key,value）の初期化
  const [errors, setErrors] = useState({
    furigana: "",
    lastname: "",
    seibetsu: "",
    company: "",
    zip: "",
    juusho: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });

  // ⬛︎ validation設定
  // ⬛︎ フリガナ検証（カタカナのみ）
  function validateFurigana(furigana: string): string {
    // 未入力チェック
    if (!furigana) return "※フリガナを入力してください。";
    const furiganaRegex = /^[ァ-ヶー　]*$/;
    // 形式チェック
    if (!furiganaRegex.test(furigana))
      return "※フリガナはカタカナで入力してください。";
    // 問題なければ""を返す
    return "";
  }

  // ⬛︎ 郵便番号検証
  function validateZip(zip: string): string {
    if (!zip) return "※郵便番号を入力してください。";
    const postalCodeRegex = /^(\d{7}|\d{3}-\d{4})$/;
    // 形式チェック
    if (!postalCodeRegex.test(zip))
      return "※有効な郵便番号を入力してください（例: 1234567 または 123-4567）。";
    // 問題なければ""を返す
    return "";
  }

  // ⬛︎ 電話番号検証
  function validatePhone(phone: string): string {
    if (!phone) return "※電話番号を入力してください。";
    const phoneRegex = /^0\d{9,10}$|^0\d{1,4}-\d{1,4}-\d{4}$/;
    // 形式チェック
    if (!phoneRegex.test(phone))
      return "※有効な電話番号を入力してください（例: 09012345678 または 090-1234-5678）。";
    // 問題なければ""を返す
    return "";
  }

  // ⬛︎ メールアドレス検証
  function validateEmail(email: string): string {
    // 未入力チェック
    if (!email) return "※メールアドレスを入力してください。";
    // 形式チェック
    if (!email.includes("@"))
      return "※有効なメールアドレスを入力してください。";
    // 問題なければ""を返す
    return "";
  }

  // ⬛︎ データが入力された際にReactの状態（State）を書き換えて入力内容を反映する処理
  // name:どの入力欄を変更したか判別する識別子（フリガナetc..）
  // value:ユーザーが実際に入力した最新の文字列
  // ...prevは入力前の状態で全体が消去されないようにする対策
  const updateField = (name: string, value: string) => {
    // 先に設定したsetFormValues関数((引数)=>{処理})の処理を設定
    setFormValues((prev) => ({
      // ...引数(スプレッド演算子)で他の項目の値を消さずにコピー
      ...prev,
      // 該当の[name]属性値だけを最新のvalueに上書き
      [name]: value,
    }));
  };

  // ⬛︎ チェックボックスが選択された際にReactの状態（State）を書き換えて入力内容を反映する処理
  // value:チェックされた項目の値
  // checked:チェックされたかtrue/falseで判別
  const handleCategoryChange = (value: string, checked: boolean) => {
    // 状態更新用のsetFormValues関数を呼び出し、変更前の状態(prev)を受け取る
    setFormValues((prev) => ({
      // ...引数(スプレッド演算子)で他の項目の値を消さずにコピー
      ...prev,
      // 三項演算子でチェックの状態に応じて配列を更新
      category: checked // category[] 配列
        ? // もしcategory:checked true（チェックされた）なら
          // [追加]既存選択配列を[]にコピー・並べ直し（...prev.category）にvalueを追加
          [...prev.category, value]
        : // それ以外category:checked false（チェックされない　or　外れた）なら
          // [削除]チェックが外れた場合:外れた値（value）と一致しない項目だけで新しい配列を再構成
          // filter()で以下条件の値を抽出
          prev.category.filter(
            // 外された値valueと一致しない変更前の値だけを追加（外れた値は配列されない）
            (item) => item !== value,
          ),
    }));
  };

  // ⬛︎ フォーム送信時のバリデーション（入力チェック）実行関数（必須項目）
  // イベントハンドラーとして使用
  const handleConfirm = () => {
    // エラーメッセージを一時的に保存する変数
    // :typeof errors,定義済みのerrors(状態:state)と同じデータ型であることを宣言
    let newErrors: typeof errors = {
      // validateFurigana関数に入力データを渡す
      furigana: validateFurigana(formValues.furigana),
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      lastname: formValues.lastname ? "" : "※お名前を入力してください。",
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      seibetsu: formValues.seibetsu ? "" : "※性別を選択してください。",
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      company: formValues.company ? "" : "※団体・会社名を入力してください。",
      // validateZip関数に入力データを渡す
      zip: validateZip(formValues.zip),
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      juusho: formValues.juusho ? "" : "※住所を入力してください。",
      // validatePhone関数に入力データを渡す
      phone: validatePhone(formValues.phone),
      // validateEmail関数に入力データを渡す
      email: validateEmail(formValues.email),
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      category:
        formValues.category.length === 0
          ? "※お問い合わせの分類を選択してください。"
          : "",
      // 三項演算子で値があればtrue、なければエラーメッセージを返す
      message: formValues.message
        ? ""
        : "※お問い合わせ内容を入力してください。",
    };

    // errorsの中身を更新するための関数
    setErrors(newErrors);

    // ⬛︎ 全ての項目でエラーメッセージが空か判別しエラーがなければ確認ページへ
    // Object.values(newErrors)エラーオブジェクトからメッセージ文字列だけを取り出す
    // every((err) => !err)で配列の中身が全て""空であるかチェック
    if (Object.values(newErrors).every((err) => !err)) {
      // URLSearchParams()で入力されたデータを安全なクエリパラメータに変換する（インスタンス）を作成
      // URLSearchParams()はJavaScriptのインスタンス
      const params = new URLSearchParams({
        // プロパティ:現在の状態の格納庫.現在の状態のプロパティ
        furigana: formValues.furigana,
        lastname: formValues.lastname,
        seibetsu: formValues.seibetsu,
        company: formValues.company,
        zip: formValues.zip,
        juusho: formValues.juusho,
        tatemonomei: formValues.tatemonomei,
        heyabangou: formValues.heyabangou,
        phone: formValues.phone,
        email: formValues.email,
        message: formValues.message,
        category: formValues.category.join(","),
      });

      // Next.jsのルーター機能を使って、確認ページへ画面を切り替えています。
      // ${params.toString()}: パラメータをfurigana=sasa&lastname=sasaのような安全な形に変換し、URLに追加し遷移
      router.push(`/contact/confirm?${params.toString()}`);
      // 実例
      // http://localhost:3000/contact/confirm?
      // furigana=%E3%82%B5%E3%82%B5&lastname=%E4%BD%90%E3%80%85%E6%9C%A8&seibetsu=%E7%94%B7%E6%80%A7&company=%E3%81%95%E3%81%95&zip=2010000&juusho=%E6%9D%B1%E4%BA%AC%E9%83%BD&tatemonomei=%E3%81%95&heyabangou=&phone=09000000000&email=sasaki%40hotmail.com&message=dd&category=%E4%B8%80%E8%88%AC
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {/* ⬛︎⬛︎⬛︎　フリガナ姓　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="furigana">
          フリガナ：
          <span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="furigana"
          name="furigana"
          required
          style={{ width: "35%" }}
          // formValuesのstateのプロパティ[.furigana]を参照し表示
          value={formValues.furigana}
          // onChange（イベント属性/プロパティ）で入力されたデータをレンダリング
          onChange={(e) => updateField("furigana", e.target.value)}
          // onChangeトリガーで入力検知しupdateField(key,value)の処理実行
          // 入力されたデータでformValues.furiganaがe.target.valueの内容に更新され再レンダリング
          // 新しいデータを格納したvalue={formValues.furigana}が入力欄に表示される
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.furigana ? "block" : "none" }}
      >
        {errors.furigana && (
          <span className={styles.error_message}>{errors.furigana}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　性　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="name">
          氏名：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="lastname"
          required
          style={{ width: "35%" }}
          value={formValues.lastname}
          onChange={(e) => updateField("lastname", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.lastname ? "block" : "none" }}
      >
        {errors.lastname && (
          <span className={styles.error_message}>{errors.lastname}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　性別　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="gender">
          性別：<span className={styles.red}>必須</span>
        </label>
        <div className={styles.radio}>
          <div className={styles.radiobutton_rw}>
            <label className={styles.label} htmlFor="male">
              男性
            </label>
            <input
              className={styles.radio_input}
              type="radio"
              id="male"
              name="seibetsu"
              value="男性"
              checked={formValues.seibetsu === "男性"}
              onChange={(e) => updateField("seibetsu", e.target.value)}
            />
          </div>
          <div className={styles.radiobutton_rw}>
            <label className={styles.label} htmlFor="female">
              女性
            </label>
            <input
              className={styles.radio_input}
              type="radio"
              id="female"
              name="seibetsu"
              value="女性"
              checked={formValues.seibetsu === "女性"}
              onChange={(e) => updateField("seibetsu", e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.seibetsu ? "block" : "none" }}
      >
        {errors.seibetsu && (
          <span className={styles.error_message}>{errors.seibetsu}</span>
        )}
      </div>
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="company">
          団体・会社名：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="company"
          name="company"
          required
          value={formValues.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>
      <div
        className={styles.error_container}
        style={{ display: errors.company ? "block" : "none" }}
      >
        {errors.company && (
          <span className={styles.error_message}>{errors.company}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　郵便番号・住所・建物名・部屋番号　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="zip">
          郵便番号：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="zip"
          name="zip"
          style={{ width: "20%" }}
          value={formValues.zip}
          onChange={(e) => updateField("zip", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.zip ? "block" : "none" }}
      >
        {errors.zip && (
          <span className={styles.error_message}>{errors.zip}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　住所・建物名・部屋番号　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="juusho">
          住所：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="juusho"
          name="juusho"
          required
          value={formValues.juusho}
          onChange={(e) => updateField("juusho", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.juusho ? "block" : "none" }}
      >
        {errors.juusho && (
          <span className={styles.error_message}>{errors.juusho}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　建物名・部屋番号　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="tatemonomei">
          建物名：
        </label>
        <input
          className={styles.input}
          type="text"
          id="tatemonomei"
          name="tatemonomei"
          value={formValues.tatemonomei}
          onChange={(e) => updateField("tatemonomei", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div className={styles.error_container}>
        <span id="building_name-error" className={styles.error_message}></span>
      </div>

      {/* ⬛︎⬛︎⬛︎　部屋番号　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="heyabangou">
          部屋番号：
        </label>
        <input
          className={styles.input}
          type="text"
          id="heyabangou"
          name="heyabangou"
          style={{ width: "10%" }}
          value={formValues.heyabangou}
          onChange={(e) => updateField("heyabangou", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div className={styles.error_container}>
        <span id="heyabangou-error" className={styles.error_message}></span>
      </div>
      {/* 隠しフィールド 
            <input
              className={styles.input}
              type="hidden"
              id="full_juusho"
              name="full_juusho"
            />*/}

      {/* ⬛︎⬛︎⬛︎　電話番号　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="phone">
          電話番号：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="tel"
          id="phone"
          name="phone"
          required
          style={{ width: "40%" }}
          value={formValues.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.phone ? "block" : "none" }}
      >
        {errors.phone && (
          <span className={styles.error_message}>{errors.phone}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　メールアドレス　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="email">
          メールアドレス：<span className={styles.red}>必須</span>
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          style={{ width: "60%" }}
          value={formValues.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.email ? "block" : "none" }}
      >
        {errors.email && (
          <span className={styles.error_message}>{errors.email}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　お問い合わせの分類　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="bunrui">
          お問い合わせの分類：<span className={styles.red}>必須</span>
        </label>
        <div className={styles.checkbox}>
          {/* 一般 */}
          <div className={styles.checkbox_rw}>
            <label
              className={`${styles.checkbox_label} ${styles.label}`}
              htmlFor="bunrui"
            >
              一般
            </label>
            <input
              className={styles.checkbox_input}
              type="checkbox"
              id="category1"
              name="category"
              value="一般"
              checked={formValues.category.includes("一般")}
              onChange={(e) => handleCategoryChange("一般", e.target.checked)}
            />
          </div>
          {/* 技術 */}
          <div className={styles.checkbox_rw}>
            <label
              className={`${styles.checkbox_label} ${styles.label}`}
              htmlFor="category2"
            >
              技術
            </label>
            <input
              className={styles.checkbox_input}
              type="checkbox"
              id="category2"
              name="category"
              value="技術"
              checked={formValues.category.includes("技術")}
              onChange={(e) => handleCategoryChange("技術", e.target.checked)}
            />
          </div>
          {/* 請求 */}
          <div className={styles.checkbox_rw}>
            <label
              className={`${styles.checkbox_label} ${styles.label}`}
              htmlFor="category3"
            >
              請求
            </label>
            <input
              className={styles.checkbox_input}
              type="checkbox"
              id="category3"
              name="category"
              value="請求"
              checked={formValues.category.includes("請求")}
              onChange={(e) => handleCategoryChange("請求", e.target.checked)}
            />
          </div>
          {/* その他 */}
          <div className={styles.checkbox_rw}>
            <label
              className={`${styles.checkbox_label} ${styles.label}`}
              htmlFor="category4"
            >
              その他
            </label>
            <input
              className={styles.checkbox_input}
              type="checkbox"
              id="category4"
              name="category"
              value="その他"
              checked={formValues.category.includes("その他")}
              onChange={(e) => handleCategoryChange("その他", e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.category ? "block" : "none" }}
      >
        {errors.category && (
          <span className={styles.error_message}>{errors.category}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　お問い合わせ内容　⬛︎⬛︎⬛︎ */}
      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="message">
          お問い合わせ内容：<span className={styles.red}>必須</span>
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          rows={10}
          required
          value={formValues.message}
          onChange={(e) => updateField("message", e.target.value)}
        ></textarea>
      </div>
      {/* エラーメッセージ表示用の要素 */}
      <div
        className={styles.error_container}
        style={{ display: errors.message ? "block" : "none" }}
      >
        {errors.message && (
          <span className={styles.error_message}>{errors.message}</span>
        )}
      </div>

      {/* ⬛︎⬛︎⬛︎　ファイルアップロード　⬛︎⬛︎⬛︎ 
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="file">
                ファイルアップロード：
              </label>
              <input
                className={styles.input}
                type="file"
                id="file"
                name="fairu"
                accept=".pdf,.doc,.docx,.jpg,.jpeg"
              />
            </div>*/}

      {/* ⬛︎⬛︎⬛︎　ボタン　⬛︎⬛︎⬛︎ */}
      <div className={styles.button_block}>
        {/* ⬛︎ state.statusが"error"の場合、エラーメッセージを表示する */}

        <button
          type="button"
          className={styles.contact_button}
          onClick={handleConfirm}
        >
          確認
        </button>
=======
"use client"; // ClientComponentを使用するための宣言
// Google_GA4
import { sendGAEvent } from "@next/third-parties/google";
// Google_GTM
import { sendGTMEvent } from "@next/third-parties/google";
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

  // GA4/GTMイベント送信対応
  const handsubmit = () => {
    // Google_GA4
    sendGAEvent({ event: "contact", value: "submit" });
    // Google_GTM
    sendGTMEvent({ event: "contact", value: "submit" });
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
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
      </div>
    </form>
  );
}
