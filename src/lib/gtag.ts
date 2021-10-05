export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

import * as ReactGA from 'react-ga';
export class GaService {
  private initialized = false;

  initGA = (): void => {
    ReactGA.initialize(GA_TRACKING_ID);
    this.initialized = true;
  };

  pageView = (url: URL): void => {
    this.initialized && ReactGA.pageview(url.toString());
  };
}

const gaService = new GaService();
export default gaService;
