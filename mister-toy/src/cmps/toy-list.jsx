import { ToyPreview } from "./toy-preview"
import { Link } from "react-router-dom";


export function ToyList({toys, onRemoveToy, onEditToy}){

    return(
        <ul className="toy-list full">
            {toys.map(toy =>
             <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    {/* <button onClick={() => { onEditToy(toy) }}>Details</button> */}
                    <Link className="btn btn-details" to={`/toy/${toy._id}`}>Details </Link> 
                    <Link className="btn btn-edit" to={`/toy/edit/${toy._id}`}>| Edit</Link> 
                    <button className="btn-delete-toy" onClick={() => { onRemoveToy(toy._id) }}> | Delete</button>
                </div>

                {/* <button className="buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button> */}
            </li>)}
        </ul>

    )
}