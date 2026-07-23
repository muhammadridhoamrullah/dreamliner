import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function AvatarPreview({ src, className }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt="Foto Profil"
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer ${className}`}
      />

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
