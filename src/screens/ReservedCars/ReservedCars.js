import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { request } from '../../api/axios_helper';
import { useSelector } from 'react-redux';
import "./reservedcars.css";

const ReservedCars = () => {
    const [reservedCars, setReservedCars] = useState([]);
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    useEffect(() => {
        // Busque a lista de carros reservados do seu back-end
        request('GET', '/reserved-car/list-reserved-cars')
            .then((response) => {
                setReservedCars(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar carros reservados:', error);
            });
    }, [isAuthenticated]);

    const handleCancelReservation = (reservedCarId) => {
        // Faça uma solicitação para o backend para cancelar a reserva com base no ID do carro reservado
        request('DELETE', `/reserved-car/cancel-reservation/${reservedCarId}`)
            .then(() => {
                // Atualize a lista de carros reservados após a exclusão
                const updatedReservedCars = reservedCars.filter((car) => car.id !== reservedCarId);
                setReservedCars(updatedReservedCars);
            })
            .catch((error) => {
                console.error('Erro ao cancelar a reserva:', error);
            });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Header />
            <div className='full-list-car'>
                <div className='list-reservedcar '>
                    <h1>Carros Reservados</h1>
                    {reservedCars.map((reservedCar) => (
                        <div className='list-reservedcar-item' key={reservedCar.car.id}>
                            <img src={reservedCar.car.image} alt={reservedCar.car.title} />
                            <div className=''>
                                <strong>{reservedCar.car.title}</strong> <br />
                                <p> R${reservedCar.car.price}/dia </p>
                                <p>Nome do Interessado: {reservedCar.nomeInteressado}</p>
                                <p>Telefone do Interessado: {reservedCar.telefoneInteressado}</p>
                            </div>
                            <div>
                                <button onClick={() => handleCancelReservation(reservedCar.id)}>Liberar Reserva</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReservedCars;
