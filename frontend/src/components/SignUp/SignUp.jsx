import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/Auth';

const SignUp = ({ signup, isAuthenticated }) => {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        re_password: ""
    });

    const { name, email, password, re_password } = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        
        e.preventDefault();

        if (password === re_password){
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
        
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Sign Up your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        required
                        onChange={e => onChange(e)}
                        className='form-control' 
                        name='name' 
                        type='text' 
                        value={name} 
                        placeholder='Your name is..'
                    />
                </div>
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
                <div className='form-group'>
                    <input 
                        required
                        minLength='5'
                        onChange={e => onChange(e)}
                        className='form-control' 
                        name='re_password' 
                        type='password' 
                        value={password} 
                        placeholder='Repeat your password..'
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Sign Up</button>
            </form>
            <p className='mt-3'>
                Already have an account? <Link to="/login">Sign Up</Link>
            </p>
           
        </div>
    )
};



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})




export default connect(mapStateToProps, { signup     }) (SignUp);