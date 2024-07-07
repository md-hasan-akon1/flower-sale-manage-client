import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export type TUser={
  email: string;
  exp: number;
  name:string,
  iat: number;
  role: string;
  username: string;
}
type TInitialState = {
  user: TUser|null;
  token: string|null;
};
const initialState: TInitialState = {
 user:null,
  token:null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
        setUser:(state,action)=>{
               
                state.user=action.payload.user
                state.token=action.payload.token
               
        },
        Logout:(state)=>{
          state.user=null
          state.token=null
        }
  },
});
export const getCurrenToken=(state:RootState)=>state.user.token
export const getCurrenUser=(state:RootState)=>state.user.user
export const {setUser,Logout}=userSlice.actions
export default userSlice.reducer