import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container } from '@mantine/core';
import LeaguePage from './pages/League/League.page';
import ListPage from './pages/List/List.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Container h="100vh" p="md">
        <ListPage />
      </Container>
    ),
  },
  {
    path: '/leagues/:id',
    element: (
      <Container h="100vh" p="md">
        <LeaguePage />
      </Container>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
