import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./slices/FilterSlice";

const store = configureStore({
  reducer: {
    FilterSlice: FilterSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;