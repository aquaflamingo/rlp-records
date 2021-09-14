from rest_framework import serializers
from rlp_records.models import Record, Member, RecordLabel, ERC721, AudioFile


class ERC721Serializer(serializers.ModelSerializer):
    class Meta:
        model = ERC721
        fields = ('tokenId',
                  'metadataURI')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('name', 'recordlabel')


class RecordLabelSerializer(serializers.ModelSerializer):
    member_set =  MemberSerializer(many=True, read_only=True)

    class Meta:
        model = RecordLabel
        fields = ('name', 'member_set')

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ('record', 'value')

class RecordSerializer(serializers.ModelSerializer):
    token = ERC721Serializer(read_only=True)

    class Meta:
        model = Record
        fields = ('title',
                  'artist',
                  'state',
                  'audiofile',
                  'recordlabel',
                  'token')
        read_only_fields = ["audiofile"]


