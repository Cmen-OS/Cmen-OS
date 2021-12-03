from django.conf.urls import url
from db import views

urlpatterns = [
    url(r'^registro$', views.registro),
    url(r'^animal$', views.animal),
    url(r'^operador$', views.operador),
    url(r'^archivo$', views.archivo)
]
