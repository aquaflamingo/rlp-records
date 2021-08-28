from rest_framework_json_api import serializers
from rlp_records.models import Record, Member, RecordLabel, ERC721

class RecordLabelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecordLabel
        fields = ('name')

class RecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields = ('title',
                  'artist',
                  'state',
                  'audio_hash',
                  'fingerprint',
                  'recordlabel',
                  'token')

class ERC721Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ERC721
        fields = ('tokenId',
                  'metadataURI')

class MemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Member
        fields = ('name')
