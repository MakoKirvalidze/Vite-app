import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Task ინტერფეისი
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Task-ის საწყისი მდგომარეობა
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// ასინქრონული მოქმედება - ახალი დავალების დამატება 1 წამიანი დაყოვნებით
export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (title: string) => {
    return new Promise<{ id: string; title: string; completed: boolean }>((resolve) =>
      setTimeout(() => {
        resolve({
          id: new Date().toISOString(),
          title,
          completed: false,
        });
      }, 1000)
    );
  }
);

// Task slice-ის შექმნა
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // დავალების დამატება (სინქრონულად)
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    // დავალების სტატუსის შეცვლა (დასრულებული/დაუმთავრებელი)
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // დავალების წაშლა
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
  // ასინქრონული მოქმედების დამუშავება
  extraReducers: (builder) => {
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
  },
});

// Action-ების ექსპორტი
export const { addTask, toggleTask, removeTask } = taskSlice.actions;

// Reducer-ის ექსპორტი
export default taskSlice.reducer;
