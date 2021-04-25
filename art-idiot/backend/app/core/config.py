import os

PROJECT_NAME = "art-idiot"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api/v1"

VERSION = "0.0.1"

DESCRIPTION = f"Сервис {PROJECT_NAME} предназначен для знакомства с возможностями и недостатками ИИ"

TAGS_METADATA = [
    {
        "name": "zebrate",
        "description": "Преобразование изображения лошади в зебру с помощью технологии GAN",
    },
    {
        "name": "ai-chat",
        "description": "Общение с ИИ в текстовом чате",
    },
    {
        "name": "voice-ai-chat",
        "description": "Общение с ИИ в голосовом чате",
    },
    {
        "name": "auth",
        "description": "Авторизация и регистрация",
    },
    {
        "name": "users",
        "description": "Управление пользователями сервиса",
    },
    {
        "name": "default",
        "description": "Системные методы",
    },
]
