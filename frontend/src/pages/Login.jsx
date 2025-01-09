import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h3 className="login-title">Connexion</h3>
    
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
    
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                Se connecter
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
    
}

export default Login