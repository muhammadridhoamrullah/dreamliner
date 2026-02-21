import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
