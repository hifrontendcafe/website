import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import type { GlobalProvider } from '@ladle/react';

export const Provider: GlobalProvider = ({ children }) => (
  <>
    <div className="bg-zinc-900">
      <div id="container" className="container relative pt-12 mx-auto">
        {children}
      </div>
    </div>
  </>
);
