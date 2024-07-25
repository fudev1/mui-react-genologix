from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from datetime import date


# fonction pour calculer l'age d'un user pour le renvoyer vers le front 
# C'est pour pouvoir l'afficher dans le heartDataModal
def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

# Vue pour obtenir les détails de l'utilisateur connecté
class UserDetailView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        age = calculate_age(user.birth_date)  
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'age': age,
            # D'autres informations au besoin
        })

# Vue pour enregistrer un nouvel utilisateur
class RegisterView(APIView):
    def post(self, request):
        data = request.data

        # Je valide les donneés
        serializer = UserCreateSerializer(data=data)
        print(request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # si données validée alors je sauve l'user
        user = serializer.save()

        # Sérialiser l'objet user pour la réponse
        user_data = UserSerializer(user).data
        return Response(user_data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    def get(self, request):
        pass


class CustomTokenObtainPairView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            age = calculate_age(user.birth_date)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'first_name': user.first_name, 
                'last_name': user.last_name,  
                'sex': user.sex, 
                'birth_date': user.birth_date, 
                'email': user.email,
                'age': age,
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

