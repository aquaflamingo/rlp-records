from django.urls import include, path
from rest_framework import routers
from rlp_records import views

router = routers.DefaultRouter()
router.register(r'members', views.MemberViewSet)
router.register(r'recordlabels', views.RecordLabelViewSet)
router.register(r'records', views.RecordViewSet)
router.register(r'erc721s', views.ERC721ViewSet)
router.register(r'events', views.EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
