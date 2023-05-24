// import logo from '../assets/img/logo.png'
import { useDispatch, useSelector } from "react-redux"

export function HomePage() {

    const count = useSelector((storeState) => storeState.userModule.count)

    // const imgUrl = "logo.png"
    return (
        <section>
          <h1>Hello from home page</h1>

        </section >
    )
}