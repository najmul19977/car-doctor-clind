import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Result } from 'postcss';

const Login = () => {
    const {signIn} =useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.form?.pathname || "/";
    const handleLogin =event => {
        event.preventDefault();
        const form = event.target;
        
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        signIn(email,password)
        .then(Result =>{
            const user = Result.user;
            const loggedUser = {
                email:user.email
            }
            console.log(loggedUser);
            
            fetch('http://localhost:5000/jwt',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(loggedUser)
            })
            .then(res =>res.json())
            .then(data =>{
                console.log('jwt response',data);

                // warning:Local storage is not the best place to stor access token

                localStorage.setItem('car-access-token',data.token)
                navigate(from,{replace:true})
            })
        })
        .catch(error =>console.log(error));
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-14 w-1/2">

                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold"> Please Login </h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                        <p className='my-4'>New to Car Doctors <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;