import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToFav } from "../../store/slices/favSlice";
import { Toaster, toast } from "sonner";

function NewsList({ sliceData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSingleData = (data) => {
    localStorage.setItem("singleData", JSON.stringify(data));
    navigate("/details");
  };

  const handleFav = (data) => {
    dispatch(addToFav(data));
  };

  return (
    <main className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
      {sliceData.map((data, index) => (
        <div
          key={index}
          className="p-4 w-full sm:mb-0 mb-6"
        >
          <div className="rounded-lg h-64 overflow-hidden relative">
            <img
              alt="content"
              className="object-cover object-center h-full w-full cursor-pointer"
              onClick={() => handleSingleData(data)}
              src={data.urlToImage || "https://dummyimage.com/1205x505"}
            />
            <MdFavoriteBorder
              className="absolute top-2 left-2 text-white cursor-pointer p-1 text-4xl bg-[#00000094] rounded-full hover:bg-slate-900 hover:text-5xl transition-all duration-300 ease-out"
              onClick={() => {
                handleFav(data);
                toast.success("News is added to fav...");
              }}
            />
            <Toaster richColors />
          </div>
          <h2
            onClick={() => handleSingleData(data)}
            className="text-xl font-medium title-font mt-5 hover:text-blue-600 cursor-pointer transition-all duration-300 ease-out"
          >
            {data.title}
          </h2>
          <p className="text-base leading-relaxed mt-2">{data.content}</p>
          <Link
            to={data.url}
            target="_blank"
            className="text-indigo-400 inline-flex items-center mt-3"
          >
            More details....
          </Link>
        </div>
      ))}
    </main>
  );
}

export default NewsList;
