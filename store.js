import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./slices/FilterSlice";
import ProjectSlice from "./slices/ProjectSlice";

const store = configureStore({
  reducer: {
    FilterSlice: FilterSlice,
    ProjectSlice: ProjectSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;