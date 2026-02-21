export default function Footer() {
  const footerLinks = [
    { label: "Meta", href: "https://about.meta.com/" },
    { label: "Tentang", href: "https://about.instagram.com/" },
    { label: "Blog", href: "https://about.instagram.com/blog" },
    { label: "Pekerjaan", href: "https://www.metacareers.com/" },
    { label: "Bantuan", href: "https://help.instagram.com/" },
    { label: "API", href: "https://developers.facebook.com/docs/instagram" },
    { label: "Privasi", href: "https://privacycenter.instagram.com/" },
    { label: "Ketentuan", href: "https://help.instagram.com/581066165581870" },
    { label: "Lokasi", href: "https://www.instagram.com/explore/locations/" },
    { label: "Instagram Lite", href: "https://www.instagram.com/web/lite/" },
    { label: "Meta AI", href: "https://ai.meta.com/" },
    { label: "Threads", href: "https://www.threads.net/" },
    {
      label: "Pengunggahan Kontak & Nonpengguna",
      href: "https://www.facebook.com/help/637205020878504",
    },
    {
      label: "Verifikasi Meta",
      href: "https://about.meta.com/technologies/meta-verified/",
    },
    { label: "Meta di Indonesia", href: "https://about.meta.com/id/" },
  ];
  return (
    <div className="w-full h-fit px-6 flex flex-col justify-start items-center gap-4 text-xs text-gray-500 pt-5 pb-8 ">
      {/* Awal Link */}
      <div className="w-full h-fit flex flex-wrap justify-center gap-4">
        {footerLinks.map((el, idx) => {
          return (
            <a href={el.href} key={idx} className="hover:underline">
              {el.label}
            </a>
          );
        })}
      </div>

      {/* Akhir Link */}
      {/* Awal Copyright */}
      <div>
        &copy; {new Date().getFullYear()} Instagram form Meta. All rights
        reserved
      </div>
      {/* Akhir Copyright */}
    </div>
  );
}
