import ContactForm from "@/app/_components/ContactForm";
<<<<<<< HEAD
export default function Page() {
  return (
    <>
      <ContactForm />
    </>
=======
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        ご質問、ご相談は下記フォームよりお問い合わせください。
        <br />
        内容確認後、担当者より通常3営業日以内にご連絡いたします。
      </p>
      <ContactForm />
    </div>
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
  );
}
