from django.db import models

class ERC721(models.Model):
    tokenId = models.CharField(max_length=200)
    metadataURI = models.CharField(max_length=200)

class RecordLabel(models.Model):
    name = models.CharField(max_length=200)

class Member(models.Model):
    name = models.CharField(max_length=200)
    recordlabel = models.ForeignKey(RecordLabel, on_delete=models.CASCADE, null=True)

class Record(models.Model):
    class RecordState(models.TextChoices):
        DRAFT = 'DRAFT'
        MINTED = 'MINTED'
        PUBLISHED = 'PUBLISHED'

    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    state = models.CharField(choices=RecordState.choices, max_length=200)

    recordlabel = models.ForeignKey(RecordLabel, on_delete=models.CASCADE)
    token = models.ForeignKey(ERC721, on_delete=models.CASCADE, null=True)


class AudioFile(models.Model):
    sha256 = models.CharField(max_length=200, null=True)
    fingerprint = models.BinaryField(null=True)
    value = models.BinaryField(null=True)
    record = models.ForeignKey(Record, on_delete=models.CASCADE, null=True)
