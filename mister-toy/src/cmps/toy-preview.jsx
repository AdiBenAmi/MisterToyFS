import { Link } from "react-router-dom";
// import toyImg from "../assets/img/toy-logo.png"

export function ToyPreview({ toy }) {
    const { name, price, inStock, labels, createdAt, imgUrl } = toy
    const labelsString = labels.join(', ')
    const isStock = inStock ? 'In stock' : 'Out of stock'
    const classNameColor = inStock ? 'green' : 'red'

    return <article className="toy-preview">
        <div className="img-wrapper">
            <img src={imgUrl}/>
        </div>
        <h4>{name}</h4>
        <p>Price: <span>${price}</span></p>
        <p className={classNameColor}>{isStock}</p>
        {labels.length > 0 && <p>{labelsString}</p>}
        
        {/* <Link className="btn btn-details" to={`/toy/${toy._id}`}>Details</Link> 
        <Link className="btn btn-edit" to={`/toy/edit/${toy._id}`}>|Edit</Link>  */}

    </article>
}