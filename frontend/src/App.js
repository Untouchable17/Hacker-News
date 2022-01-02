import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import { render } from "react-dom";

import axios from 'axios';

import BlogList from './components/BlogList/BlogList';


export default function App() {

    return (
        <div className="App">
            <h1>Main Page</h1>

            <nav>
                <Link to="/blogs">Blogs</Link>
            </nav>

            <hr/>
            <Outlet />
        </div>
    )

}
