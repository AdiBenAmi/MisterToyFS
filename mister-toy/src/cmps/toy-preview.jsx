import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const { name, price, inStock, labels, createdAt } = toy
    const labelsString = labels.join(', ')
    const isStock = inStock ? 'In stock' : 'Out of stock'
    const classNameColor = inStock ? 'green' : 'red'

    return <article className="toy-preview">
        <h4>{name}</h4>
        <h1>🎎</h1>
        <p>Price: <span>${price}</span></p>
        <p className={classNameColor}>{isStock}</p>
        {/* {labels.length > 0 && <p>{labelsString}</p>} */}
        <hr/>
        <Link to={`/toy/${toy._id}`}>Details</Link> | 
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> 

    </article>
}