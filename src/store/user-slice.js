import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isAuthenticated: false,
  tokens: { accessToken: null, refreshToken: null },
  type: null
}

const TOKENS = "tokens";

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
  reducers: {
    login(state, action) {
      const payload = action.payload;

      console.log(payload);

      state.isAuthenticated = true;
      state.tokens = payload.tokens;
      state.type = payload.type;

      localStorage.setItem(TOKENS, JSON.stringify(payload.tokens))
    },
    logout(state) {
      state = DEFAULT_STATE;
      // localStorage.removeItem(TOKENS);
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
