import {toyService} from '../services/toy.service'
import { store } from './store.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY, SET_FILTERBY, SET_FILTERBY_SEARCH} from './toy.reducer'


export function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

// export function toggleTodo(todo) {
//     return todoService.save(todo)
//         .then(savedTodo => {
//             store.dispatch({type: TOGGLE_IS_DONE , todo: savedTodo })
//             console.log(savedTodo)
//             return savedTodo
//         })
//         .catch(err => {
//             console.log('todo action -> Cannot update id the todo id done todo', err)
//             throw err
//         })
// }

export function setFilterBy(filterBy) {
    return store.dispatch({type: SET_FILTERBY, filterBy: filterBy})
}

export function setFilterBySearch(filterBy){
    return store.dispatch({type: SET_FILTERBY_SEARCH, filterBy: filterBy})
}