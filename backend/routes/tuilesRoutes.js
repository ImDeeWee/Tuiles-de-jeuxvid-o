import express from 'express';
import { Tuile } from "../models/tuileModel.js";

const router = express.Router();

// Route pour sauvegarder une nouvelle tuile
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.titre ||
            !request.body.description ||
            !request.body.categorie ||
            !request.body.auteur
        ) {
            return response.status(400).send({
                message: 'Envoyez tous les champs obligatoires',
            });
        }
        const newTuile = {
            titre: request.body.titre,
            description: request.body.description,
            categorie: request.body.categorie,
            auteur: request.body.auteur,
        };
        const tuile = await Tuile.create(newTuile);

        
        request.app.get('io').emit('tuileChanged', tuile);

        return response.status(201).send(tuile);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route pour obtenir toutes les tuiles
router.get('/', async (request, response) => {
    try {
        const tuiles = await Tuile.find({});
        return response.status(200).json({
            count: tuiles.length,
            data: tuiles
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route pour obtenir une tuile par ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const tuile = await Tuile.findById(id);
        return response.status(200).json(tuile);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route pour modifier une tuile par ID
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.titre ||
            !request.body.description ||
            !request.body.categorie
        ) {
            return response.status(400).send({
                message: 'Envoyez tous les champs obligatoires',
            });
        }

        const { id } = request.params;
        const result = await Tuile.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Tuile pas trouvée' });
        }

        
        request.app.get('io').emit('tuileChanged', result);

        return response.status(200).send({ message: 'Tuile changée avec succès' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route pour supprimer une tuile par ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Tuile.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Tuile pas trouvée' });
        }

        
        request.app.get('io').emit('tuileChanged', { _id: id, deleted: true });

        return response.status(200).send({ message: 'Tuile supprimée avec succès' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
