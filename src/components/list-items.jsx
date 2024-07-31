import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackendlessAPI } from '../backendless';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { CircularProgress } from "@mui/material";
import { UserContext } from '../contexts/user-context.jsx';
import styles from './list-items.module.css';
import { get } from "../requester.js";
import CustomModal from "./custom-modal.jsx";

const ListCars = () => {
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [API_ID, API_KEY] = BackendlessAPI();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [likedCars, setLikedCars] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);

    // Fetch cars based on the current minutes to demonstrate different ways of fetching data
    const currentMinutes = new Date().getMinutes();
    useEffect(() => {
        const fetchCars = async () => {
            try {
                let carsData;
                if (currentMinutes >= 0 && currentMinutes <= 20) {
                    // Using async/await and Backendless
                    console.log("Minutes are between 0 and 20");
                    carsData = await Backendless.Data.of('cars').find();
                } else if (currentMinutes >= 21 && currentMinutes <= 40) {
                    // Using fetch
                    console.log("Minutes are between 21 and 40");
                    const response = await fetch(`https://api.backendless.com/${API_ID}/${API_KEY}/data/cars`);
                    carsData = await response.json();
                } else {
                    // Using requester.js
                    console.log("Minutes are between 41 and 60");
                    carsData = await get(`https://api.backendless.com/${API_ID}/${API_KEY}/data/cars`, null);
                }
                setCars(carsData);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [currentMinutes, API_ID, API_KEY]);

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

    useEffect(() => {
        console.log('Current User:', user);
        console.log('Cars:', cars);
    }, [user, cars]);

    useEffect(() => {
        const fetchLikedCars = async () => {
            if (user) {
                try {
                    const likesTable = Backendless.Data.of('likes');
                    const query = Backendless.DataQueryBuilder.create().setWhereClause(`userId = '${user.objectId}'`);
                    const likedCarsData = await likesTable.find(query);
                    const likedCarIds = new Set(likedCarsData.map(like => like.carId));
                    setLikedCars(likedCarIds);
                } catch (error) {
                    console.error('Error fetching liked cars:', error);
                }
            }
        };
        fetchLikedCars();
    }, [user]);

    const handleLike = async (carId) => {
        try {
            const likesTable = Backendless.Data.of('likes');
            const query = Backendless.DataQueryBuilder.create().setWhereClause(`userId = '${user.objectId}' AND carId = '${carId}'`);
            const existingLike = await likesTable.find(query);

            if (existingLike.length > 0) {
                // User already liked the car, so remove the like
                await likesTable.remove(existingLike[0].objectId);
                const car = await Backendless.Data.of('cars').findById(carId);
                car.likes -= 1;
                await Backendless.Data.of('cars').save(car);
                setCars(cars.map(c => c.objectId === carId ? car : c));
                setLikedCars(prevLikedCars => {
                    const newLikedCars = new Set(prevLikedCars);
                    newLikedCars.delete(carId);
                    return newLikedCars;
                });
            } else {
                // User has not liked the car, so add a like
                await likesTable.save({ userId: user.objectId, carId });
                const car = await Backendless.Data.of('cars').findById(carId);
                car.likes += 1;
                await Backendless.Data.of('cars').save(car);
                setCars(cars.map(c => c.objectId === carId ? car : c));
                setLikedCars(prevLikedCars => new Set(prevLikedCars).add(carId));
            }
        } catch (error) {
            console.error('Error liking/unliking car:', error);
        }
    };

    const handleDelete = async (car) => {
        setCarToDelete(car);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await Backendless.Data.of('cars').remove(carToDelete.objectId);
            setCars(cars.filter(c => c.objectId !== carToDelete.objectId));
            setShowModal(false);
            setCarToDelete(null);
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    if (loading || !imagesLoaded) {
        return <CircularProgress size={120} thickness={8} sx={{ color: 'darkred' }}/>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
      <>
          <br/>
          cars &&
          <Row>
              {cars.map(car => (
                <Col key={car.objectId} sm={12} md={6} lg={4}>
                    <Card className={`mb-4 ${styles['card-fixed-size']}`}>
                        <Card.Img className={styles['card-img-top']} variant="top" src={car.photoURL}
                                  alt={`${car.make} ${car.model}`}/>
                        <Card.Body>
                            <Card.Title>{car.make} {car.model}</Card.Title>
                            <Card.Text>
                                Year: {car.productionYear}<br/>
                                Likes: {car.likes}<br/>
                            </Card.Text>
                            <div className={styles['button-group']}>
                                {!user && (
                                  <Button variant="primary"
                                          onClick={() => navigate('/AutoLoook_ReactJS_WEB_Project/login')}>
                                      Login to see more
                                  </Button>
                                )}
                                {user && user.objectId !== car.ownerId && (
                                  <>
                                      <Button variant="info"
                                              onClick={() => navigate(`/AutoLoook_ReactJS_WEB_Project/car/${car.objectId}`)}>
                                          Details
                                      </Button>
                                      <Button variant={likedCars.has(car.objectId) ? "outline-danger" : "success"}
                                              onClick={() => handleLike(car.objectId)}>
                                          {likedCars.has(car.objectId) ? "Un-like" : "Like"}
                                      </Button>
                                  </>
                                )}
                                {user && user.objectId === car.ownerId && (
                                  <>
                                      <Button variant="warning"
                                              onClick={() => navigate(`/AutoLoook_ReactJS_WEB_Project/car/${car.objectId}`)}>
                                          Edit
                                      </Button>
                                      <Button variant="danger" onClick={() => handleDelete(car)}>
                                          Delete
                                      </Button>
                                  </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
              ))}
          </Row>
          <CustomModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={confirmDelete}
            car={carToDelete || {}}
          />
      </>
    );
};

export default ListCars;