from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from food_web.forms import ExtendedUserCreationForm, SimpleUserChangeForm
from food_web.models import Restaurant


def index(request):
    return render(request, 'index.html')

def base(request):
    return render(request, 'base_template.html')

def index2(request):
    return render(request, 'index2.html')

def about(request):
    return render(request, 'about.html')

@login_required
def profile(request):
    return render(request, 'profile.html')

def signup(request):
    if request.method == "POST":
        form = ExtendedUserCreationForm(request.POST)
        if form.is_valid():
            if form.save():
                return redirect('login')
    else:
        form = ExtendedUserCreationForm()
    return render(request, 'registration/signup.html', {'form':form})

def successful_logout(request):
    return render(request, 'registration/successful_logout.html')

def profile_edit(request):
    if request.method =="POST":
        form = SimpleUserChangeForm(request.POST or None, instance=request.user)
        if form.is_valid():
            if form.save():
                return redirect('/profile')
    else:
        form = SimpleUserChangeForm(instance=request.user)
    return render(request, 'registration/profile_edit.html', {'form':form})

def formModal(request):
    if request.method == "POST":
        form = ExtendedUserCreationForm(request.POST)
        if form.is_valid():
            if form.save():
                return redirect('../login')
    else:
        form = ExtendedUserCreationForm()
    return render(request, 'modal.html', {'form':form})

@csrf_exempt
def like(request):
    if request.method == "POST":
        print request.POST['restaurant_name']
        print request.user
        restaurant, exists = Restaurant.objects.get_or_create(name=request.POST['restaurant_name'], location=request.POST['restaurant_address'])
        restaurant.patrons_loved.add(request.user.id)
        return HttpResponse(status=200)

@csrf_exempt
def hate(request):
    if request.method == "POST":
        print request.POST['restaurant_name']
        print request.user
        restaurant, exists = Restaurant.objects.get_or_create(name=request.POST['restaurant_name'], location=request.POST['restaurant_address'])
        restaurant.patrons_hated.add(request.user.id)
        return HttpResponse(status=202)