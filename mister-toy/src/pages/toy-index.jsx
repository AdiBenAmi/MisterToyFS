import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {toyService} from '../services/toy.service'
import { ToyList } from '../cmps/toy-list'
import {ToyFilter} from '../cmps/toy-filter'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/toy.action'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyIndex() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toys, filterBy} = useSelector((storeState) => storeState.toyModule)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function setFilterIsInStock(value) {
        setFilterBy({ ...filterBy, inStock: value })
    }

    // function onFilterBySearch({ target }) {
    //     const field = target.name
    //     console.log('field:', field)
    //     const value = target.type === 'number' ? (+target.value || '') : target.value
    //     console.log('value:', value)
    //     setFilterBySearch({ ...filterBy, [field]: value })
    // }

    
    function onSetFilter(filterBy) {
        console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }


    return (
        <section className=' main-index full'>
            <main className='main-layout'>
                <section className='operating-container full'>
                    <Link className='add-toy-link' to={`/toy/edit`}>Click to add Toy</Link>
                    <ToyFilter
                    onClickInStock={() => setFilterIsInStock(true)}
                    onSetFilter={onSetFilter} 
                    filterBy={filterBy}
                    />
                </section>

                {/* <button onClick={onAddToy}>Add new toy</button> */}
                <ToyList 
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={(toy)=>navigate(`/toy/${toy._id}`)}                    
                />

                {isLoading && <h4 className="loading-message">Loading...</h4>}


                {/* {isLoading && <h4>Loading...</h4>} */}
            </main>
        </section>
    )
}