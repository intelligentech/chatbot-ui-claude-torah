import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-700 py-2 px-8 items-center sm:justify-between justify-center">
      </div>
      <div className="text-center px-4 py-2">
        <p className="italic text-[20px] text-black">
          Important note: This is a simulation based on Torah sources. It should not be relied upon for practical religious law or as a substitute for qualified rabbinic counsel.
        </p>
      </div>
    </div>
  );
};
