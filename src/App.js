import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
// import { Home, FormAntDesign, HeatMap } from "./pages";
import { Home, FormAntDesign, HeatMap } from "pages";
import "./App.css";

const dataNavigation = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/ant",
    name: "Ant Design",
  },
  {
    path: "/heatmap",
    name: "Heat Map",
  },
];

function App() {
  const Layout = () => {
    return (
      <div className="layout">
        <header className="header">
          Header
          <div className="navigation">
            {dataNavigation.map((item) => (
              <button key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </button>
            ))}
          </div>
        </header>
        <Outlet />
        <footer className="footer">Footer</footer>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/ant",
          element: <FormAntDesign />,
        },
        {
          path: "/heatmap",
          element: <HeatMap />,
        },
      ],
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
