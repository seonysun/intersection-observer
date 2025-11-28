# @seonysun/intersection-observer

React 환경에서 무한 스크롤을 구현할 때 유용한 `useIntersectionObserver` 훅입니다.
`IntersectionObserver` API를 간단한 형태로 래핑하여, 특정 요소가 뷰포트에 등장하면 자동으로 다음 데이터를 불러올 수 있도록 도와줍니다.

---

## 설치

```bash
npm install @seonysun/intersection-observer
# 또는
yarn add @seonysun/intersection-observer
```

---

## 사용 방법

```tsx
import { useIntersectionObserver } from "@seonysun/intersection-observer";

const MyComponent = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyInfiniteQuery();

  const observerRef = useIntersectionObserver({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 0.5, // 기본값 0.5
  });

  return (
    <div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}

      {/* 관찰 대상 요소 */}
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
};
```
### 반환값 `ref: React.RefObject<HTMLDivElement>`
관찰할 대상 요소에 연결하면 됩니다.

---

## options

| 옵션                   | 타입         | 설명                                  |
| -------------------- | ---------- | ----------------------------------- |
| `hasNextPage`        | boolean    | 다음 페이지가 존재할 때 `true`                |
| `isFetchingNextPage` | boolean    | 다음 페이지를 불러오는 중인지 여부                 |
| `fetchNextPage`      | () => void | 요소가 보이면 호출되는 함수                     |
| `threshold`          | number     | 요소가 어느 정도 보여야 콜백이 실행될지 결정 (기본값 0.5) |
