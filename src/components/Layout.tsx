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
// TODO: add social media

export const Layout: FC<LayoutProps> = ({
  children,
  onMenuItemClick,
  menuItems,
  isRevert,
}) => {
  return (
    <div className="bg-black text-secondary text-xs md:text-base lg:text-lg xl:text-3xl scroll-smooth">
      <div
        className={clsx(
          "w-screen h-screen fixed top-0 flex flex-col md:flex-row justify-between px-4 pt-4",
          {
            "text-black": isRevert,
          }
        )}
      >
        <div
          className={clsx(
            "absolute bg-menuGradientDesktop top-0 w-full h-[200px] -z-10 hidden md:block"
          )}
        />
        <div className="font-bold">
          Wing <br />
          Tung <br />
          Shek
        </div>

        <div className="w-full md:w-fit flex gap-3 flex-col mb-4 z-10">
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
            "absolute bg-menuGradient w-full h-[150px] transition-opacity bottom-0 left-0 -z-10 md:hidden",
            { "opacity-0": isRevert }
          )}
        />
      </div>
      <div className="px-16 md:px-28 max-w-[1024px] m-auto">{children}</div>
    </div>
  );
};
