import { WidgetProps } from "@/common/types";
import Card from "../Card";
import Icon from "../Icons";
import { Skeleton } from "primereact/skeleton";

const Widget = ({
  icon,
  title,
  subtitle,
  tips,
  loading = false,
}: WidgetProps) => {
  return (
    <Card className="!flex-row flex-grow items-center rounded-[20px] py-4">
      {loading ? (
        <>
          <Skeleton shape="circle" size="3rem" className="mx-[18px]" />
          <div>
            <Skeleton width="8rem" height="14px" className="mb-2" />
            <Skeleton width="5rem" height="20px" className="mb-2" />
            {tips && <Skeleton height="10px" className="mb-1" />}
          </div>
        </>
      ) : (
        <>
          <div className="ml-[18px] flex w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3">
              <span className="flex items-center text-brand-500">
                <Icon {...icon} />
              </span>
            </div>
          </div>

          <div className="ml-4 flex p-0 w-auto flex-col justify-center text-gray-600">
            <span className="font-dm text-sm font-medium">{title}</span>
            <h4 className="text-xl font-bold text-navy-700">{subtitle}</h4>
            {tips && <span className="text-[10px]">{tips}</span>}
          </div>
        </>
      )}
    </Card>
  );
};

export default Widget;
