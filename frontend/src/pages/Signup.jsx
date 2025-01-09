import React from 'react';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import '../styles/signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [passwordError, setPasswordError] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas");
            return;
        }

        setPasswordError('');
        await signup(email, password, username, role);
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h3 className="signup-title">Inscription</h3>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Courriel
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="role">
                        Rôle
                    </label>
                    <select
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        className="form-select"
                    >
                        <option value="user">Utilisateur</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {passwordError && (
                    <div className="error-message" role="alert">
                        <span>{passwordError}</span>
                    </div>
                )}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        S'inscrire
                    </button>
                </div>
                {error && (
                    <div className="error-message" role="alert">
                        <span>{error}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Signup;
