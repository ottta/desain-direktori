import { useScrollInfo } from "@faceless-ui/scroll-info";
import { useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function useDynamicSticky() {
  const [isSticky, setIsSticky] = useState(false);

  const { ref } = useIntersectionObserver({
    threshold: 1,
    rootMargin: "-1px 0px 100px 0px",
    onChange: (e, entry) => {
      const stick =
        entry.boundingClientRect.top <= 1 && entry.intersectionRatio < 1;
      setIsSticky(stick);
    },
  });

  const scrollInfo = useScrollInfo();
  const isScrollDown =
    scrollInfo.hasScrolled &&
    scrollInfo.y > 1 &&
    scrollInfo.yDirection === "down";

  const active = isSticky && isScrollDown;

  return { ref, isSticky, isScrollDown, active };
}
