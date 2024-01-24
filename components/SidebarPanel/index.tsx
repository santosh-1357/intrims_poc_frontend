import Link from "next/link";
import Icon from "../Icons";
import Links from "./components/Links";

interface SidebarProps {
  onClose: () => void;
  isSidebarOpen: boolean;
}

const animatoinStyles = "transition-all duration-175 linear";

const Sidebar = ({ isSidebarOpen, onClose }: SidebarProps) => (
  <div
    className={`sm:none fixed min-h-full !z-50 md:!z-50 lg:!z-50 xl:!z-0 flex flex-col bg-white pb-10 shadow-2xl shadow-white/5 ${animatoinStyles} ${
      isSidebarOpen
        ? "translate-x-0"
        : "-translate-x-96 xl:-translate-x-[0.5rem]"
    }`}
  >
    <span
      className="absolute top-4 right-4 block cursor-pointer xl:hidden"
      onClick={onClose}
    >
      <Icon name="close" />
    </span>

    <span
      className={`hidden xl:block absolute top-[75px] -right-[9px] bg-white text-sm text-brand-500 opacity-50 hover:opacity-100 p-[3px] rounded-full cursor-pointer ${animatoinStyles}`}
      onClick={onClose}
      style={{
        boxShadow: "4px 1px 10px #d6d6d6",
      }}
    >
      <Icon size={9} name={isSidebarOpen ? "left-arrow" : "right-arrow"} />
    </span>

    <div
      className={`h-[109px] w-[255px] mb-5 border-b-[1px] flex items-center justify-center ${
        !isSidebarOpen ? "xl:hidden" : ""
      }`}
    >
      <Link href="/" className="text-4xl outline-none">
        <span className="text-brand-500">In</span>trims
      </Link>
    </div>

    {!isSidebarOpen && (
      <div className="h-[109px] mb-5 ml-[8px] border-b-[1px] hidden xl:flex items-center justify-center">
        <Link className="text-brand-500 text-4xl" href="/">
          In
        </Link>
      </div>
    )}

    {/* Nav item */}
    <ul className="mb-auto">
      <Links isSidebarOpen={isSidebarOpen} />
    </ul>
  </div>
);

export default Sidebar;
