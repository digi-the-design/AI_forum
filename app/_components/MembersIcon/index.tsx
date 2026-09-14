import Image from "next/image";
type Props = {
  src: string;
  size?: number;
};
export default function AuthorIcon({ src, size = 100 }: Props) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt="author icon"
      style={{ clipPath: "circle(50% at 50% 50%)", objectFit: "cover" }}
    />
  );
}
