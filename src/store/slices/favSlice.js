import { createSlice } from "@reduxjs/toolkit";

const news =
  localStorage.getItem("favNews") !== null
    ? JSON.parse(localStorage.getItem("favNews"))
    : [];

const initialState = {
  favNews: news,
};

export const favSlice = createSlice({
  name: "favSlice",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.favNews.findIndex(
        (item) => item.url === action.payload.url
      );
      if (existingItemIndex === -1) {
        state.favNews.push({
          title: newItem.title,
          url: newItem.url,
          urlToImage: newItem.urlToImage,
          content: newItem.content,
          description: newItem.description,
          publishedAt: newItem.publishedAt,
        });
      }

      localStorage.setItem("favNews", JSON.stringify(state.favNews));
    },

    removeFromFav: (state, action) => {
      let favData = JSON.parse(localStorage.getItem("favNews"));

      const indexToRemove = favData.findIndex(
        (item) => item.url === action.payload
      );

      if (indexToRemove !== -1) {
        favData.splice(indexToRemove, 1);
        localStorage.setItem("favNews", JSON.stringify(favData));
      }

      state.favNews = favData;
    },
  },
});

export const { addToFav, removeFromFav } = favSlice.actions;
export default favSlice.reducer;
