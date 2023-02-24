import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
}

const combinedReducers = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export {store};
export const persistor = persistStore(store);
