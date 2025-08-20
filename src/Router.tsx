import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import ListPage from './pages/List/List.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
