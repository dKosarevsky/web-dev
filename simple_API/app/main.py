from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
# Use this to serve a static/index.html
from starlette.responses import RedirectResponse

from .api.movies import movies
from .api.db import metadata, database, engine

metadata.create_all(engine)

app = FastAPI(title="BMSTU. WEB-dev. Lab#001")

app.mount("/static", StaticFiles(directory="app/static/html"), name="static")


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/", tags=["static"])
async def read_index():
    return RedirectResponse(url="/static/hack.txt")


@app.get("/hack", tags=["static"])
async def read_index_from_hack():
    return RedirectResponse(url="/static/index.html")


@app.get("/index", tags=["static"])
async def read_index_from_index():
    return RedirectResponse(url="/static/index.html")


app.include_router(movies, prefix='/api/v1/movies', tags=['movies'])
