import { useEffect, useRef } from "react";
const useIntersectionObserver = ({ hasNextPage, fetchNextPage, threshold = 0.5, }) => {
    const observerRef = useRef(null);
    useEffect(() => {
        if (!hasNextPage)
            return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        }, { threshold });
        if (observerRef.current)
            observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);
    return observerRef;
};
export default useIntersectionObserver;
