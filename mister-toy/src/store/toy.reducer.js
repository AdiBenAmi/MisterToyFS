import { toyService } from "../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_LABELS = 'SET_LABELS'

export const SET_FILTERBY = 'SET_FILTERBY'
export const SET_FILTERBY_SEARCH = 'SET_FILTERBY_SEARCH'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
}

export function toyReducer(state = initialState, action) {
    // console.log('action', action)
    let toys
    let labels
    let filterBy


    switch (action.type) {
        // Toys
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }        
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_LABELS:
            return { ...state, labels: action.labels }    
        case REMOVE_TOY:
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        //FILTER
        case SET_FILTERBY:
            return { ...state, filterBy: action.filterBy }
        case SET_FILTERBY_SEARCH:
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}