import apiRequest from ".";

export const AddMovie = async (data) => {
    return await apiRequest({
        method: "POST",
        endPoint: "/api/movies/add",
        payload: data,
    });
}

export const GetAllMovies = async () => {
    return await apiRequest({
        method: "GET",
        endPoint: "/api/movies",

    });
}


export const GetMovieById = async (id) => {
    return await apiRequest({
        method: "GET",
        endPoint: `/api/movies/${id}`,

    });
}


export const UpdateMovie = async (id, data) => {
    return await apiRequest({
        method: "PUT",
        endPoint: `/api/movies/${id}`,
        payload: data,

    });
}

export const DeleteMovie = async (id) => {
    return await apiRequest({
        method: "DELETE",
        endPoint: `/api/movies/${id}`,

    });
}

