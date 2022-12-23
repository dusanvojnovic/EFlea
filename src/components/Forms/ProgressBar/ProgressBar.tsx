import React from "react";

interface ProgressBarProps {
  completed: number;
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  completed,
}) => {
  return (
    <div className="flex h-1 w-full items-center rounded-2xl bg-gray">
      <div
        className="transition-width flex h-8 items-center  justify-center rounded-2xl bg-red duration-1000"
        style={{ width: `${completed}%` }}
      >
        <span className="text-white">{`${completed} %`}</span>
      </div>
    </div>
  );
};
