from rlp_records.models import Record, Member, ERC721, RecordLabel
from rlp_records.serializers import RecordLabelSerializer, RecordSerializer, MemberSerializer, ERC721Serializer
from rest_framework import viewsets

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer

class ERC721ViewSet(viewsets.ModelViewSet):
    queryset = ERC721.objects.all()
    serializer_class = ERC721Serializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class RecordLabelViewSet(viewsets.ModelViewSet):
    queryset = RecordLabel.objects.all()
    serializer_class = RecordLabelSerializer


