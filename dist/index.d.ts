interface Props {
    hasNextPage: Boolean;
    fetchNextPage: () => void;
    threshold?: number;
}
declare const useIntersectionObserver: ({ hasNextPage, fetchNextPage, threshold, }: Props) => import("react").MutableRefObject<HTMLElement | null>;
export default useIntersectionObserver;
