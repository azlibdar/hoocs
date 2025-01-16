import { useLayoutEffect, useState } from "react";

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState({
    isMobileSize: false,
    isTabletSize: false,
    isDesktopSize: false,
  });

  useLayoutEffect(() => {
    const handleWindowSize = () => {
      setDeviceSize({
        isMobileSize: window.innerWidth < 768,
        isTabletSize: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktopSize: window.innerWidth >= 1024,
      });
    };

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return deviceSize;
};

export default useDeviceSize;
