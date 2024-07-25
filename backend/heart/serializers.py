# s'occupera de la sérialisation et de la désérialisation des données du HeartData.

from rest_framework import serializers
from .models import HeartData

class HeartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartData
        # Mes données que je veux envoyer sur mon frontend :
        fields = ['id', 'age', 'sex', 'cp', 'trtbps', 'chol', 'fbs', 'fbsOriginal', 'restecg', 
                  'thalachh', 'exng', 'oldpeak', 'slp', 'caa', 'thall', 'prediction', 'created_at']

    # def update(self, instance, validated_data):
    #     # Assurez-vous de retirer 'user' de validated_data avant de mettre à jour l'instance
    #     validated_data.pop('user', None)
    #     return super().update(instance, validated_data)

    def create(self, validated_data):
                # Assurez-vous de retirer 'user' de validated_data avant de créer l'objet

        validated_data.pop('user', None)
        return HeartData.objects.create(user=self.context['request'].user, **validated_data)

# Nous indiquons que nous utilisons le modèle HeartData.
# Nous spécifions les champs qui doivent être inclus dans la sérialisation/désérialisation.
# La méthode create est personnalisée pour s'assurer que l'instance HeartData est liée à l'utilisateur actuel.