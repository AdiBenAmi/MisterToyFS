import {storageService} from './async-storage.service'
import {utilService} from './util.service'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    // getActiveTodosCount
}

function query(filterBy={}) {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(BASE_URL, filterBy)
            .then(toys => {
                if (filterBy.name) {
                    const regExp = new RegExp(filterBy.name, 'i')
                    toys = toys.filter(toy => regExp.test(toy.name))
                }

                // if (filterBy.inStock !== undefined) {
                //     toys= toys.filter(toy => toy.inStock === filterBy.inStock)
                // }
                return toys
            })
}

function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)

    // if (toy._id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     // when switching to backend - remove the next line
    //     // todo.owner = userService.getLoggedinUser()
    //     return storageService.post(STORAGE_KEY, toy)
    // }
}

function getDefaultFilter() {
    return { name:'', inStock: undefined, labels:[], sortBy: [], maxPrice:'' }
}

function getEmptyToy() {
    return { 
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgUrl: ''
    }
}

//DEMO DATA
function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Talking Oshri',
                price: 200,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Talking Hemos',
                price: 199,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Talking Puki',
                price: 90,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't105',
                name: 'Talking Muki',
                price: 150,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true,
            }
        ]

        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}


