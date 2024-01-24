interface NoRecordProps {
  className?: string;
  message?: string;
}

const NoRecord = ({
  className,
  message = "No records found",
}: NoRecordProps) => {
  return (
    <div
      className={`${
        className ? className : "h-[57vh]"
      } mx-auto flex items-center justify-center`}
    >
      <span className="rounded-xl border-2 border-solid p-4">{message}</span>
    </div>
  );
};

export default NoRecord;
