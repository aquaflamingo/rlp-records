from rest_framework import serializers
from rlp_records.models import Record, Member, RecordLabel, ERC721, AudioFile


class ERC721Serializer(serializers.ModelSerializer):
    class Meta:
        model = ERC721
        fields = ('id', 
                  'tokenId',
                  'record_id',
                  'metadataURI')
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

class RecordSerializer(serializers.ModelSerializer):
    # TODO
    # token = ERC721Serializer(read_only=True)

    class Meta:
        model = Record
        fields = ('id', 
                  'title',
                  'artist',
                  'state',
                  'recordlabel'
                  # 'token'
                  )
        read_only_fields = [ 'id' ]

