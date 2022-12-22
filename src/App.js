import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  const Layout = () => {
    return (
      <div className="layout">
        <header className="header">Header</header>
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
          path: "/Test",
          element: <div>Test</div>,
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
