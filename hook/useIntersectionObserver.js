import { useEffect } from "react";

export default function useIntersectionObserver(targetRef) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          target.style.opacity = 1;
          target.style.transitionDuration = `1s`;
          console.log(entry.isIntersecting)
        } else {
          target.style.opacity = 0;
        }
      })
    }, options)

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    }
  }, [targetRef])
}