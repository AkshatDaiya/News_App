import { useEffect } from "react";

export function infinitiScroll(filterData, setSliceData) {
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setSliceData((prevDisplayedData) => [
        ...prevDisplayedData,
        ...filterData.slice(
          prevDisplayedData.length,
          prevDisplayedData.length + 10
        ),
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [filterData]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [filterData]);
}
