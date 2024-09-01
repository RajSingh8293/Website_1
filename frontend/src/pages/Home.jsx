import Hero from "../components/Hero"
import Layout from "../components/Layout"

const Home = () => {
    return (
        <Layout>
            <section className="py-16">
                <Hero />
            </section>
        </Layout>
    )
}

export default Home