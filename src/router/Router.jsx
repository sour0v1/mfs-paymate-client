import { createBrowserRouter } from "react-router-dom";
import Login from "../page/login/Login";
import SignUp from "../page/signUp/SignUp";
import App from "../App";
import Home from "../page/home/Home";
import SendMoney from "../dashboard/users/sendMoney/SendMoney";
// import ConfirmSendMoney from "../dashboard/users/ConfirmSendMoney";
// import CheckNumber from "../dashboard/users/CheckNumber";
import UserTransactions from "../dashboard/users/userTransactions/UserTransactions";
import SendHistory from "../dashboard/users/userTransactions/SendHistory";
import RecieveHistory from "../dashboard/users/userTransactions/RecieveHistory";
import AllAgents from "../dashboard/admin/AllAgents";
import AllUsers from "../dashboard/admin/AllUsers";
import ConfirmSendMoney from "../dashboard/users/sendMoney/ConfirmSendMoney";
import CashIn from "../dashboard/users/cashIn/CashIn";
import CheckUser from "../dashboard/users/sendMoney/CheckUser";
import CheckAgent from "../dashboard/users/cashIn/CheckAgent";
import ConfirmCashIn from "../dashboard/users/cashIn/ConfirmCashIn";
import CashInHistory from "../dashboard/users/userTransactions/CashInHistory";
import CashInRequest from "../dashboard/agents/CashInRequest";
import AgentTransactions from "../dashboard/agents/agentTransactions/AgentTransactions";
import AgentCashIInHistory from "../dashboard/agents/agentTransactions/AgentCashIInHistory";
import AgentCashoutHistory from "../dashboard/agents/agentTransactions/AgentCashoutHistory";
import CashOut from "../dashboard/users/cashOut/CashOut";
import CheckAgentNo from "../dashboard/users/cashOut/CheckAgentNo";
import ConfirmCashOut from "../dashboard/users/cashOut/ConfirmCashOut";
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
                        path : '/home/admin',
                        element : <AllUsers></AllUsers>
                    },
                    {
                        path : 'all-agents',
                        element : <AllAgents></AllAgents>
                    }
                ]
            },
            // users
            {
                path : '/user/send-money',
                element : <SendMoney></SendMoney>,
                children : [
                    {
                        path : '/user/send-money',
                        element : <CheckUser></CheckUser>
                    },
                    {
                        path : 'confirm',
                        element : <ConfirmSendMoney></ConfirmSendMoney>
                    }
                ]
            },
            {
                path : '/user/transactions',
                element : <UserTransactions></UserTransactions>,
                children : [
                    {
                        path : 'history/send-money',
                        element : <SendHistory></SendHistory>
                    },
                    {
                        path : 'history/recieve-money',
                        element : <RecieveHistory></RecieveHistory>
                    },
                    {
                        path : 'history/cash-in',
                        element : <CashInHistory></CashInHistory>
                    }
                ]
            },
            {
                path : '/user/cash-in',
                element : <CashIn></CashIn>,
                children : [
                    {
                        path : '/user/cash-in',
                        element : <CheckAgent></CheckAgent>
                    },
                    {
                        path : 'confirm',
                        element : <ConfirmCashIn></ConfirmCashIn>
                    }
                ]
            },
            {
                path : '/user/cash-out',
                element : <CashOut></CashOut>,
                children : [
                    {
                        path : 'check-agent',
                        element : <CheckAgentNo></CheckAgentNo>
                    },
                    {
                        path : 'confirm',
                        element : <ConfirmCashOut></ConfirmCashOut>
                    }
                ]
            },
            // agent
            {
                path : '/agent/cash-in-request',
                element : <CashInRequest></CashInRequest>
            },
            {
                path : '/agent/transaction',
                element : <AgentTransactions></AgentTransactions>,
                children : [
                    {
                        path : 'history/cash-in',
                        element : <AgentCashIInHistory></AgentCashIInHistory>
                    },
                    {
                        path : 'history/cash-out',
                        element : <AgentCashoutHistory></AgentCashoutHistory>
                    }
                ]
            }
        ]
    }
])

export default router;