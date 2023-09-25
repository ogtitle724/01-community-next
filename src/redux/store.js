import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import signReducer from "./slice/signSlice.js";
import pageReducer from "./slice/pageSlice.js";
import chatReducer from "./slice/chatSlice.js";

const signPersistConfig = {
  key: "local",
  storage: storage,
};

const pagePersistConfig = {
  key: "session",
  storage: storageSession,
};

const chatPersistConfig = {
  key: "session",
  storage: storageSession,
};

const persistedSignReducer = persistReducer(signPersistConfig, signReducer);
const persistedPageReducer = persistReducer(pagePersistConfig, pageReducer);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

const store = configureStore({
  reducer: {
    sign: persistedSignReducer,
    page: persistedPageReducer,
    chat: persistedChatReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
