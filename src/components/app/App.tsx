import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import AuthorizedUserIdContextProvider from "../authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import ThemeColorContextProvider from "../themeColorContextProvider/ThemeColorContextProvider";
import HeadphonesPageRedirect from "../../redirects/HeadphonesPageRedirect";
import HeadphonesPage from "../../pages/headphones/HeadphonesPage";
import InfoPageContainer from "../../pages/info/InfoPageContainer";
import CartContextProvider from "../cartContextProvider/CartContextProvider";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeColorContextProvider>
        <AuthorizedUserIdContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="headphones" replace />} />
                  <Route path="headphones" element={<HeadphonesPageRedirect />}>
                    <Route path=":headphoneId" element={<HeadphonesPage />}>
                      <Route index element={<Navigate to="info" replace />} />
                      <Route path="info" element={<InfoPageContainer />} />
                      <Route path="reviews" element={null} />
                      <Route
                        path="*"
                        element={<Navigate to="info" replace />}
                      />
                    </Route>
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </AuthorizedUserIdContextProvider>
      </ThemeColorContextProvider>
    </Provider>
  );
}
