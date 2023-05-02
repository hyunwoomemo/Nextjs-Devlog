import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./slices/FilterSlice";
import ProjectSlice from "./slices/ProjectSlice";
import AboutSlice from "./slices/AboutSlice";

const store = configureStore({
  reducer: {
    FilterSlice: FilterSlice,
    ProjectSlice: ProjectSlice,
    AboutSlice: AboutSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;