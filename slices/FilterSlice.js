const { createSlice } = require("@reduxjs/toolkit");


const initialFilterSlice = {
  selectedCategory: "",
  selectedTag: "",
  filterOpen: false,
}

const FilterSlice = createSlice({
  name: 'FilterSlice',
  initialState: initialFilterSlice,
  reducers: {
    choiceCategory: (state, action) => {
      const categoryValue = action.payload;
      const tagValue = state.selectedTag;
      const openValue = state.filterOpen
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue
      }
    },
    choiceTag: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = action.payload ? [...state.selectedTag, action.payload].filter((v) => v !== undefined) : "";
      const openValue = state.filterOpen
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue
      }
    },
    open: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = true
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue
      }
    },
    close: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = false
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue
      }
    }
  }
})

export const { choiceCategory, choiceTag, open, close } = FilterSlice.actions;
export default FilterSlice.reducer;