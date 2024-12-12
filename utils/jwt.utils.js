const jwt = require('jsonwebtoken');

// Votre clé secrète (assurez-vous de ne pas la rendre publique)
const JWT_SIGN_SECRET = '<JWT_SIGN_TOKEN>';

// Fonction pour générer un token pour l'utilisateur
module.exports.generateTokenForUser = (userData) => {
    return jwt.sign(
        {
            userId: userData.id,
            isAdmin: userData.isAdmin,
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

// Fonction pour récupérer l'ID utilisateur à partir du token
module.exports.getUserId = (token) => {
    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
        return decodedToken.userId;
    } catch (err) {
        return null; // Token invalide ou expiré
    }
};
