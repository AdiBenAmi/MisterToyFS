import { useEffect, useState } from 'react'

import { toyService } from "../services/toy.service"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    // console.log(toy)

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    
    
    // const isStock = {toy.inStock} ? 'In stock' : 'Out of stock'
    if (!toy) return <div>Loading...</div>

    return(
        <section className="toy-details">
            <img src={toy.imgUrl}/>
            <div className='text-details-container'>
                <h1> {toy.name}</h1>
                <h5>Price: ${toy.price}</h5>
                {toy.inStock&& <h5>In Stock</h5>}
                {!toy.inStock&& <h5>Out of Stock</h5>}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem</p>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to={`/toy`}>Back to toys page</Link>
            </div>
        </section>
    )
}
