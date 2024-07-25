from django.urls import path
from .views import  predict_lung_image

urlpatterns = [
    # path("predict-lung", LungPredictAPIView.as_view()),
    path("predict-lung", predict_lung_image),
]


