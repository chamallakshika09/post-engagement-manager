import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
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
    element: (
      <Suspense fallback={null}>
        <PostEngagementManager />
      </Suspense>
    ),
  },
  {
    path: '/post-engagement/:id',
    element: (
      <Suspense fallback={null}>
        <PostEngagementBuilder />
      </Suspense>
    ),
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
