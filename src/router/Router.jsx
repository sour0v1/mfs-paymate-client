import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Login></Login>
    }
])

export default router;