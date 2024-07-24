import React, { useEffect, useState } from 'react';
import Backendless from '../backendless';
import { Card, Col, Row } from 'react-bootstrap';

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await Backendless.Data.of('cars').find();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Row>
      {cars.map(car => (
        <Col key={car.objectId} sm={12} md={6} lg={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src={car.photoURL} alt={`${car.make} ${car.model}`} />
            <Card.Body>
              <Card.Title>{car.make} {car.model}</Card.Title>
              <Card.Text>
                Year: {car.production_year}<br />
                Likes: {car.likes}<br />
                Comments: {car.comments}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListCars;