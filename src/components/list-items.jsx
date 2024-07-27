import React, { useEffect, useState } from 'react';
import { BackendlessAPI } from '../backendless';
import { get } from '../requester';
import { Card, Col, Row } from 'react-bootstrap';
import { CircularProgress } from "@mui/material";

const ListCars = () => {
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [API_ID, API_KEY] = BackendlessAPI();

    // Fetch cars based on the current minutes to demonstrate different ways of fetching data
    const currentMinutes = new Date().getMinutes();
    switch (true) {
      // Using async/await
        case ( currentMinutes >= 0 && currentMinutes <= 20 ):
            console.log("Minutes are between 0 and 20");
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
            break;

      // Using fetch
        case ( currentMinutes >= 21 && currentMinutes <= 40 ):
            console.log("Minutes are between 21 and 40");
            useEffect(() => {
                fetch(`https://api.backendless.com/${API_ID}/${API_KEY}/data/cars`)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      return response.json();
                  })
                  .then(carsData => {
                      setCars(carsData);
                  })
                  .catch(error => {
                      console.error('Error fetching cars:', error);
                  })
                  .finally(() => {
                      setLoading(false);
                  });
            }, []);
            break;

      // Using requester.js
        default:
            console.log("Minutes are between 41 and 60");
            useEffect(() => {
                const fetchCars = async () => {
                    try {
                        const carsData = await get(`https://api.backendless.com/${API_ID}/${API_KEY}/data/cars`, null);
                        setCars(carsData);
                    } catch (error) {
                        console.error('Error fetching cars:', error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchCars();
            }, []);
            break;
    }

    // Ensure all images are loaded before rendering the component
    useEffect(() => {
        if (cars) {
            const imagePromises = cars.map(car => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = car.photoURL;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            Promise.all(imagePromises)
              .then(() => setImagesLoaded(true))
              .catch(error => console.error('Error loading images:', error));
        }
    }, [cars]);

    if (loading || !imagesLoaded) {
        return <CircularProgress size={120} thickness={8} sx={{ color: 'darkred' }} />;
    }

    return (
      cars &&
      <Row>
          {cars.map(car => (
            <Col key={car.objectId} sm={12} md={6} lg={4}>
                <Card className="mb-4">
                    <Card.Img variant="top" src={car.photoURL} alt={`${car.make} ${car.model}`}/>
                    <Card.Body>
                        <Card.Title>{car.make} {car.model}</Card.Title>
                        <Card.Text>
                            Year: {car.production_year}<br/>
                            Likes: {car.likes}<br/>
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