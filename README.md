# mui-react-genologix

## Next todo

**Refactoriser le projet**

- [ ] Django : structure des applications
- [ ] Django : changer le système d'authentification > token JWT
- [ ] React : architecture du projet
- [ ] React : composants (structure)
- [ ] Mui : styling (structure)
- [ ] UI : Rendre fonctionnel la page home
- [ ] Dockeriser le frontend

Prédiction de maladies cardiaques et pulmonaires alimentée par l'IA
**Note:** Ce projet a été réalisé sur une courte durée lors d'une formation à Technocité (Développeur, intégrateur IA).

![Image title](#)

## Features

- **IA:** Modèles pour prédire les maladies cardiaques et pulmonaires.
- **Backend:** Django et Django REST Framework.
- **Frontend:** React avec Material-UI.
- **Base de données:** MySQL.

## Lancer le projet

### Prérequis

- Docker
- Node.js
- Télécharger les modèles de prédiction de maladies cardiaques et pulmonaires [ici](https://drive.google.com/drive/folders/1cjXVpvgkfYryn0bAfFUE1dKxsp65AqpG?usp=drive_link).

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/fudev1/mui-react-genologix.git
   cd mui-react-genologix
   ```

2. Backend avec Docker :

   - Assurez-vous que Docker est installé et en cours d'exécution.
   - Allez dans le dossier backend :
     ```bash
     cd backend
     ```
   - Placez les fichiers de prédictions `heart.joblib` et `poumon.h5` à la racine du dossier `backend`.
   - Construisez et lancez les services Docker :
     ```bash
     docker-compose up -d --build
     ```
   - Initialisez la base de données :
     ```bash
     docker-compose exec django python manage.py migrate
     ```
   - Lancez le serveur Django :
     ```bash
     docker-compose exec django python manage.py runserver
     ```

3. Frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
