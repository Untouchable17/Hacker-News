import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/Auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        
        e.preventDefault();
        login(email, password);
        
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        required
                        onChange={e => onChange(e)}
                        className='form-control' 
                        name='email' 
                        type='email' 
                        value={email} 
                        placeholder='email'
                    />
                </div>
                <div className='form-group'>
                    <input 
                        required
                        minLength='5'
                        onChange={e => onChange(e)}
                        className='form-control' 
                        name='password' 
                        type='password' 
                        value={password} 
                        placeholder='password'
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your password? <Link to="/reset-password">Reset Password</Link>
            </p>
        </div>
    )
};



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})




export default connect(mapStateToProps, { login }) (Login);