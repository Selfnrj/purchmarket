import ReactGA from "react-ga";

const TRACKING_ID = process.env.GA_TRACKING_ID || "";

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
