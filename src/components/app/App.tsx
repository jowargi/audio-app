import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import AuthorizedUserIdContextProvider from "../authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import ThemeColorContextProvider from "../themeColorContextProvider/ThemeColorContextProvider";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeColorContextProvider>
        <AuthorizedUserIdContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthorizedUserIdContextProvider>
      </ThemeColorContextProvider>
    </Provider>
  );
}
