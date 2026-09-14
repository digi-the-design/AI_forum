"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.css";

type FormValues = {
  furigana: string;
  lastname: string;
  firstname: string;
  seibetsu: string;
  company: string;
  zip: string;
  juusho: string;
  tatemonomei: string;
  heyabangou: string;
  phone: string;
  email: string;
  category: string[];
  message: string;
};

type Errors = {
  furigana: string;
  lastname: string;
  seibetsu: string;
  company: string;
  zip: string;
  juusho: string;
  phone: string;
  email: string;
  category: string;
  message: string;
};

export default function ContactForm() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    furigana: "",
    lastname: "",
    firstname: "",
    seibetsu: "",
    company: "",
    zip: "",
    juusho: "",
    tatemonomei: "",
    heyabangou: "",
    phone: "",
    email: "",
    category: [],
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({
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

  const updateField = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFurigana = (furigana: string) => {
    if (!furigana) return "※フリガナを入力してください。";
    const regex = /^[ァ-ヶー　]*$/;
    return regex.test(furigana) ? "" : "※フリガナはカタカナで入力してください。";
  };

  const validateZip = (zip: string) => {
    if (!zip) return "※郵便番号を入力してください。";
    const regex = /^(\d{7}|\d{3}-\d{4})$/;
    return regex.test(zip)
      ? ""
      : "※有効な郵便番号を入力してください（例: 1234567 または 123-4567）。";
  };

  const validatePhone = (phone: string) => {
    if (!phone) return "※電話番号を入力してください。";
    const regex = /^0\d{9,10}$|^0\d{1,4}-\d{1,4}-\d{4}$/;
    return regex.test(phone)
      ? ""
      : "※有効な電話番号を入力してください（例: 09012345678 または 090-1234-5678）。";
  };

  const validateEmail = (email: string) => {
    if (!email) return "※メールアドレスを入力してください。";
    return email.includes("@")
      ? ""
      : "※有効なメールアドレスを入力してください。";
  };

  const handleCategoryChange = (value: string, checked: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, value]
        : prev.category.filter((item) => item !== value),
    }));
  };

  const handleConfirm = () => {
    const newErrors: Errors = {
      furigana: validateFurigana(formValues.furigana),
      lastname: formValues.lastname ? "" : "※お名前を入力してください。",
      seibetsu: formValues.seibetsu ? "" : "※性別を選択してください。",
      company: formValues.company ? "" : "※団体・会社名を入力してください。",
      zip: validateZip(formValues.zip),
      juusho: formValues.juusho ? "" : "※住所を入力してください。",
      phone: validatePhone(formValues.phone),
      email: validateEmail(formValues.email),
      category: formValues.category.length === 0 ? "※お問い合わせの分類を選択してください。" : "",
      message: formValues.message ? "" : "※お問い合わせ内容を入力してください。",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      const params = new URLSearchParams({
        furigana: formValues.furigana,
        lastname: formValues.lastname,
        firstname: formValues.firstname,
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

      router.push(`/contact/confirm?${params.toString()}`);
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="furigana">フリガナ</label>
          <input
            className={styles.textfield}
            type="text"
            id="furigana"
            name="furigana"
            value={formValues.furigana}
            onChange={(e) => updateField("furigana", e.target.value)}
          />
          {errors.furigana && <span className={styles.error_message}>{errors.furigana}</span>}
        </div>
      </div>

      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="lastname">姓</label>
          <input
            className={styles.textfield}
            type="text"
            id="lastname"
            name="lastname"
            value={formValues.lastname}
            onChange={(e) => updateField("lastname", e.target.value)}
          />
          {errors.lastname && <span className={styles.error_message}>{errors.lastname}</span>}
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="firstname">名</label>
          <input
            className={styles.textfield}
            type="text"
            id="firstname"
            name="firstname"
            value={formValues.firstname}
            onChange={(e) => updateField("firstname", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="seibetsu">性別</label>
        <select
          className={styles.textfield}
          id="seibetsu"
          name="seibetsu"
          value={formValues.seibetsu}
          onChange={(e) => updateField("seibetsu", e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
        {errors.seibetsu && <span className={styles.error_message}>{errors.seibetsu}</span>}
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="company">会社名</label>
        <input
          className={styles.textfield}
          type="text"
          id="company"
          name="company"
          value={formValues.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
        {errors.company && <span className={styles.error_message}>{errors.company}</span>}
      </div>

      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="zip">郵便番号</label>
          <input
            className={styles.textfield}
            type="text"
            id="zip"
            name="zip"
            value={formValues.zip}
            onChange={(e) => updateField("zip", e.target.value)}
          />
          {errors.zip && <span className={styles.error_message}>{errors.zip}</span>}
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="juusho">住所</label>
          <input
            className={styles.textfield}
            type="text"
            id="juusho"
            name="juusho"
            value={formValues.juusho}
            onChange={(e) => updateField("juusho", e.target.value)}
          />
          {errors.juusho && <span className={styles.error_message}>{errors.juusho}</span>}
        </div>
      </div>

      <div className={styles.horizontal}>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="tatemonomei">建物名</label>
          <input
            className={styles.textfield}
            type="text"
            id="tatemonomei"
            name="tatemonomei"
            value={formValues.tatemonomei}
            onChange={(e) => updateField("tatemonomei", e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="heyabangou">部屋番号</label>
          <input
            className={styles.textfield}
            type="text"
            id="heyabangou"
            name="heyabangou"
            value={formValues.heyabangou}
            onChange={(e) => updateField("heyabangou", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="phone">電話番号</label>
        <input
          className={styles.textfield}
          type="text"
          id="phone"
          name="phone"
          value={formValues.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        {errors.phone && <span className={styles.error_message}>{errors.phone}</span>}
      </div>

      <div className={styles.item}>
        <label className={styles.label} htmlFor="email">メールアドレス</label>
        <input
          className={styles.textfield}
          type="text"
          id="email"
          name="email"
          value={formValues.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        {errors.email && <span className={styles.error_message}>{errors.email}</span>}
      </div>

      <div className={styles.item}>
        <label className={styles.label}>お問い合わせ分類</label>
        <div className={styles.checkbox_rw}>
          {[
            "AI導入",
            "AI業務",
            "講演依頼",
            "その他",
          ].map((category) => (
            <label key={category} className={styles.checkbox_label}>
              <input
                type="checkbox"
                name="category"
                value={category}
                checked={formValues.category.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              {category}
            </label>
          ))}
        </div>
        {errors.category && <span className={styles.error_message}>{errors.category}</span>}
      </div>

      <div className={styles.form_group}>
        <label className={styles.label} htmlFor="message">お問い合わせ内容</label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          rows={10}
          value={formValues.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
        {errors.message && <span className={styles.error_message}>{errors.message}</span>}
      </div>

      <div className={styles.button_block}>
        <button type="button" className={styles.contact_button} onClick={handleConfirm}>
          確認
        </button>
      </div>
    </form>
  );
}
