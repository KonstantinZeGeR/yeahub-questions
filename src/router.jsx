import { createBrowserRouter } from "react-router-dom";
import { QuestionsPage } from "./pages/QuestionsPage/QuestionsPage";
import { Layout } from "./components/Layout/Layout";
import { DetailQuestion } from "./pages/DetailQuestion/DetailQuestion";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <QuestionsPage />},
            { path: "questions/:id", element: <DetailQuestion />}
        ]
    }
])