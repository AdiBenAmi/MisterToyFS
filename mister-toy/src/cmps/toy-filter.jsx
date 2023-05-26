
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilter, filterBy, onClickInStock }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="toy-filter">
            <form className="search-input-form" onSubmit={onSubmitFilter}>
                <label htmlFor="name">Search :</label>
                <input className="search-input-field" type="text"
                    id="name"
                    name="name"
                    placeholder="Search by name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    ref={elInputRef}
                />

                <label htmlFor="inStock"> In stock</label>
                <select id="inStock" name="inStock" onChange={handleChange}>
                    <option value={null}>All</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice}
                    onChange={handleChange}
                    ref={elInputRef}
                />

            </form>
        </section>

    )
}