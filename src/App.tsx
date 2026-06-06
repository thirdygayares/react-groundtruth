import { Routes, Route } from 'react-router-dom';
import CreditPage from "@pages/Credit/CreditPage";
import Homepage from "./pages/home/Homepage";
import DialogPage from "@pages/ComponentPage/Dialog/DialogPage";


export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/credits" element={<CreditPage />} />

                <Route path="/component/dialog" element={<DialogPage />} />

                <Route path={"*"} element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    );
}
