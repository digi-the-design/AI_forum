"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
export const useScrollAnimation = () => {
  //////////// inViewの設定 ////////////
  /* ref:titleRef（任意名:useInViewが返す参照先要素につける）　inView:titleInView(任意名:boolean値で状態を確認する。） */
  // title
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  // text
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  // img
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false,
    threshold: 0.7,
  });

  //////////// スクロール方向を検出する為の関数 ////////////
  //スクロール方向を検出する為の関数setScrollDown・setLastYを使用してスクロール方向を検出

  //////////// useStateの設定 ////////////
  /*scrollDown:スクロール方向を保存するstate */
  /*scrollDownを"up,down"文字列判別するための初期値null　boolean値なし*/
  const [scrollDown, setScrollDown] = useState(null);
  /*lastY:最後のスクロール位置を保存するref　最初のスクロールイベントが発生するまでの「仮の値」（0）*/
  const lastY = useRef(0);

  //////////// useEffectで処理を登録設定 ////////////
  /*下方向スクロールは scrollDown === "down" フラグ*/
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      /*currentY > lastYならtrue（下方向にスクロール中）*/
      if (currentY > lastY.current) {
        setScrollDown("down");
      } else {
        setScrollDown("up");
      }
      /* 最後のスクロール位置を更新 */
      lastY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //////////// useStateの設定 ////////////
  // アニメーションの再生制御
  const [titlePlayed, setTitlePlayed] = useState(false);
  const [textPlayed, setTextPlayed] = useState(false);
  const [imgPlayed, setImgPlayed] = useState(false);

  //////////// useEffectで処理を登録設定 ////////////
  // スクロールダウンで要素がinViewになったときにアニメーションを再生
  useEffect(() => {
    if (["down", "up"].includes(scrollDown) && titleInView && !titlePlayed) {
      setTitlePlayed(true);
    }
  }, [scrollDown, titleInView, titlePlayed]);

  useEffect(() => {
    if (["down", "up"].includes(scrollDown) && textInView && !textPlayed) {
      setTextPlayed(true);
    }
  }, [scrollDown, textInView, textPlayed]);

  useEffect(() => {
    if (["down", "up"].includes(scrollDown) && imgInView && !imgPlayed) {
      setImgPlayed(true);
    }
  }, [scrollDown, imgInView, imgPlayed]);
  return {
    //Intersection Observerのref(監視対象のDOM要素)とinViewを返す
    //ref
    titleRef,
    textRef,
    imgRef,
    // 各要素の再生状態確認フラグ trueでアニメーション再生
    //Played
    titlePlayed,
    textPlayed,
    imgPlayed,
  };
};
