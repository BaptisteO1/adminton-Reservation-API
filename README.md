 # Badminton Reservation System

## Table des matières
1. [Lancer le projet](#lancer-le-projet)
2. [Utiliser le service](#utiliser-le-service)
3. [Conception](#conception)
   - [Dictionnaire des données](#dictionnaire-des-données)
   - [Tableau récapitulatif des ressources](#tableau-récapitulatif-des-ressources)
4. [Sécurité](#sécurité)
5. [Remarques](#remarques)

---

## Lancer le projet

### Prérequis
- Node.js (version 22.x ou supérieure)
- NPM (version 10.x ou supérieure)
- MySQL ou autre base de données compatible

### Étapes
1. Clonez le dépôt :
   ```bash
   git clone du dépot
   cd badminton-reservation
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez la base de données :
   - Créez une base de données nommée `badminton_reservation`.
   - Configurez le fichier `config/config.json` pour y indiquer vos paramètres de connexion.

4. Appliquez les migrations :
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Insérez les jeux de données de test :
   ```bash
   npx sequelize-cli db:seed:all
   ```

6. Lancez le projet :
   ```bash
   npm run dev
   ```

7. Accédez au service :
   - URL d'entrée : [http://localhost:3000](http://localhost:3000)

8. Lancez Swagger (si disponible) :
   - Accédez à [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## Utiliser le service

### Cas nominal
1. Créez un utilisateur via l'API `/register`.
2. Connectez-vous pour obtenir un token JWT via `/login`.
3. Effectuez une réservation en envoyant une requête POST sur `/reservations`.
4. Annulez ou modifiez une réservation si nécessaire.
5. En tant qu'admin, gérez les disponibilités des terrains via les endpoints `/terrains`.

### Exemples d'appels API
- **Créer un utilisateur** :
   ```json
   POST /register
   {
       "username": "testuser",
       "password": "test1234"
   }
   ```
- **Créer une réservation** :
   ```json
   POST /reservations
   {
       "date": "2024-12-12",
       "time": "10:00",
       "terrainId": 1
   }
   ```

---

## Conception

### Dictionnaire des données
| Attribut       | Description                           | Type           | Contraintes                   |
|----------------|---------------------------------------|----------------|-------------------------------|
| `username`     | Nom d'utilisateur                    | STRING         | Unique, longueur 4-20        |
| `password`     | Mot de passe de l'utilisateur        | STRING         | Min. 4 caractères avec 1 chiffre |
| `isAdmin`      | Statut administrateur                | BOOLEAN        | Défaut : false               |
| `name`         | Nom du terrain                       | STRING         | Non nul                      |
| `isAvailable`  | Disponibilité du terrain             | BOOLEAN        | Défaut : true                |
| `date`         | Date de réservation                  | DATEONLY       | Non nul                      |
| `time`         | Heure de réservation                 | STRING         | Format : HH:mm               |

### Tableau récapitulatif des ressources
| Ressource    | URL                     | Méthodes HTTP  | Paramètres/Variations      | Commentaires                  |
|--------------|-------------------------|----------------|----------------------------|-------------------------------|
| `User`       | `/register`        | POST           | Aucune                     | Création d'un utilisateur     |
| `User`       | `/login`           | POST           | Aucune                     | Authentification              |
| `Reservation`| `/reservations`    | GET, POST, DELETE | `date`, `terrainId`      | Gestion des réservations      |
| `Terrain`    | `/terrains/:id`    | PATCH          | `id`                       | Modifier la disponibilité     |

---

## Sécurité
1. **Authentification et autorisation** :
   - Les endpoints sont protégés par un middleware JWT pour vérifier l'identité des utilisateurs.
   - Les actions sensibles (gestion des terrains) sont réservées aux administrateurs.

2. **Validation des données** :
   - Utilisation de regex pour valider les noms d'utilisateur et les mots de passe.
   - Vérifications strictes pour éviter les entrées invalides.

3. **Gestion des erreurs** :
   - Retour explicite des erreurs HTTP (400, 403, 500) avec des messages d'erreur clairs.

---

## Remarques
- **Difficultés rencontrées** :
   - Relations entre modèles.
   - Mise en place des tests pour valider les différents scénarios.
- **Améliorations futures** :
   - Implémentation d'un tableau de bord pour visualiser les réservations.
   - Ajout d'un système de notifications pour rappeler les réservations.

---

