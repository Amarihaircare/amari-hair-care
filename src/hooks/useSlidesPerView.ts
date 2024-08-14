import { useEffect, useState } from "react";

export default function useSlidePerVIew() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSlidesPerView(4);
      } else if (window.innerWidth > 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1);
      }
    };

    // Initial setting
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return slidesPerView;
}
