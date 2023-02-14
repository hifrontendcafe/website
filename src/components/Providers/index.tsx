'use client';

import { Provider } from 'next-auth/client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
