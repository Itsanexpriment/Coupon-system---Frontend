import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isAuthenticated: false,
  tokens: null,
  type: null
}

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
  reducers: {
    login(state, action) {
      const payload = action.payload;

      state.isAuthenticated = true;
      state.tokens = payload.tokens;
      state.type = payload.type;
    },
    refreshTokens(state, action) {
      state.tokens = action.payload;
    },
    logout(state) {
      state.isAuthenticated = DEFAULT_STATE.isAuthenticated;
      state.tokens = DEFAULT_STATE.tokens;
      state.type = DEFAULT_STATE.type;
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
