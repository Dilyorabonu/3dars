import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  completed: 0,
  unCompleted: 0,
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: () => {},
    removeTodo: () => {},
    changeTodoStatus: () => {},
    calculateTotal: () => {},
    setSelectedTodo: (state, { payload }) => {
      state.selectedTodo = payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  changeTodoStatus,
  calculateTotal,
  setSelectedTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
