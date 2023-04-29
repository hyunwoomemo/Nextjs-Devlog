const { createSlice } = require("@reduxjs/toolkit");


const initialFilterSlice = {
  selectedCategory: "",
  selectedTag: "",
  filterOpen: false,
  filterData: [],
  filterCount: 0,
}

const FilterSlice = createSlice({
  name: 'FilterSlice',
  initialState: initialFilterSlice,
  reducers: {
    choiceCategory: (state, action) => {
      const categoryValue = action.payload;
      const tagValue = state.selectedTag;
      const openValue = state.filterOpen;
      const filterValue = state.filterData;
      const countValue = state.filterCount;
      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    },
    choiceTag: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = action.payload ? [...state.selectedTag, action.payload].filter((v) => v !== undefined) : "";
      const openValue = state.filterOpen
      const filterValue = state.filterData;
      const countValue = state.filterCount;

      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    },
    open: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = true
      const filterValue = state.filterData;
      const countValue = state.filterCount;

      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    },
    close: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = false
      const filterValue = state.filterData;
      const countValue = state.filterCount;

      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    },
    MakeFilterData: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = state.filterOpen
      const filterValue = action.payload;
      const countValue = state.filterCount;

      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    },
    CountFilterData: (state, action) => {
      const categoryValue = state.selectedCategory;
      const tagValue = state.selectedTag;
      const openValue = state.filterOpen
      const filterValue = state.filterData;
      const countValue = action.payload;

      return {
        selectedCategory: categoryValue,
        selectedTag: tagValue,
        filterOpen: openValue,
        filterData: filterValue,
        filterCount: countValue
      }
    }
  }
})

export const { choiceCategory, choiceTag, open, close, MakeFilterData, CountFilterData } = FilterSlice.actions;
export default FilterSlice.reducer;