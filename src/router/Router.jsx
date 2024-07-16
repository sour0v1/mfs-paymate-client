import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import SignUp from "../page/signUp/SignUp";
import App from "../App";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App></App>,
        children : [
            {
                path : '/',
                element : <Login></Login>
            },
            {
                path : '/sign-up',
                element : <SignUp></SignUp>
            }
        ]
    }
])

export default router;