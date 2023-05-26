import { useDispatch, useSelector } from "react-redux"
import cover from '../assets/img/rainbow-cover.png'
import coverPlain from '../assets/img/rainbow-cover-plain.svg'

export function HomePage() {

    const count = useSelector((storeState) => storeState.userModule.count)

    // const imgUrl = "logo.png"
    return (
        <section className="home-page full">
          <img className="cover-img" src={coverPlain}/>
          <div>
            <h1>Welcome</h1>
            <h2>We offer highly recomanded toys</h2>
          </div>
        </section >
    )
}