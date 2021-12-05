from django.conf.urls import url
from LoginForm import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[


     url(r'^user/$',views.userApi),
    url(r'^user/([0-9]+)$',views.userApi),

 
]