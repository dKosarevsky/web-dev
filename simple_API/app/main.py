import logging
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from api.custom_logging import CustomizeLogger
from api.movies import movies
from api.db import metadata, database, engine

logger = logging.getLogger(__name__)
config_path = Path(__file__).with_name("logging_config.json")

metadata.create_all(engine)


def create_app() -> FastAPI:
    app_ = FastAPI(title='BMSTU. WEB-dev. Labs')
    logger_ = CustomizeLogger.make_logger(config_path)
    app_.logger = logger_

    return app_


app = create_app()

app.mount("/static", StaticFiles(directory="static/html"), name="static")
app.mount("/img", StaticFiles(directory="static/img"), name="img")

templates = Jinja2Templates(directory="static/html")


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("hack.txt", {"request": request})


@app.get("/hack", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/index", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


app.include_router(movies, prefix='/api/v1/movies', tags=['movies'])
