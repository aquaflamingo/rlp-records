# RLP Records Django API

This is the backend Django API that stores information related to the RLP Records application

## Getting Started
### Fingerprinting
The application uses `pyacoustid` to perform fingerprinting via `chromaprint` library. This requires some pre work to get associated `dyllib`s.

See https://pypi.org/project/pyacoustid/

Chromaprint can be installed via homebrew

```bash
brew install chromaprint
````

### Running the Server
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

```bash
NAME=record_labels make db.py.loadfixtures
```
