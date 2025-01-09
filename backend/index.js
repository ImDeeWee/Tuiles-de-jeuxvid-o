import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import tuilesRoutes from './routes/tuilesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Configuration des variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  return response.status(234).send('Bienvenu au projet');
});

// Routes pour les tuiles et les utilisateurs
app.use('/tuiles', tuilesRoutes);
app.use('/user', userRoutes);

// Mise en place de Socket.io pour les événements en temps réel
app.set('io', io);


io.on('connection', (socket) => {
  console.log('Utilisateur connecté:', socket.id);

  socket.on('disconnect', () => {
    console.log('Utilisateur déconecté:', socket.id);
  });
});

// Connexion à la base de données MongoDB et démarrage du serveur
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connecté à la DB avec succès!');
    server.listen(PORT, () => {
      console.log(`Écoute au port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
