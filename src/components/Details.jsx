import React from "react";
import { FaRegHandPointLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Details() {
  const singleData = JSON.parse(localStorage.getItem("singleData"));

  if (!singleData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">No Data Available</h1>
      </div>
    );
  }

  return (
    <section
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${singleData.urlToImage})` }}
    >
      <div className="mx-6 md:mx-28 h-full flex flex-col justify-center bg-black bg-opacity-50 relative">
        <div className="flex flex-col items-center justify-center">
          <img
            src={singleData.urlToImage}
            alt="Content"
            className="w-full h-64 md:h-96 object-cover mb-4 rounded-lg shadow-lg"
          />
          <div className="p-4 bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
            <h2 className="text-2xl font-bold title-font mb-2">
              {singleData.title}
            </h2>
            <p className="mb-4 text-lg">{singleData.description}</p>
            <Link
              to={singleData.url}
              target="_blank"
              className="text-blue-600 text-lg underline"
            >
              Main site...
            </Link>
          </div>
        </div>
        <div className="backBtn text-white absolute text-5xl p-2 top-6 left-5 rounded-xl bg-[#3e4650b8] hover:text-red-300 hover:left-2 transition-all duration-300 ease-out">
          <Link to={"/"}>
            <FaRegHandPointLeft />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Details;
