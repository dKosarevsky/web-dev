from fastapi import APIRouter, Request, Depends, Response, encoders
import requests

ai_chat_router = r = APIRouter()

rupgt3_url = "https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict"


@r.get("/rugpt3")
async def rugpt3_answer():
    user_question = "Есть ли жизнь на Марсе?"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "text": user_question
    }
    response = requests.post(rupgt3_url, headers=headers, json=payload)

    if response.status_code in [200, ]:
        response = response.json()
        ai_answer = response.get('predictions')
        ai_answer = ai_answer.replace(user_question, "")

        return {"message": ai_answer}

    return {"message": f"""
                Что-то пошло не так...\n 
                Код ошибки: {response.status_code}\n
                Текст ошибки: {response.text}\n
            """}
