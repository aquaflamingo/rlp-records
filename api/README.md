# RLP Records Django API

This is the backend Django API that stores information related to the RLP Records application

## Getting Started
### Requirements
The application uses `pyacoustid` to perform fingerprinting via `chromaprint` library. This requires some pre work to get associated `dyllib`s available:

See https://pypi.org/project/pyacoustid/

> First, install the Chromaprint fingerprinting library by Lukas Lalinsky. (The library itself depends on an FFT library, but it’s smart enough to use an algorithm from software you probably already have installed; see the Chromaprint page for details.) This module can use either the Chromaprint dynamic library or the fpcalc command-line tool, which itself depends on libavcodec. If you use fpcalc, either ensure that it is on your $PATH or set the FPCALC environment variable to its location.

### Steps
Initialize your virtual environment if you have not already done so:
```bash
python -m venv venv

. venv/bin/activate
```

Install requirements from `requirements.txt`

```bash
pip install -r requirements.txt
```

You can then run the server via:
```bash
python manage.py runserver
```

## Fixtures
There re two default fixtures present in the `Fixtures` folder  for a record and record label you can load them via Makefile commands
