from rest_framework import serializers
from rlp_records.models import Record, Member, RecordLabel, ERC721, AudioFile, Event

class ERC721Serializer(serializers.ModelSerializer):
    class Meta:
        model = ERC721
        fields = ('id', 
                  'tokenid',
                  'record',
                  'metadata_uri')
        read_only_fields = [ 'id' ]

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'name', 'recordlabel')
        read_only_fields = [ 'id' ]


class RecordLabelSerializer(serializers.ModelSerializer):
    member_set =  MemberSerializer(many=True, read_only=True)

    class Meta:
        model = RecordLabel
        fields = ('id', 'name', 'member_set')
        read_only_fields = [ 'id' ]

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = [ 'record', 'file' ]

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'attributed_to', 'proof', 'details')

        read_only_fields = [ 'id' ]

class RecordSerializer(serializers.ModelSerializer):
    # TODO include ERC721 per event creation
    # token = ERC721Serializer(read_only=True)

    class Meta:
        model = Record
        fields = ('id', 
                  'title',
                  'artist',
                  'state',
                  'recordlabel',
                  # 'token'
                  )
        read_only_fields = [ 'id' ]

