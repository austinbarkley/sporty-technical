import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LeaguePage from './pages/League/League.page';
import ListPage from './pages/List/List.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListPage />,
  },
  {
    path: '/leagues/:id',
    element: <LeaguePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
