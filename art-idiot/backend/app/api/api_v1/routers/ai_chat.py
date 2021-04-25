from fastapi import APIRouter, Request, Depends, Response, encoders, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from pydantic import BaseModel

from datetime import datetime as dt
import requests

ai_chat_router = r = APIRouter()

rupgt3_url = "https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict"


class UserQuestion(BaseModel):
    question: str


@r.options("/rugpt3", status_code=status.HTTP_200_OK)
async def get_options():
    data = {
        "Allow": "OPTIONS, GET, POST",
        "Date": f'{dt.now().strftime("%A, %d %B %Y %H:%M:%S")} GMT',
    }
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(content=json_compatible_item_data)


@r.post("/rugpt3")
async def rugpt3_answer(user_question: UserQuestion):
    user_question = user_question.question
    headers = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Connection": "keep-alive",
    }
    payload = {
        "text": user_question
    }
    response = requests.post(rupgt3_url, headers=headers, json=payload)

    if response.status_code in [200, ]:
        response = response.json()
        ai_answer = response.get("predictions")
        if user_question == ai_answer[:len(user_question)]:
            ai_answer = ai_answer[len(user_question):]

        data = {"message": ai_answer}
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)

    return {"message": f"""
                Что-то пошло не так...\n
                Код ошибки: {response.status_code}\n
                Текст ошибки: {response.text}\n
            """}
