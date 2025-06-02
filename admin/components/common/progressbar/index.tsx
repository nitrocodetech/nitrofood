import React from "react";

interface ProgressbarProps {
  step: number;
  data: string[];
}

const Progressbar: React.FC<ProgressbarProps> = ({ step, data }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-between w-full max-w-3xl gap-4">
        {data.map((label, index) => {
          const isActive = index <= step;
          const isCompleted = index < step;

          return (
            <div
              key={index}
              className="flex flex-col items-center  w-full relative"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10
                ${isActive ? "border-(--darkprimary)" : "border-gray-300"}
              `}
              >
                <div
                  className={`w-4 h-4 rounded-full
                  ${isActive ? "bg-(--darkprimary)" : "bg-white"}
                `}
                />
              </div>

              {/* Label */}
              <div className="mt-4 text-sm text-center w-24">
                <span
                  className={`font-display ${
                    isActive
                      ? "text-black font-medium"
                      : "text-(--borderstroke)"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Line */}
              {index < data.length - 1 && (
                <div
                  className={`absolute top-5 right-[-50%] w-full h-[3px] z-0
                  ${isCompleted ? "bg-(--darkprimary)" : "bg-gray-300"}
                `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progressbar;
