import { useEffect, useState } from "react";

import {
    getAllBooks,
    searchBooks,
    filterBooksByGenre,
    getPagedBooks
} from "../services/bookService";

import BookCard from "../components/BookCard";

function HomePage() {

    const [page, setPage] = useState(0);

const [totalPages, setTotalPages] =
    useState(0);

    const [genre, setGenre] = useState("");

    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState("");

    // Fetch all books
    const fetchBooks = async () => {

    try {

        const data =
            await getPagedBooks(page, 6);

        setBooks(data.content);

        setTotalPages(data.totalPages);

    } catch (error) {

        console.log(error);
    }
};

    useEffect(() => {

        fetchBooks();

    }, [page]);

    // Handle search button
    const handleSearch = async () => {

        try {

            if (search.trim() === "") {

                fetchBooks();

                return;
            }

            const data =
                await searchBooks(search);

            setBooks(data);

        } catch (error) {

            console.log(error);
        }
    };

    // Instant frontend filtering
    const filteredBooks = books.filter((book) =>
        book.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    const handleGenreFilter = async (value) => {

    setGenre(value);

    try {

        if (value === "") {

            fetchBooks();

            return;
        }

        const data =
            await filterBooksByGenre(value);

        setBooks(data);

    } catch (error) {

        console.log(error);
    }
};

    return (

        <div className="p-6">

            {/* Search Section */}

            <div className="flex gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search books..."
                    className="
                        border
                        p-3
                        rounded-xl
                        w-full
                    "
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    onClick={handleSearch}
                    className="
                        bg-black
                        text-white
                        px-6
                        rounded-xl
                    "
                >
                    Search
                </button>

            </div>

          <div className="flex items-center gap-4 mb-8">

    <select
        value={genre}
        onChange={(e) =>
            handleGenreFilter(e.target.value)
        }
        className="
            border
            p-3
            rounded-xl
            w-52
        "
    >

        <option value="">
            All Genres
        </option>

        <option value="Programming">
            Programming
        </option>

        <option value="Self Help">
            Self Help
        </option>

        <option value="Fiction">
            Fiction
        </option>

    </select>

</div>
            {/* Books Grid */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                "
            >

                {filteredBooks.length === 0 ? (

                    <p>No books found.</p>

                ) : (

                    filteredBooks.map((book) => (

                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))
                )}

            </div>

            <div className="flex justify-center gap-4 mt-10">

    <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="
            bg-black
            text-white
            px-4
            py-2
            rounded
            disabled:bg-gray-400
        "
    >
        Previous
    </button>

    <span className="text-lg font-semibold">

        Page {page + 1}

    </span>

    <button
        disabled={page >= totalPages - 1}
        onClick={() => setPage(page + 1)}
        className="
            bg-black
            text-white
            px-4
            py-2
            rounded
            disabled:bg-gray-400
        "
    >
        Next
    </button>

</div>

        </div>
    );
}

export default HomePage;