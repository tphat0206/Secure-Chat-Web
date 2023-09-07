import Footer from "../Footer";
import Navbar from "../Navbar";

export default function HomePage() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<Navbar />
			<div style={{ flex: 1 }}>
                Home Page
            </div>
			<Footer />
		</div>
	)
}
