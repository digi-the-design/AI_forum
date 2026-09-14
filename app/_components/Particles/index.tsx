"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import styles from "./index.module.css";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // ← 最新版はこれが正しい
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className={styles.tsparticles}
      options={{
        particles: {
          number: {
            value: 80,
            density: { enable: true },
          },

          color: { value: "#5bb4c6" },
          shape: {
            type: "circle",
          },

          opacity: {
            value: 0.664994832269074,
            animation: {
              enable: true,
              speed: 2.2722661797524872,
            },
          },

          size: {
            value: { min: 1, max: 3 }, // 基本サイズ
            animation: {
              enable: true, // ← これでサイズが変化する
              speed: 10, // ← 変化の速さ（小さいほどゆっくり）
              sync: false, // ← 粒ごとにバラバラに動く
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#99afbd",
            opacity: 0.6,
            width: 1,
          },

          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: {
              enable: false,
            },
          },
        },

        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },

        retina_detect: true,
      }}
    />
  );
}
