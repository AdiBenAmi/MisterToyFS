
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
        <section className="todo-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">name: </label>
                <input type="text"
                id="name"
                name="name"
                placeholder="Search toy By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />
                {/* in stock means - true */}
                {/* <button className="btn" onClick={onClickInStock}>In stock</button> */}
            </form>
        </section>


    )
}