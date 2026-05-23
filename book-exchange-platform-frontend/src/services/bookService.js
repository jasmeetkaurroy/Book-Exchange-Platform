import API from "../api/axios";

// Get all books
export const getAllBooks = async () => {

    const response = await API.get("/books");

    return response.data;
};

// Search books
export const searchBooks = async (title) => {

    const response = await API.get(
        `/books/search?title=${title}`
    );

    return response.data;
};

export const getBookById = async (id) => {
    const response = await API.get(`/books/${id}`);
    return response.data;
};


export const filterBooksByGenre = async (genre) => {

    const response =
        await API.get(
            `/books/filter?genre=${genre}`
        );

    return response.data;
};

export const getPagedBooks = async (
    page,
    size
) => {

    const response =
        await API.get(
            `/books/paged?page=${page}&size=${size}`
        );

    return response.data;
};

export const getMyBooks = async () => {
    const response = await API.get("/books/my-books");
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await API.delete(`/books/${id}`);
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const response = await API.put(`/books/${id}`, bookData);
    return response.data;
};