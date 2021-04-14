import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchState } from './state'

export const initialSearchState: SearchState = {
  tel: "",
  ten_kh: "",
  so_ct: ""
}

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setSearchOrder: (state: SearchState, action: PayloadAction<{ tel: string; ten_kh: string; so_ct: string; }>) => ({
      ...state,
      tel: action.payload.tel,
      ten_kh: action.payload.ten_kh,
      so_ct: action.payload.so_ct
    })
  }
})

export const { setSearchOrder } = searchSlice.actions

export default searchSlice.reducer