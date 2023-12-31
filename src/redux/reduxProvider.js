"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { logout, setUser, setLoginDeadline } from "./slice/signSlice";
import { setWidth } from "./slice/pageSlice";

export default function ReduxProvider({ children }) {
  const handleInitialSetting = () => {
    const states = store.getState();
    const loginDeadline = states.sign.loginDeadline;
    const now = new Date();

    if (new Date(loginDeadline) <= now) {
      store.dispatch(logout());
      store.dispatch(setUser({ user: null }));
      store.dispatch(setLoginDeadline({ deadline: null }));
    }

    //set eventlistener for browser width
    store.dispatch(setWidth(window.innerWidth));
    window.addEventListener("resize", () =>
      store.dispatch(setWidth(window.innerWidth))
    );
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={handleInitialSetting}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
