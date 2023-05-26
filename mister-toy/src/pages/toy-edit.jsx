import { toyService } from '../services/toy.service'
import { useEffect, useState } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
        // eslint-disable-next-line
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        // console.log('target:', target)
        // console.log('target:', target.value)
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function handleChangeInStock() {
        setToyToEdit((prevToy) =>
            ({ ...prevToy, inStock: !prevToy.inStock }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/Toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return (
        <section className="toy-edit">
            <img src={toyToEdit.imgUrl} />
            <div className='edit-content-container'>
                <h2>{toyToEdit._id ? 'Edit toy information' : 'Add a new toy'}</h2>
                <form onSubmit={onSaveToy}>
                    <label htmlFor="name">Name : </label>
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder="Enter toy name..."
                        value={toyToEdit.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Price : </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                    />
                    <label htmlFor="imgUrl">Image url : </label>
                    <input type="text"
                        name="imgUrl"
                        id="imgUrl"
                        placeholder="Enter image adress"
                        value={toyToEdit.imgUrl}
                        onChange={handleChange}
                    />
                    {/* here */}
                    <label htmlFor="labels">Labels : </label>
                    <input type="text" //?
                        name="labels"
                        id="labels"
                        placeholder="Enter image adress"
                        value={toyToEdit.labels}
                        onChange={handleChange}
                    />

                    <label htmlFor="inStock">inStock : </label>
                    <input type="checkbox" name="inStock" value={toyToEdit.inStock} onChange={handleChangeInStock} checked={toyToEdit.inStock} />

                    <div>
                        <button className="btn btn-save">{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                </form>
            </div>


        </section>
    )
}