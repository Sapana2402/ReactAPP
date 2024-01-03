import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  data: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    addNote: (state, action) => {
      const obj = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        text: action.payload,
      };
      state.data.push(obj);
    },
    removeNote: (state, action) => {
      let updatedData = state.data.filter(item => {
        return item.id !== action.payload;
      });
      state.data = updatedData;
    },
    updateNotes: (state, action) => {
      let updatedData = state.data.filter(item => {
        if (item.id === action.payload.id) {
          return (item.text = action.payload.text);
        }
      });
      state.data = updatedData;
    },
  },
});

export const {increment, decrement, addNote, removeNote, updateNotes} =
  counterSlice.actions;
export default counterSlice.reducer;
