import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { show } from "../counterSlice";

const ExampleCard = () => {
  const selectedProduct = useSelector(
    (state: any) => state.counter.selectedData
  );
  const dispatch = useDispatch();
  return selectedProduct ? (
    <Card
      style={{
        width: "22rem",
        margin: "20px auto",
        position: "fixed",
        top: "50vh",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card.Body>
        <Card.Img
          variant="top"
          src={selectedProduct.thumbnail}
          style={{ width: "50%" }}
        />
        <Card.Title>{selectedProduct.title}</Card.Title>
        <Card.Text>{selectedProduct.description}</Card.Text>
        <Card.Text
          style={{
            color:
              selectedProduct.availabilityStatus === "In Stock"
                ? "green"
                : "red",
          }}
        >
          {selectedProduct.availabilityStatus}
        </Card.Text>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Card.Text style={{ marginBottom: 0 }}>
            <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
          </Card.Text>
          <Card.Text style={{ marginBottom: 0 }}>
            <strong>Rating:</strong>{" "}
            {Array(Math.floor(selectedProduct.rating))
              .fill(0)
              .map((_, i) => (
                <span key={i}>⭐</span>
              ))}
          </Card.Text>
        </div>
        <Button
          style={{ marginTop: "1rem" }}
          variant="secondary"
          onClick={() => dispatch(show(null))}
        >
          Close
        </Button>
      </Card.Body>
    </Card>
  ) : null;
};

export default ExampleCard;
