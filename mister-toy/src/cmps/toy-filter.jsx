import { toyService } from "../services/toy.service.js"
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useSelector } from 'react-redux'
import { MultipleSelectChip } from "./multiple-select-mui.jsx"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export function ToyFilter({ onSetFilter, filterBy, onSetSortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortBy, setSortBy] = useState(toyService.getDefaultSortBy())
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered', 'Education', 'Wooden']
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        onSetSortBy(sortBy)
        // eslint-disable-next-line
    }, [filterByToEdit, sortBy])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function handleChangeSortBy({ target }) {
        // console.log('value:', target.value)
        setSortBy((prevSortBy) => ({ ...prevSortBy, type: target.value }))
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
            <MultipleSelectChip labels={labels} setFilterByToEdit={setFilterByToEdit} />

            <FormControl sx={{ m: 1, width: 150, margin: 2, }}>
                    <InputLabel id="select-label">Sort By</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={sortBy.type}
                        label="label"
                        onChange={handleChangeSortBy}>
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'price'}>Price</MenuItem>
                        <MenuItem value={'createdAt'}>Created at</MenuItem>
                    </Select>
            </FormControl>
        </section>

    )
}