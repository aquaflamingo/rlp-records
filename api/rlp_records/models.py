from django.db import models

class Record(models.Model):
    class RecordState(models.TextChoices):
        DRAFT = 'DRAFT'
        MINTED = 'MINTED'
        PUBLISHED = 'PUBLISHED'

    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    state = models.CharField(choices=RecordState.choices)
    label = #TODO ref
    token = #TODO ref
    fingerprint = #TODO buffer


class RecordLabel(models.Model):
    name = models.CharField(max_length=200)
    # TODO date
    established = models.CharField(max_length=4)

class Member(models.Model):
    name = models.CharField(max_length=200)

class RLPRecordToken(models.Model):
    # TODO

