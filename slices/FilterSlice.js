const { createSlice } = require("@reduxjs/toolkit");


const initialFilterSlice = {
  selectedCategory: "",
  selectedTag: ""
}

const FilterSlice = createSlice({
  name: 'FilterSlice',
  initialState: initialFilterSlice,
  reducers: {
    choiceCategory: (state, action) => {
      const categoryValue = action.payload;
      const tagValue = state.selectedTag;
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
      }
    },
    choiceTag: (state, action) => {

      const categoryValue = state.selectedCategory;
      const tagValue = action.payload ? [...state.selectedTag, action.payload].filter((v) => v !== undefined) : "";
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue
      }
    },
  }
})

export const { choiceCategory, choiceTag } = FilterSlice.actions;
export default FilterSlice.reducer;