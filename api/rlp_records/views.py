from django_filters.rest_framework import DjangoFilterBackend
from rlp_records.models import Record, Member, ERC721, RecordLabel
from rlp_records.serializers import RecordLabelSerializer, RecordSerializer, MemberSerializer, ERC721Serializer, AudioFileSerializer
from rest_framework import viewsets, generics, response, parsers
from rest_framework.decorators import action

class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['state', 'recordlabel']

    @action(
        detail=True,
        methods=['PUT'],
        serializer_class=AudioFileSerializer,
        parser_classes=[parsers.MultiPartParser],
    )
    def upload(self, request, pk):
        # TODO: use primary key from request
        #       to associate the audio file and save
        obj = self.get_object()

        serializer = self.serializer_class(obj, 
                                           data=request.data,
                                           partial=True)

        # TODO: On save begin fingerprint compute
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(serializer.errors,
                                 status.HTTP_400_BAD_REQUEST)

class ERC721ViewSet(viewsets.ModelViewSet):
    queryset = ERC721.objects.all()
    serializer_class = ERC721Serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tokenId']

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recordlabel']

class RecordLabelViewSet(viewsets.ModelViewSet):
    queryset = RecordLabel.objects.all()
    serializer_class = RecordLabelSerializer


