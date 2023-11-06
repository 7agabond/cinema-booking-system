from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Movies, CustomUser, Card
from .serializer import MovieSerializer, UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
import json
import uuid
from cryptography.fernet import Fernet

#TODO: define error class and error codes and properly throw errors

class Send_Verification_Email(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        subject = 'Cinera Verifcation Code'
        verification_code = data.get('verificationCode')
        email = data.get('email')
        send_mail(subject, verification_code, 'cineraecinemabooking@gmail.com', email)
        return Response({'email sent': 1})


#creates user and card in database
class Create_User(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        new_username = data.get('username')
        new_email = data.get('email')
        #exsisting_users = CustomUser.objects.filter(username=new_username)       
        #if exsisting_users.exists():
        #    return Response({"error: username is already registered to an exsisting user": -1})
        exsisting_users = CustomUser.objects.filter(email=new_email)
        if exsisting_users.exists():
            return Response({"error: email is already registered to an exsisting user": -1})
        new_password = data.get('password')
        new_number = data.get('mobileNumber')
        new_first = data.get('firstName')
        new_last = data.get('lastName')
        new_user = CustomUser.objects.create(username=new_username, email=new_email, password=make_password(new_password), 
                                             first_name=new_first, last_name=new_last, phone_number=new_number, state_id=1)
        new_user.save()
        key = Fernet.generate_key()
        fern = Fernet(key)
        cardType = fern.encrypt(data.get('cardType'))
        cardNumber = fern.encrypt(data.get('cardNumber'))
        expiration = fern.encrypt(data.get('expirationDate'))
        billingStreet = fern.encrypt(data.get('billingStreetAddress'))
        billingCity = fern.encrypt(data.get('billingCityAddress'))
        billingState = fern.encrypt(data.get('billingStateAddress)'))
        billingZip = fern.encrypt(data.get('billingZipCodeAddress'))
        new_card = Card.objects.create(user_id=new_user.pk, card_type=cardType, card_number=cardNumber, 
                                       card_expiration=expiration, card_city=billingCity, card_street=billingStreet, 
                                       card_state=billingState, card_zip=billingZip)
        new_card.save()
class Login(APIView):
    def get(self, request):
        user = authenticate(request, self['username'], self['password'])
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(token.key)
        else: 
            return Response(-1)
class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        print("queryset:", queryset)
        serializer_class = MovieSerializer(queryset, many=True)
        print(serializer_class.data)
        movieList = {"movies":serializer_class.data}
        return Response(movieList)
# Create your views here.
