from django.db import models
from django.utils.translation import gettext_lazy as _fr
from django.db.models.signals import post_save

# import logging
# logger = logging.getLogger(__name__)



# Création d'un modèle `User` personnalisé en héritant de AbstractUser.
# Django utilise un modèle `User` par défaut qui contient des keys de base pour l'authentification et 
# `username`, `first_name`, `last_name`, `email` et `password`.
# Cela permet d'ajouter des champs supplémentaires et de personnaliser le comportement du modèle User.
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


# Je crée une classe pour gerer les utilisateurs et de superutilisateurs
class UserAccountManager(BaseUserManager):
    # Créer un utilisateur normal
    def create_user(self, first_name, last_name, sex, birth_date , email, password=None):
        # logger.info(f"Creating user with email: {email}")

        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        email = email.lower()

        # Crée une instance utilisateur avec les paramètres fournis
        user = self.model(
            first_name = first_name,
            last_name = last_name,
            sex = sex,
            birth_date = birth_date,
            email = email,
            username=email,
        )

        user.set_password(password)
        user.save(using=self._db)
        # logger.info(f"User created with email: {email}")

        return user
    
    def create_superuser(self, first_name, last_name, sex, birth_date, email, password=None):
        user = self.create_user(
            first_name,
            last_name,
            sex,
            birth_date,
            email,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractUser, PermissionsMixin): 
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    MALE = 1
    FEMALE = 0
    SEX_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]
    sex = models.IntegerField(choices=SEX_CHOICES)

    birth_date = models.DateField()
    email = models.EmailField(unique=True, max_length=255) # Champ unique pour éviter les doublons
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=150, unique=True)

    # Assignation de UserManager personnalisé au modèle UserAccount
    objects = UserAccountManager() 

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'sex', 'birth_date']

    def __str__(self):
        return self.email
    

# class Profile(models.Model):
#     user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='profile')
#     bio = models.TextField(max_length=500, blank=True)
#     image = models.ImageField(upload_to='profile_images', blank=True)

#     def __str__(self):
#         return self.user.email
    

# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

# post_save.connect(create_profile, sender=UserAccount)
# post_save.connect(save_user_profile, sender=UserAccount)