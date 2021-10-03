from django.db import models
from django.template.defaultfilters import slugify 


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

class ERC721(models.Model):
    tokenId = models.CharField(max_length=200)
    metadataURI = models.CharField(max_length=200)
    record = models.ForeignKey(Record, on_delete=models.CASCADE, null=True)

def record_upload_path(instance, filename):
    name, extension = filename.split(sep=".")
    name = slugify(name)
    upload_name = name + "." + extension

    # file saved to /uploads/record_id/file_name
    return 'uploads/record_{0}/{1}'.format(instance.record.id, upload_name)

class AudioFile(models.Model):
    sha256 = models.CharField(max_length=200, null=True)
    fingerprint = models.BinaryField(null=True)
    file = models.FileField(upload_to=record_upload_path, null=True)
    record = models.ForeignKey(Record, on_delete=models.CASCADE, null=True)
