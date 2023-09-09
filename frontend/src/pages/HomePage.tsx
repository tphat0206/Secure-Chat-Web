import Footer from "../Footer";
import Navbar from "../Navbar";

export default function HomePage() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<Navbar />
			<div style={{ flex: 1 }}>
                <h1>Home Page</h1>
				<a href="/conversation">Conversation Page</a>

            </div>
			<Footer />
		</div>
	)
}
