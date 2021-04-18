from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI(title='BMSTU. WEB-dev. Lab #2. Service #2')

app.mount("/static", StaticFiles(directory="static/html"), name="static")
app.mount("/img", StaticFiles(directory="static/img"), name="img")

templates = Jinja2Templates(directory="static/html")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/temp2", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("temp2.html", {"request": request})
