from django.db import models
from django.conf import settings


# Importe les infos user depuis l'app API
from api.models import UserAccount

# Create your models here.

# Je crée un modèle pour stocker mes données de prédiction qui vient du formulaire HeartDataModal
class HeartData(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    age = models.IntegerField()
    sex = models.IntegerField()
    cp = models.IntegerField()
    trtbps = models.IntegerField()
    chol = models.IntegerField()
    fbs = models.IntegerField()
    fbsOriginal = models.IntegerField()
    restecg = models.IntegerField()
    thalachh = models.IntegerField()
    exng = models.IntegerField()
    oldpeak = models.FloatField()
    slp = models.IntegerField()
    caa = models.IntegerField()
    thall = models.IntegerField()
    prediction = models.IntegerField(null=True, blank=True)  # Peut être null si pas encore prédit
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}'s heart data on {self.created_at.strftime('%Y-%m-%d')}"