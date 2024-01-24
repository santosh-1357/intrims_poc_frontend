import Link from "next/link";
import routes from "@/routes";
import Icon from "@/components/Icons";
import { usePathname } from "next/navigation";

type SidebarLinksProps = {
  isSidebarOpen: boolean;
};

const SidebarLinks = ({ isSidebarOpen }: SidebarLinksProps) => {
  //  Get the current pathname
  const pathname = usePathname() || "";

  return routes
    .filter((route) => route?.isSideBarRoute)
    .map((route, index) => {
      // Checks the current route is active
      const isActiveRoute =
        pathname.includes(`/${route.path}`) || pathname === route.path;

      return (
        <Link key={index} href={`/${route.path}`}>
          <div className="relative mb-3 flex ">
            <li className="my-[3px] flex items-center pr-5 pl-6">
              <div
                className={`${
                  isActiveRoute
                    ? "font-bold text-brand-500"
                    : "font-medium text-gray-600"
                } bg-lightPrimary rounded-lg p-[7px]`}
              >
                <Icon name={route.icon} />
              </div>
              <p
                className={`leading-1 ml-4 flex ${
                  isActiveRoute
                    ? "font-bold text-navy-700"
                    : "font-medium text-gray-600"
                } ${!isSidebarOpen && "md:hidden"}`}
              >
                {route.name}
              </p>
            </li>
            {isActiveRoute && (
              <div
                className={`absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500`}
              />
            )}
          </div>
        </Link>
      );
    });
};

export default SidebarLinks;
