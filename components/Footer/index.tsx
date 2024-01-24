import Link from "next/link";

const Footer = () => {
  const footerRoutes = [
    { href: "#", label: "Support" },
    { href: "#", label: "License" },
    { href: "#", label: "Terms of Use" },
    { href: "#", label: "Blog" },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          &#169; {new Date().getFullYear()} Intrims. All Rights Reserved.
        </p>
      </h5>
      <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          {footerRoutes.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={"https://firebase.tools/bin/win/instant/latest"}
                className="text-base font-medium text-gray-600 hover:text-gray-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
