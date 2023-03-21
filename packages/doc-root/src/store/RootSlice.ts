import { createSlice } from "@reduxjs/toolkit"

const name = "root";
interface RootState
{

}
const initialState: RootState = {

};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {

  }
});

export const rootReducer = rootSlice.reducer;
export const {} = rootSlice.actions;