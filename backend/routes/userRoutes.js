import { Router } from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
const router = Router();

// Fonction pour créer un token JWT
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Route pour la connexion d'un utilisateur
router.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.login(email, password);

        
        const token = createToken(user._id);
        const username = user.username;
        const role = user.role;

        
        request.app.get('io').emit('userLoggedIn', { email, username, role });

        
        response.status(200).json({ email, token, username, role });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
})

// Route pour l'inscription d'un utilisateur
router.post('/signup', async (request, response) => {
    const { email, password, username, role } = request.body;

    try {
        const user = await User.signup(email, password, username, role);

        
        const token = createToken(user._id);

        
        request.app.get('io').emit('userSignedUp', { email, username, role });

        response.status(200).json({ email, username, token, role });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
})

export default router;
