import { AiFillAppstore, AiOutlineMenu } from "react-icons/ai";
import { BsArrowBarUp } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import {
  FaAngleLeft,
  FaAngleRight,
  FaUserFriends,
  FaFileExcel,
  FaFileCsv,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoDocuments, IoReorderThree, IoBusiness } from "react-icons/io5";
import {
  IoMdInformationCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  MdArrowDropUp,
  MdBarChart,
  MdDashboard,
  MdHome,
  MdOutlineCalendarToday,
  MdOutlineImage,
  MdPayments,
  MdOutlineFormatLineSpacing,
} from "react-icons/md";
import { TbUserFilled, TbWorldShare } from "react-icons/tb";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaFilter, FaBoxesStacked } from "react-icons/fa6";
import { RiTestTubeFill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";
import { PiMoneyFill } from "react-icons/pi";

const Icon = ({ name, size = 18, ...rest }: any) => {
  switch (name) {
    case "arrow-up-point":
      return <MdArrowDropUp {...rest} />;

    case "bar-chart":
      return <MdBarChart {...rest} />;

    case "base-arrow-up":
      return <BsArrowBarUp {...rest} />;

    case "business":
      return <IoBusiness {...rest} />;

    case "boxes":
      return <FaBoxesStacked {...rest} />;

    case "calendar":
      return <MdOutlineCalendarToday {...rest} />;

    case "close":
      return <CgClose {...rest} />;

    case "csv-file":
      return <FaFileCsv {...rest} />;

    case "dashbord":
      return <MdDashboard {...rest} />;

    case "documents":
      return <IoDocuments {...rest} />;

    case "excel-file":
      return <FaFileExcel {...rest} />;

    case "exports":
      return <TbWorldShare {...rest} />;

    case "filter":
      return <FaFilter {...rest} />;

    case "home":
      return <MdHome size={size} {...rest} />;

    case "humber":
      return <IoReorderThree size={size} {...rest} />;

    case "image":
      return <MdOutlineImage size={size} {...rest} />;

    case "info":
      return <IoMdInformationCircleOutline {...rest} />;

    case "left-arrow":
      return <FaAngleLeft {...rest} />;

    case "line-hight":
      return <MdOutlineFormatLineSpacing {...rest} />;

    case "menu":
      return <AiOutlineMenu {...rest} />;

    case "money":
      return <PiMoneyFill {...rest} />;

    case "notification":
      return <IoMdNotificationsOutline {...rest} />;

    case "payments":
      return <MdPayments {...rest} />;

    case "right-arrow":
      return <FaAngleRight {...rest} />;

    case "search":
      return <FiSearch {...rest} />;

    case "trending-arrow":
      return <HiArrowTrendingUp size={size} {...rest} />;

    case "test-tube":
      return <RiTestTubeFill {...rest} />;

    case "user":
      return <TbUserFilled size={size} {...rest} />;

    case "users":
      return <FaUserFriends size={size} {...rest} />;

    case "world":
      return <BiWorld {...rest} />;

    default:
      return <AiFillAppstore size={size} {...rest} />;
  }
};

export default Icon;
