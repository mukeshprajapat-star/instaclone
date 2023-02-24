import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Auth from './Auth';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setAvatar(Reader.result);
          }
        };
      };
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(name,email,username,password,avatar));
    }
    
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <>
            {loading && <BackdropLoader />}
            <Auth>
                <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
                    <img draggable="false" className="mx-auto h-30 w-36 object-contain" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
                    >
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            size="small"
                        />
                        <TextField
                            label="Username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="small"
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            size="small"
                            fullWidth
                        />
                        <div className="flex w-full justify-between gap-3 items-center">
                            <Avatar
                                alt="Avatar Preview"
                                src={avatar}
                                sx={{ width: 48, height: 48 }}
                            />
                            <label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    name="avatar"
                                    className="block w-full text-sm text-gray-400
                                    file:mr-3 file:py-2 file:px-6
                                    file:rounded-full file:border-0
                                    file:text-sm file:cursor-pointer file:font-semibold
                                    file:bg-blue-100 file:text-blue-700
                                    hover:file:bg-blue-200
                                    "/>
                            </label>
                        </div>

                        <button type="submit" className="bg-primary-blue font-medium py-2 rounded text-white w-full">Sign up</button>
                        <span className="my-3 text-gray-500">OR</span>
                        <Link to="/password/forgot" className="text-sm font-medium  text-blue-800">Forgot password?</Link>
                    </form>
                </div>

                <div className="bg-white border p-5 text-center">
                    <span>Already have an account? <Link to="/login" className="text-primary-blue">Log in</Link></span>
                </div>
            </Auth>
        </>
    )
}

export default SignUp