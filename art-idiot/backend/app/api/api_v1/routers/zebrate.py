from fastapi import APIRouter, Request, Depends, Response, encoders, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from pydantic import BaseModel

from datetime import datetime as dt

from app.utils.zebrate import generate_zebra_from_link, generate_zebra_from_image, validate_url

zebrate_router = r = APIRouter()


class UserLink(BaseModel):
    link: str


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


@r.post("/zebrate_link", status_code=status.HTTP_200_OK)
async def genetate_zebra_from_link(user_link: UserLink):
    user_link = user_link.link

    horse_url = validate_url(user_link)
    if horse_url is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Link did not pass validation. Your link: {user_link}"
        )

    zebra_img_bin, horse_img_bin = generate_zebra_from_link(horse_url)

    data = {"zebra_img": zebra_img_bin}
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(content=json_compatible_item_data)


@r.post("/zebrate")
async def genetate_zebra_from_image(user_image: UserImage):
    user_image = user_image.image

    # TODO make generator from image great again

    zebra_img_bin, horse_img_bin = generate_zebra_from_image(user_image)

    return f"zebrate test {user_image}"
