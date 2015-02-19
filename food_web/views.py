from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

# Create your views here.
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

def liked(request):
    if request.method == "POST":
        exists = Restaurant.objects.get(name=request.restaurant.name)
        if (exists == False):
            Restaurant.objects.create(name=request.restaurant.name)
            pass
        pass
