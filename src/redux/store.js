import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import signReducer from "./slice/signSlice.js";
import pageReducer from "./slice/pageSlice.js";

const signPersistConfig = {
  key: "local",
  storage: storage,
};

const pagePersistConfig = {
  key: "session",
  storage: storageSession,
};

const persistedSignReducer = persistReducer(signPersistConfig, signReducer);
const persistedPageReducer = persistReducer(pagePersistConfig, pageReducer);

const store = configureStore({
  reducer: {
    sign: persistedSignReducer,
    page: persistedPageReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
