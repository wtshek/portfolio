import clsx from "clsx";
import { FC, ReactNode } from "react";
import { socialMedia } from "../config";

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
    <div className="bg-black text-secondary text-xs md:text-base lg:text-lg xl:text-3xl scroll-smooth">
      <div
        className={clsx(
          "w-screen fixed top-0 flex flex-col md:flex-row justify-between px-4 pt-4 z-10",
          {
            "text-black": isRevert,
          }
        )}
      >
        <div
          className={clsx(
            "absolute bg-menuGradientDesktop top-0 w-full h-[150px] -z-10"
          )}
        />
        <div className="font-bold">
          Wing <br />
          Tung <br />
          Shek
        </div>
        <div className="hidden lg:flex gap-3 flex-col mb-4">
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
      </div>
      <div className="lg:px-48">{children}</div>
      <div className="fixed bottom-0 w-full md:w-fit p-4">
        <div
          className={clsx("flex gap-3 flex-col mb-4 lg:hidden", {
            "text-black": isRevert,
          })}
        >
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

        <div className="hidden lg:flex gap-8 flex-col mb-4">
          {socialMedia.map((contact) => {
            const { link, id, Component } = contact;
            return (
              <a href={link} key={id} target="_blank" rel="noopener noreferrer">
                <Component />
              </a>
            );
          })}
        </div>
        <div
          className={clsx(
            "absolute bg-menuGradient w-full h-[150px] transition-opacity bottom-0 left-0 -z-10",
            { "!opacity-0": isRevert }
          )}
        />
      </div>
    </div>
  );
};
