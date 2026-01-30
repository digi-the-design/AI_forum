//TypeScript型定義
export type Category = {
  name: string;
};
//　以下NewList/index.tsxで使用している引数名articleと各キープロパティ
// article.id
// article.title
// article.category
// article.publishedAt
// article.createdAt

//News型定義
export type News = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  publishedAt: string;
  createdAt: string;
};
