import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App';
import Layout from './hocs/Layout';
import BlogList from './components/BlogList/BlogList';
import BlogDetail from './components/BlogDetail/BlogDetail';
import LoginIn from './components/LoginIn/LoginIn';
import SignUp from './components/SignUp/SignUp';
import Activate from './components/Activate/Activate';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm/ResetPasswordConfirm';


const rootElement = document.getElementById("root");
    render(
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<LoginIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                    <Route path="/activate/:uid/:token" element={<Activate />} />

                    <Route path="blogs" element={<BlogList />} />
                    <Route path="blog/:id" element={<BlogDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>,

        rootElement
);

