"use server";

interface ContactFormData {
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
}

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
  const rawFormData: ContactFormData = {
    furigana: (formData.get("furigana") as string) || "",
    lastname: (formData.get("lastname") as string) || "",
    firstname: (formData.get("firstname") as string) || "",
    seibetsu: (formData.get("seibetsu") as string) || "",
    company: (formData.get("company") as string) || "",
    zip: (formData.get("zip") as string) || "",
    juusho: (formData.get("juusho") as string) || "",
    tatemonomei: (formData.get("tatemonomei") as string) || "",
    heyabangou: (formData.get("heyabangou") as string) || "",
    phone: (formData.get("phone") as string) || "",
    email: (formData.get("email") as string) || "",
    category: formData.getAll("category") as string[],
    message: (formData.get("message") as string) || "",
  };

  if (!rawFormData.lastname) {
    return { status: "error", message: "姓を入力してください" };
  }
  if (!rawFormData.firstname) {
    return { status: "error", message: "名を入力してください" };
  }
  if (!rawFormData.company) {
    return { status: "error", message: "会社名を入力してください" };
  }
  if (!rawFormData.email) {
    return { status: "error", message: "メールアドレスを入力してください" };
  }
  if (!validateEmail(rawFormData.email)) {
    return { status: "error", message: "メールアドレスの形式が誤っています" };
  }
  if (!rawFormData.message) {
    return { status: "error", message: "メッセージを入力してください" };
  }

  const result = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: [
          { objectTypeId: "0-1", name: "furigana", value: rawFormData.furigana },
          { objectTypeId: "0-1", name: "lastname", value: rawFormData.lastname },
          { objectTypeId: "0-1", name: "firstname", value: rawFormData.firstname },
          { objectTypeId: "0-1", name: "seibetsu", value: rawFormData.seibetsu },
          { objectTypeId: "0-1", name: "company", value: rawFormData.company },
          { objectTypeId: "0-1", name: "zip", value: rawFormData.zip },
          { objectTypeId: "0-1", name: "juusho", value: rawFormData.juusho },
          { objectTypeId: "0-1", name: "tatemonomei", value: rawFormData.tatemonomei },
          { objectTypeId: "0-1", name: "heyabangou", value: rawFormData.heyabangou },
          { objectTypeId: "0-1", name: "phone", value: rawFormData.phone },
          { objectTypeId: "0-1", name: "email", value: rawFormData.email },
          { objectTypeId: "0-1", name: "category", value: rawFormData.category.join(";") },
          { objectTypeId: "0-1", name: "message", value: rawFormData.message },
        ],
      }),
    },
  );

  try {
    await result.json();
  } catch (e) {
    console.log(e);
    return { status: "error", message: "お問い合わせに失敗しました" };
  }

  return { status: "success", message: "OK" };
}
