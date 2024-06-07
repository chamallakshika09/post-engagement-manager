import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';

const PostEngagementManager = lazy(() => import('./pages/PostEngagementManager'));
const PostEngagementBuilder = lazy(() => import('./pages/PostEngagementBuilder'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
  {
    path: '*',
    element: (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    ),
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
