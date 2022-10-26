import { createSlice, configureStore } from "@reduxjs/toolkit";
import { FaEdit } from "react-icons/fa";

const initialTestState = {
  test: [],
  editest:[],
};
const testSlice = createSlice({
  name: "test",
  initialState: initialTestState,
  reducers: {
    add(state, action) {
      const newTest = action.payload;
      let { Questions } = newTest;
      state.test.push({
        Statement: Questions.Statement,
        testOption: Questions.testOption,
        option1: Questions.option1,
        option2: Questions.option2,
        option3: Questions.option3,
        option4: Questions.option4,
        answer: Questions.answer,
      });
    },
    delete(state, action) {
      const deleteTest = action.payload;
      let { testQuestion } = deleteTest;
      state.test = state.test.filter(
        (item) => item.Statement !== testQuestion.Statement
      );
    },
    edit(state,action){
        const read=action.payload;
        let {editTest}=read;
        let {row}=read;
        const existingTest = state.test.findIndex(
            (tests) => tests.Statement === row.Statement
          );
          
       state.filter=state.test.filter(
          (item,index) => {
           if( index===existingTest)
          { item.Statement=editTest.Statement_;
            item.answer=editTest.answer_;
            item.option1=editTest.option1_;
            item.option2=editTest.option2_;
            item.option3=editTest.option3_;
            item.option4=editTest.option4_;
            item.testOption=editTest.testOption_
          }}
        );
       
    }
  },
});

const store = configureStore({
  reducer: testSlice.reducer,
});
export const testActions = testSlice.actions;
export default store;
