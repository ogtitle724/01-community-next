"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { logout, setUser, setLoginDeadline } from "./slice/signSlice";
import { setWidth } from "./slice/pageSlice";

export default function ReduxProvider({ children }) {
  //css color-theme setting => using redux state makes an mismatch error when initial rendering
  const handleInitialSetting = () => {
    const root = document.documentElement;

    //set dark mode
    let states = store.getState();
    let isDarkMode = states.sign.isDarkMode;
    root.setAttribute("color-theme", isDarkMode ? "dark" : "light");

    //check whether the login state expired or not
    let loginDeadline = states.sign.loginDeadline;

    let now = new Date();

    if (new Date(loginDeadline) <= now) {
      store.dispatch(logout());
      store.dispatch(setUser({ user: null }));
      store.dispatch(setLoginDeadline({ deadline: null }));
    }

    //set eventlistener for browser width
    store.dispatch(setWidth({ width: window.innerWidth }));
    window.addEventListener("resize", () =>
      store.dispatch(setWidth({ width: window.innerWidth }))
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
