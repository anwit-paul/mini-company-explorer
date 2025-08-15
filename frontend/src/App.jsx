import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Navbar, Nav } from "react-bootstrap";
import NavBar from "./components/NavBar";
import ExampleCard from "./components/Card";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div fluid className="App">
      {/* Navbar Component */}
      <NavBar />

      {/* Main Content */}
      <Container fluid className="mt-4">
        <ProductList />
        <ExampleCard />
      </Container>
    </div>
  );
}

export default App;
