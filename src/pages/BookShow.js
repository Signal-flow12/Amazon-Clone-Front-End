import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function BookShow () {
    const { bookId } = useParams();
    //console.log(bookId)
    const [ book, setBook ] = useState(null);
    
    async function getBook() {
        try {
            let myBook = await fetch (`http://localhost:4000/books/${bookId}`)
            myBook = await myBook.json();
            console.log(myBook)
            setBook(myBook);
            //console.log(myBooks)
        }catch(err) {
            console.log(err)
        }
    }

    //console.log(`This is my books ${JSON.stringify(book)}`)

    useEffect(() => {
        getBook()
    }, [])

    function loaded () {
        return (
            <div>
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <h2>{book.price}</h2>
            </div>
        )
    }

    function loading () {
        return (
            <h1>Loading....</h1>
        )
    }

    return(
        <div>
            {book ? loaded() : loading()}
        </div>
    )
}

export default BookShow