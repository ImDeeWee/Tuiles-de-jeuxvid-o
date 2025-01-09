import mongoose from "mongoose";

const tuileSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        categorie: {
            type: String,
            required: true,
        },
        auteur: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Tuile = mongoose.model('tuile', tuileSchema);