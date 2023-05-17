import { useState, useEffect } from "react"

function Home () {

    const[specials, setSpecials] = useState(null);

    async function fetchSpecials() {
        try {
            let mySpecials = await fetch('http://localhost:4000/');
            mySpecials = await mySpecials.json();
            console.log(mySpecials)
            setSpecials(mySpecials);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchSpecials();
    }, [])
    return(
        <>
        {specials ? specials.map((special, idx) => {
            return(
                <div key={idx}>
                <h2>{special.name}</h2>
                </div>
            )
        }) : <h2>...Loading</h2>}
        </>
    )
}

export default Home