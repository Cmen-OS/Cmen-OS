from django.conf.urls import url
from db import views

urlpatterns = [
    url(r'^login$', views.login),
    url(r'^admin$', views.admin),
    url(r'^registro$', views.registro),
    url(r'^animal$', views.animal),
    url(r'^operador$', views.operador),
    url(r'^operador$', views.operador),
    url(r'^archivo$', views.archivo)
]
