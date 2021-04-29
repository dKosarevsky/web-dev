from fastapi import APIRouter, Request, Depends, Response, encoders, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from pydantic import BaseModel

from datetime import datetime as dt

zebrate_router = r = APIRouter()


class UserImage(BaseModel):
    image: str


@r.options("/zebrate", status_code=status.HTTP_200_OK)
async def get_options():
    data = {
        "Allow": "OPTIONS, GET, POST",
        "Date": f'{dt.now().strftime("%A, %d %B %Y %H:%M:%S")} GMT',
    }
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(content=json_compatible_item_data)


@r.post("/zebrate")
async def genetate_zebra(user_image: UserImage):
    user_image = user_image.image


    # if response.status_code in [200, ]:
    #     response = response.json()
    #     ai_answer = response.get("predictions")
    #     if user_question == ai_answer[:len(user_question)]:
    #         ai_answer = ai_answer[len(user_question):]
    #
    #     data = {"message": ai_answer}
    #     json_compatible_item_data = jsonable_encoder(data)
    #     return JSONResponse(content=json_compatible_item_data)
    #
    # return {"message": f"""
    #             Что-то пошло не так...\n
    #             Код ошибки: {response.status_code}\n
    #             Текст ошибки: {response.text}\n
    #         """}

    return f"zebrate test {user_image}"
