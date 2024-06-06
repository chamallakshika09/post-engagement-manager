import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { Provider } from 'react-redux';
import store from './store';

const PostEngagementManager = lazy(() => import('./pages/PostEngagementManager'));
const PostEngagementBuilder = lazy(() => import('./pages/PostEngagementBuilder'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/post-engagement" replace />,
  },
  {
    path: '/post-engagement',
    element: <PostEngagementManager />,
  },
  {
    path: '/post-engagement/:id',
    element: <PostEngagementBuilder />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
