# Utiliser une image de base Ubuntu
FROM tensorflow/tensorflow:latest
ENV PYTHONUNBUFFERED 1

# Installer les dépendances nécessaires pour mysqlclient
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /workspaces

COPY requirements.txt .

# Ajouter un utilisateur non-root et définir les permissions
RUN useradd -ms /bin/bash myuser
RUN chown -R myuser:myuser /workspaces

# Passer à l'utilisateur non-root
USER myuser


RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 8000 pour le serveur web
EXPOSE 8000

COPY . .


CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
