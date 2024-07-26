import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import SignUp from "../page/signUp/SignUp";
import App from "../App";
import Home from "../page/home/Home";
import AllUsers from "../dashboard/users/AllUsers";
import AllAgents from "../dashboard/agents/AllAgents";
// import PrivateRoute from "../routes/PrivateRoute";

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
            },
            {
                path : '/home',
                element : <Home></Home>,
                children : [
                    {
                        path : 'all-users',
                        element : <AllUsers></AllUsers>
                    },
                    {
                        path : 'all-agents',
                        element : <AllAgents></AllAgents>
                    }
                ]
            }
        ]
    }
])

export default router;