import resume from "./assets/Software_Engineer_CV.pdf";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { ProjectType } from "./components/ProjectModal";

export const slogans = [
  "Crafting Dreams",
  "Developing Visions",
  "Inspiring Growth",
];

export const theMeIWantToShow = ` A skilled software engineer with a passion to create product that
brings excellent UI/UX and write code that is clean, efficient and
scalable. Believe that everyone is a creator and able to make
something impactful.`;

export const theRealMe =
  "A software developer driven by the fear of being replaced by AI. Eager to build her own business, so she has diverse income stream.  Eager to plan ahead, so she can become anti-fragile";

export const socialMedia = [
  {
    id: "linkedIn",
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/wing-tung-shek/",
    Component: BsLinkedin,
  },
  {
    id: "github",
    label: "GitHub",
    link: "https://github.com/wtshek",
    Component: BsGithub,
  },
  {
    id: "ig",
    label: "Instagram",
    link: "https://www.instagram.com/w.t.shek/",
    Component: BsInstagram,
  },
];

export const projects: { [key: string]: ProjectType } = {
  portfolio: {
    id: "portfolio",
    projectName: "Portfolio",
    about:
      "It is the project that you are browsing right now! I don't know how many portfolio I have built already but none of them can make me satisfied, until this one. It is not perfect, but it is good enough! The design of the portfolio is inspired by Minh Pham. Upcoming features include dark mode and perhaps i18n. CMS is also an option.",
    challenge:
      "The biggest challenge of making a portfolio is the design. I couldn't make one that I can satisfied, so I learn UI/UX myself!",
    stack: ["Typescript", "React", "Tailwindcss", "Vite"],
    github: "https://github.com/wtshek/portfolio",
  },
  blog: {
    id: "blog",
    projectName: "My Blog",
    about:
      "My other blog that I publish my learning and my experience. It mainly focus on what I learn during reading.",
    challenge:
      "Integrating notion as the CMS is the biggest, but the most stupid challenge. It has a library for it. But I didn't know and spent days to make my own library... Lesson learnt is do your research",
    stack: ["Typescript", "NextJS", "Tailwindcss"],
    github: "https://github.com/wtshek/blog",
    liveSite: "https://www.wingtungshek.com/",
  },
  thePersonStory: {
    id: "thePersonStory",
    projectName: "The Person Story",
    about:
      "Coming Soon! It would be an app that allow people to publish their own story, especially their story on becoming entrepreneur. The stories will be categorised geographically, so the reader can know what it looks like to do business in that area",
  },
};

export const menuItems = {
  home: {
    id: "home",
    label: "HOME",
  },
  about: {
    id: "about",
    label: "ABOUT",
  },
  projects: {
    id: "projects",
    label: "PROJECTS",
  },
  resume: {
    id: "resume",
    label: "RESUME",
    onClick: () => {
      window.open(resume);
    }, //TODO: attach resume
  },
};
