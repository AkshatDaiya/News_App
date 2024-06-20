import React, { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import axios from "axios";
import NewsList from "./partials/NewsList";
import { infinitiScroll } from "./partials/InfiniteScroll";

function News() {
  const [filterData, setFilterData] = useState([]);
  const [sliceData, setSliceData] = useState([]);
  const [searchingFor, setSearchingFor] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sortBy, setSortBy] = useState("");
  infinitiScroll(filterData, setSliceData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchingFor);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchingFor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = debouncedValue ? debouncedValue : "top-headlines";
        const category = sortBy ? sortBy : "";
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${
            category ? category : query
          }&apiKey=e0aab4bceaa64708b3f2ea43630136b1`
        );
        const fetchedData = response.data.articles;
        setFilterData(
          fetchedData.filter((data) => data.content !== "[Removed]")
        );
        localStorage.setItem("allData", JSON.stringify(fetchedData));
      } catch (error) {
        setErrorMessage("Error fetching data:", error.response.data.message);
      }
    };

    fetchData();
  }, [debouncedValue, sortBy]);

  useEffect(() => {
    if (filterData.length > 0) {
      setSliceData(filterData.slice(0, 18));
    }
  }, [filterData]);

  return (
    <section>
      <header>
        <Navbar
          searchingFor={searchingFor}
          setSearchingFor={setSearchingFor}
        />
      </header>
      <div className="p-3 w-fit text-lg mt-16">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="top-headlines">Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      {filterData.length > 0 ? (
        <NewsList sliceData={sliceData} />
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          {errorMessage.length > 0 ? (
            <h1 className="text-3xl font-bold">{errorMessage}</h1>
          ) : (
            <h1 className="text-3xl font-bold">LOADING...</h1>
          )}
        </div>
      )}
    </section>
  );
}

export default News;
