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
    filterset_fields = ['tokenid', 'record']

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


    def build_erc721(self, record, token_id, metadata_uri):
        return ERC721Serializer(data={
            'record': record.id,
            'tokenid': token_id,
            'metadata_uri' :metadata_uri
            })

    def build_mint_event(self, proof, record, details):
        attributed_to = record.recordlabel

        return EventSerializer(data= {
                    'proof': proof, 
                    'event_type': Event.EventType.MINT, 
                    'attributed_to': attributed_to.id, 
                    'details': details
                    })

    def validate_create_request(self, req_data):
        proof = req_data.get('proof')

        if proof == None or proof == "":
            return response.Response("Proof cannot be blank", status.HTTP_400_BAD_REQUEST)

        etype = req_data.get('event_type')

        if  etype == None or etype == "":
            return response.Response("Event type cannot be blank", status.HTTP_400_BAD_REQUEST)

        if not etype.upper() == 'MINT':
            return response.Response("Invalid event_type", status.HTTP_400_BAD_REQUEST)

        details = req_data.get('details')
        # Needs to be dictionary
        if details == None or not isinstance(details, dict):
            return response.Response("Invalid details cannot be blank", status.HTTP_400_BAD_REQUEST)

        record_id = details.get("recordId") 

        if record_id == None or record_id == "":
            return response.Response("Detail's recordId cannot be blank", status.HTTP_400_BAD_REQUEST)

        exists = Record.objects.filter(pk=record_id).exists()

        if not exists:
            return response.Response("Associated record for recordId does not exist", status.HTTP_404_NOT_FOUND)

        token_id = details.get("tokenId") 

        if token_id == None or token_id == "":
            return response.Response("Detail's tokenId cannot be blank", status.HTTP_400_BAD_REQUEST)

        metadata_uri = details.get("metadataURI") 

        if metadata_uri == None or metadata_uri == "":
            return response.Response("Detail's metadataURI cannot be blank", status.HTTP_400_BAD_REQUEST)

        return None

    def create(self, request):
        error = self.validate_create_request(request.data)

        if error:
            return error

        proof = request.data['proof']
        details = request.data['details']

        record = Record.objects.get(pk=details['recordId'])
        token_id = details['tokenId']
        metadata_uri = details['metadataURI']

        mint_event = self.build_mint_event(proof, record, details)
        if mint_event.is_valid():
            mint_event.save()
        else:
            return response.Response(mint_event.errors, status.HTTP_400_BAD_REQUEST)

        erc721 = self.build_erc721(record, token_id, metadata_uri)
        if erc721.is_valid():
            erc721.save()
        else:
            return response.Response(erc721.errors, status.HTTP_400_BAD_REQUEST)

        record.state = Record.RecordState.MINTED
        record.save()

        return response.Response(mint_event.data, status.HTTP_201_CREATED)
