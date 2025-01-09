import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        role: { 
            type: String, 
            required: true,
             }
    }
);


userSchema.statics.signup = async function (email, password, username, role) {

    
    if (!email || !password || !username || !role) {
        throw Error('Tous les champs doivent être remplis')
    }

    if (!validator.isEmail(email)) {
        throw Error('Courriel non valide')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Mot de passe pas assez fort')
    }

    const exists = await this.findOne({ email })
    const usernameExists = await this.findOne({username})

    if (exists) {
        throw Error('Courriel déjà pris')
    }

    if (usernameExists) {
        throw Error('Nom d\'utilisateur déjà pris')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username, role })

    return user

}


userSchema.statics.login = async function (email, password) {
    
    if (!email || !password) {
        throw Error('Tous les champs doivent être remplis')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Courriel incorrect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Mot de passe incorrect')
    }

    return user
}

export const User = mongoose.model('user', userSchema);