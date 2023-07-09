import clsx from "clsx";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  onMenuItemClick: (itemId: string) => void;
  menuItems: {
    [key: string]: { id: string; label: string; onClick?: () => void };
  };
  isRevert: boolean;
};

export const Layout: FC<LayoutProps> = ({
  children,
  onMenuItemClick,
  menuItems,
  isRevert,
}) => {
  return (
    <div className="bg-black text-secondary text-xs scroll-smooth">
      <div
        className={clsx(
          "w-screen h-screen fixed top-0 flex flex-col justify-between px-4 pt-4 z-10",
          {
            "text-black": isRevert,
          }
        )}
      >
        <div className="font-bold">
          Wing <br />
          Tung <br />
          Shek
        </div>

        <div className="w-full flex gap-3 flex-col mb-4">
          {Object.entries(menuItems).map(([key, item]) => (
            <button
              key={key}
              className="w-fit"
              onClick={
                item.onClick
                  ? item.onClick
                  : () => onMenuItemClick(item.id.toLowerCase())
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          className={clsx(
            "absolute bg-menuGradient w-full h-[150px] transition-opacity bottom-0 left-0 -z-10",
            { "opacity-0": isRevert }
          )}
        />
      </div>
      {children}
    </div>
  );
};
