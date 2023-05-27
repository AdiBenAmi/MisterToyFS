import SimpleMap from "../cmps/map";

export function About() {
    return <section className="about">
        <div className="about-info">
            <h1 className="text-align-center">Our story</h1>
            <p className="about-content" >Mister toy. opened in 2005 and is owned by the Ben Ami family. We strive to provide quality, family-friendly fun for all ages and interests. We work hard to keep our pricing fair and competitive and we think that you will agree that it is truly the Israel coolest toy and hobby store.
                The fun begins when you first pull up to our spaceship-shaped building and enter through our “engine doors.” It is more than just a store…It is a FUN experience for the whole family. You have to see it to believe it!</p>
            <p>Come visit us</p>
        </div>
        <div>
            <h1>Stores locations: </h1>
            <SimpleMap />
        </div>

    </section>
}