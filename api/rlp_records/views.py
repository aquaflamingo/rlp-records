from django_filters.rest_framework import DjangoFilterBackend
from rlp_records.models import Record, Member, ERC721, RecordLabel, Event
from rlp_records.serializers import RecordLabelSerializer, RecordSerializer, MemberSerializer, ERC721Serializer, AudioFileSerializer, EventSerializer
from rest_framework import viewsets, mixins, response, parsers, status
from rest_framework.decorators import action
import IPython

# Support by default:
#   - CREATE
#   - DESTROY
#   - LIST
class RecordViewSet(mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        viewsets.GenericViewSet):
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
        # FIXME: Use S3 or host NFS to store this lel
        audio_upload_data = {"record": pk, "file": request.data['file']}

        serializer = self.serializer_class(data=audio_upload_data,
                partial=True)

        # TODO: On save begin fingerprint compute
        # Async job on save
        if serializer.is_valid():
            serializer.save()
            return response.Response({"message": "success"})
        return response.Response(serializer.errors,
                status.HTTP_400_BAD_REQUEST)

# NOTE 
#   READ ONLY
class ERC721ViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = ERC721.objects.all()
    serializer_class = ERC721Serializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tokenId', 'record']

class MemberViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recordlabel']

class RecordLabelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = RecordLabel.objects.all()
    serializer_class = RecordLabelSerializer

class EventViewSet(mixins.CreateModelMixin, 
        mixins.RetrieveModelMixin, 
        mixins.ListModelMixin, 
        viewsets.GenericViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['attributed_to']


    def build_erc721(self, record_id, token_id, metadata_uri):
        record = Record.objects.get(pk=record_id)
        return ERC721Serializer(
                record = record,
                tokenid = token_id,
                metadata_uri = metadata_uri
                )

    def build_mint_event(self, proof, record_id, details):
        record = Record.objects.get(pk=record_id)
        attributed_to = record.recordlabel

        return EventSerializer(
                proof=proof, 
                event_type=Event.EventType.MINT, 
                attributed_to=attributed_to,
                details = details
                )

    def validate_create_request(self, req_data):
        etype = req_data['event_type']

        if etype == "":
            return response.Response("Event type cannot be blank", status.HTTP_400_BAD_REQUEST)

        if not etype.upper() == 'MINT':
            return response.Response("Invalid event_type", status.HTTP_400_BAD_REQUEST)

        record_id = req_data['details']['recordId']

        if record_id == "":
            return response.Response("Record id cannot be blank", status.HTTP_400_BAD_REQUEST)

        exists = Record.objects.filter(pk=record_id).exists()

        if not exists:
            return response.Response("Associated record does not exist", status.HTTP_404_NOT_FOUND)

        return None

    def create(self, request):
        error = self.validate_create_request(request.data)

        if error:
            return error

        proof = request.data['proof']
        record_id = request.data['details']['recordId']
        token_id = request.data['details']['tokenId']
        metadata_uri = request.data['details']['metadtaURI']
        details = request.data['details']

        mint_event = self.build_mint_event(proof, record_id, details)
        if mint_event.is_valid():
            mint_event.save()
        else:
            return response.Response(mint_event.errors, status.HTTP_400_BAD_REQUEST)

        erc721 = self.build_erc721(record_id, token_id, metadata_uri)
        if erc721.is_valid():
            erc721.save()
        else:
            return response.Response(erc721.errors, status.HTTP_400_BAD_REQUEST)
