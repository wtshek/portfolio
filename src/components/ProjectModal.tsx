import clsx from "clsx";
import { FC } from "react";

export type ProjectType = {
  id: string;
  projectName: string;
  about: string;
  challenge?: string;
  stack?: string[];
  github?: string;
  liveSite?: string;
};

type ProjectModalProps = {
  project?: ProjectType;
};

export const ProjectModal: FC<ProjectModalProps> = ({ project }) => {
  const { projectName, about, challenge, stack, github, liveSite } =
    project || {};
  return (
    <>
      <div
        className={clsx(
          "absolute p-4 w-4/5 bg-black bg-projectModal shadow-[0_4px_24px_-1px_rgba(0, 0, 0, 0.25)] border-2 border-secondary m-auto h-4/5 rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] overflow-scroll"
        )}
      >
        <h2 className="font-bold text-2xl">{projectName}</h2>
        <div className="mt-8">
          <div>About the Project</div>
          <div className="mt-4">{about}</div>
          {challenge && (
            <>
              <div className="mt-8">The Challenge</div>
              <div className="mt-4">{challenge}</div>
            </>
          )}
          {stack && <div className="mt-8">Built with: {stack?.join(" ,")}</div>}
          <div className="mt-8">
            {github && (
              <a href={github} className="underline">
                Github
              </a>
            )}
            {liveSite && (
              <a href={liveSite} className="underline ml-4">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
