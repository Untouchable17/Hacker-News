import React from 'react';

import Navbar from '../components/Navbar/Navbar';

const Layout = (props) => (

    <div className="Layout">
        <Navbar />
        {props.children}
    </div>
);


export default Layout;