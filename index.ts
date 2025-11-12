import { useEffect, useRef } from "react";

interface Props {
  hasNextPage: Boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export const useIntersectionObserver = ({
  hasNextPage,
  fetchNextPage,
  threshold = 0.5,
}: Props) => {
  const observerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return observerRef;
};
