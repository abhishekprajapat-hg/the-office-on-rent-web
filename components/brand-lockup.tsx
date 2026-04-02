import Image from "next/image";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({ className = "", priority = false }: BrandLockupProps) {
  const classes = ["brand-logo", className].filter(Boolean).join(" ");

  return (
    <Image
      src="/logo.png"
      alt="The Office On Rent"
      width={220}
      height={108}
      sizes="(max-width: 420px) 120px, (max-width: 560px) 128px, 220px"
      priority={priority}
      className={classes}
    />
  );
}
