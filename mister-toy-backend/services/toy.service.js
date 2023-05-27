const fs = require('fs')
var toys = require('../data/toy.json')

function query(filterBy = {}, sortBy={}) {
    let toysToDisplay = toys
    const { name, labels, inStock, maxPrice} = filterBy
    // console.log(filterBy)

    if (name) {
        const regExp = new RegExp(name, 'i')
        toysToDisplay = toys.filter(toy => regExp.test(toy.name))
    }

    if (labels && labels.length >0) {
        const labels = Array.isArray(filterBy.labels) ? filterBy.labels : filterBy.labels.split(',')
        toysToDisplay = toysToDisplay.filter(toy => labels.every(l => toy.labels.includes(l)))
    }

    if (inStock === 'true' || inStock === 'false') {
        console.log('filterBy:', filterBy)
        toysToDisplay = toysToDisplay.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }

    if (maxPrice !== undefined && maxPrice !== '') {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= maxPrice)
    }

    toysToDisplay = _getSortedToys(toysToDisplay, sortBy)

    return Promise.resolve(toysToDisplay)
}

function _getSortedToys(toysToDisplay, sortBy) {
    // console.log('sortBy:', sortBy)
    sortBy.desc = -1
    if (sortBy.type === 'name') {
        console.log('sorting by name')
        toysToDisplay.sort((t1, t2) => {
            if (t1.name < t2.name) return -1
            if (t1.name >= t2.name) return 1
        })
    } else {
        toysToDisplay.sort((b1, b2) => (sortBy.desc) * (b2[sortBy.type] - b1[sortBy.type]))
    }
    return toysToDisplay
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.labels = [...toy.labels]
        toyToUpdate.imgUrl=toy.imgUrl
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            // console.log('The file was saved!');
            resolve()
        });
    })
}

module.exports = {
    query,
    get,
    remove,
    save
}