const { createSlice } = require("@reduxjs/toolkit");


const initialProjectSlice = {
  displayStatus: 'all',
}

const ProjectSlice = createSlice({
  name: 'ProjectSlice',
  initialState: initialProjectSlice,
  reducers: {
    changeStatus: (state, action) => {
      const statusValue = action.payload;

      return {
        displayStatus: statusValue
      }
    }
  }
})

export const { changeStatus } = ProjectSlice.actions;
export default ProjectSlice.reducer;