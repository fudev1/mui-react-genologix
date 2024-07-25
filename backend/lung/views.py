# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.files.storage import default_storage


# from .serializers import LungImageSerializer
# from .lung_predict import lung_prediction
# from .models import LungImage


# Create your views here.

# class LungPredictAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         # Utilise un serializer pour valider le fichier reçu
#         serializer = LungImageSerializer(data=request.data)
#         if serializer.is_valid():
#             # Enregistre le fichier dans le modèle
#             lung_image_instance = serializer.save()

#             # Effectue la prédiction
#             prediction = lung_prediction(lung_image_instance.file.path)

#             # Supprime le fichier si nécessaire
#             default_storage.delete(lung_image_instance.file.path)
#             lung_image_instance.delete()

#             return Response({'prediction': prediction}, status=status.HTTP_200_OK)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.http import JsonResponse
from rest_framework.decorators import api_view
from .lung_predict import lung_prediction


@api_view(['POST'])
def predict_lung_image(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    file = request.FILES['file']
    prediction = lung_prediction(file)  # Appelle ta fonction de prédiction

    if prediction is None:
        return JsonResponse({'error': 'Could not make a prediction'}, status=500)

    return JsonResponse({'prediction': prediction})