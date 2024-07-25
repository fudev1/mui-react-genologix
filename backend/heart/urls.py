from django.urls import path
from .views import PredictHeartConditionView, SaveHeartDataView, HeartDataHistoryView

urlpatterns = [
    path("predict-heart-condition", PredictHeartConditionView.as_view()),
    path("save-heart-data", SaveHeartDataView.as_view(), name='save-heart-data'),
    path('history', HeartDataHistoryView.as_view(), name='heart-data-history'),

]