import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function BooksIndex () {

    const [books, setBooks] = useState([]);

    const [booksForm, setBooksForm] = useState({
        title: "",
        author: " ",
        number: 0

    })

    async function getBooks() {
        try {
            let myBooks = await fetch ('http://localhost:4000/books/')
            myBooks = await myBooks.json();
            //console.log(`This is my books ${JSON.stringify(myBooks)}`)
            setBooks(myBooks);
            //console.log(myBooks)
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBooks()
    }, [])


    function handleChange (e) {
        setBooksForm((previousFormState) => ({
             ...previousFormState,
            [e.target.name]: e.target.value
        }))
    }
    console.log(booksForm)

    async function handleSubmit (e) {
        try {
            e.preventDefault();
            const myNewBook = await fetch('http://localhost:4000/books/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booksForm)
            })
            //console.log(booksForm)
            getBooks();
            e.target.reset();

        }catch(err){
            console.log(err)
        }
    }

    function loaded(arr) {
        return(
            <>
                {arr.map((book, idx) => {
                    return(
                        <div key={idx}>
                            <Link to={`/books/${book._id}`}>
                                <h2>Title: {book.title}</h2>
                            </Link>
                            <h3>Author: {book.author}</h3>
                            <h3>Price: ${book.price}</h3>
                            <hr />
                        </div>
                    )
                })}
            </>
        )
    }
    

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input 
            type="text"
            name="title" 
            placeholder="booktitle"
            onChange={handleChange} />
           
            <label>Author:</label>
            <input
            type="text"
            name="author" 
            placeholder="author"
            onChange={handleChange}  />
        
            <label>Price:</label>
            <input 
            type="number"
            name="price" 
            placeholder="price" 
            onChange={handleChange} />

            <button value="submit">Submit</button>
        </form>
            {books.length ? loaded(books) : <h2>Loading...</h2>}
        </>
    )
 }

export default BooksIndex;