from email import message
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .models import Room
from .serializer import ProfileSerializer, RoomSerializer, TopicSerializer, MessageSerializer
from .models import Topic, Message, Profile
from .forms import RoomForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
import datetime
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#@ensure_csrf_cookie
@api_view(['GET'])
def checkLogin(request):
    content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
    return Response(content, status=HTTP_200_OK)


@api_view(['POST'])
def logoutUser(request):
    logout(request)
    return redirect('/')


#@ensure_csrf_cookie

@api_view(['POST'])
def loginPage(request):
    data = request.data
    print(data)
    if(request.method == 'POST'):
        if(data['register'] == True):
            try:
                user = User.objects.create_user(first_name=data['first_name'], last_name=data['last_name'], username=data['username'], 
                password=data['password'])
                return Response(status=HTTP_200_OK)

            except Exception as e:
                print(e)
                # Consider flash messages here
        
        # We are logging in instead of registering
        else:
            try:
                user = User.objects.get(username=data['username'])
                print("user: ", user)
                print("username: {}, password: {}".format(data['username'], data['password']))
                if(data['password'] == user.password):
                    print("authenticating...")
                    user = authenticate(username=data['username'], password=data['password'])
                    print(user)
                    if( user is not None):
                        print("logging in...")
                        login(request, user)
                        return Response(status=HTTP_200_OK)
                        
                    
            except:
                print("user not found")

    return redirect('/')


@api_view(['GET'])
def getTopics(request):
    topics = Topic.objects.all()
    serializer = TopicSerializer(topics, many=True)
    data = serializer.data
    return Response(data)

@permission_classes([IsAuthenticated])
@api_view(['POST', 'GET'])
def createRoom(request):
    data = request.data
    print(data['host'])
    host = User.objects.get(username=data['host'])
    try:
        topic = Topic.objects.get(name=data['topic'])
    except:
        topic = Topic.objects.create(name=data['topic'])
    room = Room.objects.create(host=host, topic=topic, name=data['name'], description=data['description'])
    serializer = RoomSerializer(room, many=False) 
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def deleteRoom(request, pk):
    room = Room.objects.get(id=pk)
    data = request.data
    print(data['host'] == str(room.host))
    if data['host'] != str(room.host):
        print("Denied.")
        return Response("This room doesn't belong to you pardner.")

    room.delete()
    return Response('Room was Deleted!')

@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def updateRoom(request, pk):
    print("Update room called.")
    data = request.data
    room = Room.objects.get(id=pk)
    if data['host'] != str(room.host):
        print("Denied.")
        return HttpResponse("This room doesn't belong to you pardner.")



    room.name = data['name']
    room.description = data['description']

    try:
        room.topic = Topic.objects.get(name=data['topic'])
    except:
        room.topic = Topic.objects.create(name=data['topic'])

    room.save()
    serializer = RoomSerializer(instance = room, many = False)

    return Response(serializer.data)

@authentication_classes([TokenAuthentication])
@api_view(['GET'])
def getRooms(request):
    q = request.GET.get('q', '') if request.GET.get('q', '') != None else ''
    rooms = Room.objects.filter(topic__name__icontains=q)
        
    topics = Topic.objects.all()
    #tserializer = TopicSerializer(topics, many=True)
    serializer = RoomSerializer(rooms, many=True)   
    data = serializer.data
    for d in data:
        room = Room.objects.get(id=d['id'])
        d['host'] = room.host.username
        d['topic'] = room.topic.name
   
    return Response(data)



@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def getRoom(request, pk):
    room = Room.objects.get(id=pk)
    # get set of messages related to this specific room.
    messages = room.message_set.all()
    serializer = RoomSerializer(room, many=False)
    room_data = {'user':room.host.username}
    room_data.update(serializer.data)
    room_data['topic'] = room.topic.name
    print(room_data['topic'])
    

    message_serializer = MessageSerializer(instance=messages, many=True)
    # Convert user ID to username since serializer gets id for some reason..
    for message in message_serializer.data:
        message['user'] = User.objects.get(id=message['user']).username

    if request.method == 'DELETE':
        message = Message.objects.get(body=request.data['message'])
        if(request.data['user'] == str(message.user)):
            message.delete()
            print("DELETED MESSAGE")
        else:
            print("how did you get here {}?".format(request.data['user']))
            print("message made by: {}".format(message.user))
        
        return Response("deleted")

    if request.method == 'PUT':
        message = Message.objects.get(body=request.data['original'])
        if(request.data['user'] == str(message.user)):
            message.body = request.data['input']
            message.save()
            print("EDITED MESSAGE")
        else:
            print("You can't edit this message {}, it's for {}".format(request.data['user'], message.user))

    if (request.method == 'POST'):
        message = Message.objects.create(
            user = User.objects.get(username=request.data['user']),
            room = room,
            body = request.data['body']
        )
        return Response("Message sent")

    return Response(data = [room_data, message_serializer.data])

@api_view(['GET'])
def userPage(request, name):
    user = User.objects.get(username__iexact=name)
    profile = Profile.objects.get(user=user)
    profile_serializer = ProfileSerializer(instance=profile, many=False)


    if (request.method == 'GET'):
        messageList = user.message_set.all().order_by('created')[:5]
        message_serializer = MessageSerializer(instance=messageList, many=True)
        message_data = message_serializer.data
        for m in message_data:
            m['room'] = Room.objects.get(id=m['room']).name

        roomList = user.room_set.all().order_by('updated')[:5]
        room_serializer = RoomSerializer(instance=roomList, many=True)
        
        return Response(data = [message_data, room_serializer.data, profile_serializer.data])
    else:
        return Response("Failure")

# Create your views here.
def home(request):
    rooms = Room.objects    
    context = {'rooms': rooms}
    return render(request, context)

#def rooms(request):
#    return HttpResponse("Room List page Placeholder")

def room(request, pk):
    return HttpResponse("Room {} placeholder".format(pk))