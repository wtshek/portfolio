import clsx from "clsx";
import { Layout } from "./components/Layout";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "@studio-freight/lenis";
import { useInView } from "react-intersection-observer";
import { ProjectModal, ProjectType } from "./components/ProjectModal";
import {
  menuItems,
  projects,
  slogans,
  socialMedia,
  theMeIWantToShow,
  theRealMe,
} from "./config";

const ABOUT_ME_MASK_IMAGE_MAX_SIZE = 1700;
const ABOUT_ME_MASK_IMAGE_STEP = 10;
const INTERVAL = 0.1;

enum MENU_ITEM_KEYS {
  HOME = "home",
  ABOUT = "about",
  PROJECTS = "projects",
  RESUME = "resume",
}

function App() {
  const isDesktop = window.innerWidth >= 1023;
  const [isRevert, setIsRevert] = useState(false);
  const showTheRealMeRef = useRef(false);
  const [maskSize, setMaskSize] = useState(isDesktop ? 300 : 0);
  const [maskPosition, setMaskPosition] = useState<[number, number]>([
    400, 250,
  ]);
  const lenisRef = useRef(new Lenis());
  const homeContainerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const [homeRef, isHomeInView] = useInView();
  const [projectsRef, isProjectsView] = useInView();
  const theRealMeRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>();

  const toggleAboutMeButton = () => {
    setIsRevert((prev) => !prev);
    showTheRealMeRef.current = !showTheRealMeRef.current;
  };

  useEffect(() => {
    function raf(time: number) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (window && !isDesktop) {
      interval = setInterval(() => {
        setMaskSize((prev) => {
          console.log("settingMaskSize");
          if (showTheRealMeRef.current && prev <= ABOUT_ME_MASK_IMAGE_MAX_SIZE)
            return prev + ABOUT_ME_MASK_IMAGE_STEP;

          if (!showTheRealMeRef.current && prev > 0)
            return prev - ABOUT_ME_MASK_IMAGE_STEP;

          return prev;
        });
      }, INTERVAL);
    }

    return () => clearInterval(interval);
  }, [isDesktop]);

  const onMenuItemClick = (id: string): void => {
    if (id === MENU_ITEM_KEYS.PROJECTS)
      lenisRef.current.scrollTo(projectContainerRef.current);
    else if (id === MENU_ITEM_KEYS.HOME)
      lenisRef.current.scrollTo(homeContainerRef.current);
    else if (id === MENU_ITEM_KEYS.ABOUT)
      lenisRef.current.scrollTo(aboutRef.current);
  };

  const onAboutSectionHover: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (isDesktop) {
        const windowWidth = window.innerWidth;
        const refTop = theRealMeRef.current?.clientWidth as number;
        const padding = (windowWidth - refTop) / 2;
        setMaskPosition([e.clientX - padding, e.clientY - 100]);
      }
    },
    [isDesktop]
  );

  const onProjectClick = (projectKey: string) => () => {
    setIsModalOpen(true);
    setSelectedProject(projects[projectKey]);
  };

  const onModalClose = () => setIsModalOpen(false);

  return (
    <Layout
      onMenuItemClick={onMenuItemClick}
      menuItems={menuItems}
      isRevert={isRevert}
    >
      <section
        className="px-4 h-screen flex justify-center items-center flex-col text-center gap-2"
        id="home"
        ref={homeContainerRef}
      >
        <div ref={homeRef}>
          {slogans.map((sentence, index) => (
            <h1
              key={`slogan-${index}`}
              className="flex flex-col lg:flex-row text-3xl sm:text-5xl lg:text-[5rem] font-bold"
            >
              {sentence.split(" ").map((word, index) => (
                <div
                  key={word}
                  className={clsx({
                    "text-primary opacity-0 -translate-y-5 duration-700 transition-all will-change-transform":
                      index === 0,
                    "!opacity-100 !translate-y-0": index === 0 && isHomeInView,
                    "lg:ml-4": index === 1,
                  })}
                >
                  {word}
                </div>
              ))}
            </h1>
          ))}
        </div>
      </section>
      <section
        className="mt-[48px] h-screen relative flex flex-col justify-center hover:cursor-none"
        id="about"
        ref={aboutRef}
        onMouseMove={onAboutSectionHover}
      >
        <h2 className="px-4 tracking-[8.4px]">ABOUT ME</h2>
        <div
          ref={theRealMeRef}
          className="layer absolute text-black top-0 left-0 bg-primary px-4 flex flex-col justify-center w-full h-full"
          style={{
            ["--size" as string]: `${maskSize}px`,
            ["--x" as string]: `${maskPosition[0]}px`,
            ["--y" as string]: `${maskPosition[1]}px`,
          }}
        >
          <h2 className="tracking-[8.4px]">ABOUT ME</h2>
          <div className="font-bold text-base md:text-2xl lg:text-5xl mt-10 h-auto">
            {theRealMe}
          </div>
        </div>
        <div
          className={
            "font-bold mt-10 text-base md:text-2xl lg:text-5xl px-4 h-auto"
          }
        >
          {theMeIWantToShow}
        </div>
        <button
          className={clsx(
            "mt-4 rounded-lg border-secondary border-2 p-2 mx-4 w-fit z-30 absolute bottom-[25%] lg:hidden",
            {
              "!border-black text-black": isRevert,
            }
          )}
          onClick={toggleAboutMeButton}
        >
          {isRevert ? "The Me I Want to Show" : "The Real Me?"}
        </button>
      </section>

      <section
        className="mt-[48px] h-screen px-4 flex flex-col justify-center"
        id="project"
        ref={projectContainerRef}
      >
        <h2 className="tracking-[8.4px]" ref={projectsRef}>
          PROJECTS
        </h2>
        <div className="flex flex-col gap-2 mt-4">
          {Object.values(projects).map(
            (project: ProjectType, index: number) => (
              <button
                key={project.projectName}
                onClick={onProjectClick(project.id)}
                className={clsx(
                  "text-left p-2 text-primary bg-secondary clip-path-trapezoid font-bold text-base md:text-2xl xl:text-3xl -scale-x-0 transition-transform duration-700 origin-left",
                  {
                    "w-full": index === 0,
                    "w-[85%]": index === 1,
                    "w-[70%]": index === 2,
                    "scale-x-100": isProjectsView,
                  }
                )}
              >
                {project.projectName}
              </button>
            )
          )}
        </div>
      </section>
      <section className="h-screen px-4 flex flex-col justify-center">
        <h2 className="tracking-[8.4px]">MY MOTTO</h2>
        <div className="text-3xl lg:text-5xl font-bold mt-7">
          Be Just <span className="text-primary">Good Enough</span> So We Can
          Focus On The <span className="text-primary">Importance</span>
        </div>
      </section>
      <section className="h-screen px-4 flex flex-col justify-center">
        <h2 className="tracking-[8.4px]">LET'S CONNECT</h2>
        <div className="flex flex-col mt-7 font-bold text-3xl lg:text-5xl gap-2">
          {socialMedia.map((contact) => (
            <a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.label}
            </a>
          ))}
        </div>
      </section>
      {/* modal */}
      <div
        className={clsx("fixed z-50 w-screen h-screen top-0 left-0", {
          invisible: !isModalOpen,
        })}
        onClick={onModalClose}
      >
        <ProjectModal project={selectedProject} />
      </div>
    </Layout>
  );
}

export default App;
