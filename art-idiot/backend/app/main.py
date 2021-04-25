from fastapi import FastAPI, Depends, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from starlette.requests import Request

import uvicorn
import logging
from app.utils.custom_logging import CustomizeLogger
from pathlib import Path

from app.api.api_v1.routers.users import users_router
from app.api.api_v1.routers.auth import auth_router
from app.api.api_v1.routers.ai_chat import ai_chat_router
from app.core import config
from app.db.session import SessionLocal
from app.core.auth import get_current_active_user
from app.core.celery_app import celery_app
from app import tasks

from datetime import datetime as dt

logger = logging.getLogger(__name__)
config_path = Path(__file__).with_name("logging_config.json")

app = FastAPI(
    title=config.PROJECT_NAME,
    description=config.DESCRIPTION,
    version=config.VERSION,
    openapi_tags=config.TAGS_METADATA,
    docs_url="/api/docs",
    openapi_url="/api",
)

app_logger_ = CustomizeLogger.make_logger(config_path)
app.logger = app_logger_


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.options("/", status_code=status.HTTP_200_OK)
async def get_options():
    data = {
        "Allow": "OPTIONS, GET, POST, PUT, DELETE",
        "Date": f'{dt.now().strftime("%A, %d %B %Y %H:%M:%S")} GMT',
    }
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(content=json_compatible_item_data)


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


@app.get("/api/v1/task")
async def example_task():
    celery_app.send_task("app.tasks.example_task", args=["Hello World"])

    return {"message": "success"}


# Routers
# app.include_router(zebrate_router, prefix="/api/v1", tags=["zebrate"])
app.include_router(ai_chat_router, prefix="/api/v1", tags=["ai-chat"])
# app.include_router(voice_ai_chat_router, prefix="/api/v1", tags=["voice-ai-chat"])
app.include_router(
    users_router,
    prefix="/api/v1",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)
app.include_router(auth_router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
