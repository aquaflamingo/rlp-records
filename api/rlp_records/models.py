from django.db import models

class ERC721(models.Model):
    tokenId = models.CharField(max_length=200)
    metadataURI = models.CharField(max_length=200)

class RecordLabel(models.Model):
    name = models.CharField(max_length=200)

class Member(models.Model):
    name = models.CharField(max_length=200)
    recordlabel = models.ForeignKey(RecordLabel, on_delete=models.CASCADE)

class Record(models.Model):
    class RecordState(models.TextChoices):
        DRAFT = 'DRAFT'
        MINTED = 'MINTED'
        PUBLISHED = 'PUBLISHED'

    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    state = models.CharField(choices=RecordState.choices, max_length=200)

    # Audio
    audio_hash = models.CharField(max_length=200)
    fingerprint = models.BinaryField()

    recordlabel = models.ForeignKey(RecordLabel, on_delete=models.CASCADE)
    token = models.ForeignKey(ERC721, on_delete=models.CASCADE)
