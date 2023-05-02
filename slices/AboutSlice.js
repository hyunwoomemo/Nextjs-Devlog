const { createSlice } = require("@reduxjs/toolkit");


const initialAboutSlice = {
  projectId: '',
}

const AboutSlice = createSlice({
  name: 'AboutSlice',
  initialState: initialAboutSlice,
  reducers: {
    selectId: (state, action) => {
      const idValue = action.payload;

      return {
        projectId: idValue
      }
    }
  }
})

export const { selectId } = AboutSlice.actions;
export default AboutSlice.reducer;