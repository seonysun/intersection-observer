# @seonysun/intersection-observer

React 환경에서 안정적이고 중복 없는 무한 스크롤을 구현하기 위한 IntersectionObserver 기반 커스텀 훅입니다.
`IntersectionObserver` API를 간단한 형태로 래핑하여, 특정 요소가 뷰포트에 등장하면 자동으로 다음 데이터를 불러올 수 있도록 도와줍니다.

---

## 개발 배경

React에서 무한 스크롤을 구현할 때, 프로젝트마다 재사용되는 IntersectionObserver 관련 로직을 매번 직접 구현해야 하는 문제가 있었습니다.
의미없는 중복 구현을 줄이고, 일관된 방식으로 재사용할 수 있도록 범용적인 라이브러리를 제작했습니다.

---

## 설계 포인트

1. Observer 생명주기 자동 관리
 - 훅 내부에서 IntersectionObserver 생성
 - useEffect의 cleanup 함수에서 unobserve를 확실히 호출하여 컴포넌트 언마운트 시 메모리 누수 방지

2. 중복 API 요청 방지 로직 내장
 - !isFetchingNextPage 조건을 내부에서 체크
 - 이미 데이터를 불러오는 중일 때는 fetchNextPage 호출 차단

3. React Query 무한 쿼리와 자연스럽게 연동
 - hasNextPage, isFetchingNextPage, fetchNextPage만 전달하면 추가 조건 분기 없이 안전하게 무한 스크롤 구현 가능
   
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
