import { useEffect, useRef } from "react";

interface Props {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export const useIntersectionObserver = ({
  hasNextPage,
  fetchNextPage,
  threshold = 0.5,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  return observerRef;
};
