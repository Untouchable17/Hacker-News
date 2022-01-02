import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App';
import BlogList from './components/BlogList/BlogList';
import BlogDetail from './components/BlogDetail/BlogDetail';

const rootElement = document.getElementById("root");
    render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="blogs" element={<BlogList />} />
                <Route path="blog/:id" element={<BlogDetail />} />
            </Routes>
        </BrowserRouter>,

        rootElement
);

