import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name,
                email,
                password,
                confPassword,
            });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.msg || "An error occurred");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update User</h1>
            {error && <p className="has-text-danger">{error}</p>}
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="Leave blank to keep current password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="Confirm new password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <button className="button is-success" type="submit">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
