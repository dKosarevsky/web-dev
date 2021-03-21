from datetime import datetime as dt

from typing import List

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import MovieIn, MovieOut, MovieUpdate
from . import db_manager

movies = APIRouter()


@movies.options("/", status_code=status.HTTP_200_OK)
async def get_options():
    data = {
        "Allow": "OPTIONS, GET, POST, PUT, DELETE",
        "Date": f'{dt.now().strftime("%A, %d %B %Y %H:%M:%S")} GMT',
    }
    json_compatible_item_data = jsonable_encoder(data)
    return JSONResponse(content=json_compatible_item_data)


@movies.get("/", status_code=status.HTTP_200_OK, response_model=List[MovieOut])
async def get_movies_list():
    return await db_manager.get_all_movies()


@movies.get("/{movie_id}", status_code=status.HTTP_200_OK, response_model=MovieOut)
async def get_movie(movie_id: int):
    movie = await db_manager.get_movie(movie_id)
    if not movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Movie with id={movie_id} not found")
    return movie


@movies.post("/", response_model=MovieOut, status_code=status.HTTP_201_CREATED)
async def add_movie(payload: MovieIn):
    movie_id = await db_manager.add_movie(payload)
    response = {
        'id': movie_id,
        **payload.dict()
    }

    return response


@movies.put("/{movie_id}", status_code=status.HTTP_200_OK, response_model=None)
async def update_movie(movie_id: int, payload: MovieUpdate):
    movie = await db_manager.get_movie(movie_id)
    if not movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Movie with id={movie_id} not found")

    update_data = payload.dict(exclude_unset=True)

    movie_in_db = MovieIn(**movie)

    updated_movie = movie_in_db.copy(update=update_data)

    await db_manager.update_movie(movie_id, updated_movie)
    return f"Movie: {updated_movie.name} with id={movie_id} updated."


@movies.delete("/{movie_id}", status_code=status.HTTP_200_OK, response_model=None)
async def delete_movie(movie_id: int):
    movie = await db_manager.get_movie(movie_id)
    if not movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Movie with id={movie_id} not found")
    await db_manager.delete_movie(movie_id)
    return f"Movie with id={movie_id} deleted."
