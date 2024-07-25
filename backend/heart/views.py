from django.shortcuts import render
from api.models import UserAccount
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .predict import make_prediction
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import HeartData
from .serializers import HeartDataSerializer



# Create your views here.

# class HeartDataView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         user = UserAccount.objects.get(id=request.user.id)
#         # ... logique pour traiter les données cardiaques ...

class PredictHeartConditionView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        # Vous devrez adapter les données pour qu'elles correspondent à ce que votre modèle attend.
        # Par exemple, si votre modèle attend des données sous forme de dictionnaire avec des clés spécifiques,
        # assurez-vous que 'data' les ait.

        # Ici, 'MyPredictiveModel' est une instance de votre modèle de prédiction.
        prediction = make_prediction(data)

         # La prédiction est renvoyée au client.
        return Response({'prediction': prediction}, status=status.HTTP_200_OK)


class SaveHeartDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        # Log des données reçues
        print("Données reçues:", request.data)

        serializer = HeartDataSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

         # Log des erreurs du serializer
        print("Erreurs du serializer:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# HISTORIQUE
class HeartDataHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        heart_data = HeartData.objects.filter(user=request.user).order_by('-created_at')
        serializer = HeartDataSerializer(heart_data, many=True)
        return Response(serializer.data)    