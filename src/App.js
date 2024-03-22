import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import NavBar from "./components/Navbar";
import store from "./redux/store";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResultContainer from "./components/SearchResultContainer";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <SearchResultContainer />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="font-customFont">
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
