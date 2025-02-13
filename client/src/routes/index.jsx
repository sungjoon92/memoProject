import { createBrowserRouter } from "react-router-dom";
import MemoList from "../pages/MemoList";
import MemoDetail from "../pages/MemoDetail";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MemoList />,
      },
      {
        path: "memo/:id",
        element: <MemoDetail />,
      },
    ],
  },
]);

export default router;
