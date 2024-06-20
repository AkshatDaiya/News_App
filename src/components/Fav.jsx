import React from "react";
import Navbar from "./partials/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { removeFromFav } from "../store/slices/favSlice";
import { Toaster, toast } from "sonner";

function Fav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favData = useSelector((state) => state.favNews);

  const handleSingleData = (data) => {
    localStorage.setItem("singleData", JSON.stringify(data));
    navigate("/details");
  };

  const handleFavDelete = (url) => {
    dispatch(removeFromFav(url));
  };

  return (
    <section>
      <Navbar />

      {favData.length > 0 ? (
        <main className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-16">
          {favData.map((data, index) => (
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
                <RxCross1
                  className="absolute top-2 left-2 text-white cursor-pointer p-1 text-4xl bg-[#00000094] rounded-full hover:bg-slate-900 hover:text-5xl transition-all duration-300 ease-out"
                  onClick={() => {
                    handleFavDelete(data.url);
                    toast.error("News is removed from fav...");
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
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <h1 className="text-gray-400 text-6xl text-center ">
            Favorite section is empty!
          </h1>
        </div>
      )}
    </section>
  );
}

export default Fav;
