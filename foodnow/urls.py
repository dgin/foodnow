from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'foodnow.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'food_web.views.index2', name='index2'),

    url(r'^base/$', 'food_web.views.base', name='base'),
    # url(r'^index/$', 'food_web.views.index2', name='index2'),
    url(r'^about/$', 'food_web.views.about', name='about'),

    # url(r'^liked/$', 'food_web.views.liked', name='liked'),

    # User logistics, registration, etc.
    url(r'^profile/$', 'food_web.views.profile', name='profile'),
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': 'successful_logout'}, name='logout'),
    url(r'^successful_logout/$', 'food_web.views.successful_logout', name='successful_logout'),
    url(r'^signup/$', 'food_web.views.signup', name='signup'),
    url(r'^profile_change/$', 'food_web.views.profile_edit', name='profile_edit'),
    url(r'^formModal/$', 'food_web.views.formModal', name='formModal'),

    url(r'^admin/', include(admin.site.urls)),
)
