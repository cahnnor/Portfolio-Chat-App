from rest_framework.serializers import ModelSerializer
from .models import Profile, Room, Topic, Message

class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        #username = 'username'
        # Can specify specific fields from Database table by instead doing something like
        # fields = ['body, 'updated'] # leaving out the 'created' column.

class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields= '__all__'

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields='__all__'
    
class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

