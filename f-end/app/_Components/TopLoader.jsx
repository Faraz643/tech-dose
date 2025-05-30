'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'; // default styles
import '../styles/nprogress.css';  // your custom styles

NProgress.configure({ showSpinner: false });

const TopLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Wait for a short time to simulate loading
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // adjust for smoother experience

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default TopLoader;
