"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./index.module.css";
type SnsIconProps = {
  variant: string;
};
export default function SnsIcons({ variant, url, title }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const snsItems = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=%20${encodedTitle}`,
      label: "X",
      icon: faXTwitter,
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: faInstagram,
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Facebook",
      icon: faFacebookF,
    },
  ];

  return (
    <ul className={`${styles.icons} ${styles[variant]}`}>
      {snsItems.map((item) => (
        <li key={item.href}>
          <a href={item.href} target="_blank" aria-label={item.label}>
            <FontAwesomeIcon icon={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
