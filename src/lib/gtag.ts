export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;

import * as ReactGA from 'react-ga';
export class GaService {
  private initialized = false;

  initGA = (): void => {
    ReactGA.initialize(GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.initialized = true;
  };

  pageView = (url: URL | string): void => {
    this.initialized && ReactGA.pageview(url.toString());
  };
}

const gaService = new GaService();
export default gaService;
