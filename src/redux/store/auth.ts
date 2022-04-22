import { UserProfile } from '../types';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean,
  accessToken: string,
  user: UserProfile | null
}

const initialState = {
    isAuthenticated: false,
    accessToken: '',
    user: {},
  }
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true
        state.accessToken = action.payload
      },
      storeUser: (state, action) => {
        state.user = action.payload
      },
      logout: state => {
        state = initialState
      },
    },
  })
  
  export const { login, logout, storeUser } = authSlice.actions
  
  export default authSlice.reducer