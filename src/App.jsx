import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import ErrorPage from "./ui/ErrorPage";
import { Provider } from "react-redux";
import store from "./store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./user/auth/SignIn";
import SignUp from "./user/auth/SignUp";
import FriendTestPage from "./friends/FriendTestPage";
import UserNotifications from "./notifications/UserNotifications";
import ProfilePage from "./user/userProfile/ProfilePage";
import PostView from "./posts/PostView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/notifications",
        element: <UserNotifications />,
      },
      {
        path: "/add-friend",
        element: <FriendTestPage />,
      },
      {
        path: "/post/:postId",
        element: <PostView />
      }
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
