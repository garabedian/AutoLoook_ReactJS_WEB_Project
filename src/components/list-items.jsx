import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackendlessAPI } from '../backendless';
import { get } from '../requester';
import { Card, Col, Row } from 'react-bootstrap';
import { CircularProgress } from "@mui/material";
import styles from './list-items.module.css'; // Import the CSS module

const ListCars = () => {
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [API_ID, API_KEY] = BackendlessAPI();
    const navigate = useNavigate();

    const currentMinutes = new Date().getMinutes();
    switch (true) {
        case (currentMinutes >= 0 && currentMinutes <= 20):
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
        case (currentMinutes >= 21 && currentMinutes <= 40):
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
                    <Card className={`mb-4 ${styles['card-fixed-size']}`} onClick={() => navigate(`/AutoLoook_ReactJS_WEB_Project/car/${car.objectId}`)}>
                        <Card.Img variant="top" src={car.photoURL} alt={`${car.make} ${car.model}`} />
                        <Card.Body>
                            <Card.Title>{car.make} {car.model}</Card.Title>
                            <Card.Text>
                                Year: {car.productionYear}<br />
                                Likes: {car.likes}<br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ListCars;