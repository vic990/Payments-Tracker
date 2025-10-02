import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Compo/auth/AuthProvider";
import router from "./pages";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
