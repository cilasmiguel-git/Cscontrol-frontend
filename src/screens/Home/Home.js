import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import { IoIosSearch, IoIosOptions } from 'react-icons/io';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { request } from '../../api/axios_helper';
import { useSelector } from 'react-redux';

const Home = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [reservedCarIds, setReservedCarIds] = useState([]);

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    const user = useSelector(state => state.authentication);
    useEffect(() => {
        // Busque a lista de carros reservados do seu back-end e obtenha os IDs dos carros reservados
        request('GET', '/reserved-car/list-reserved-cars')
            .then((response) => {
                const reservedIds = response.data.map((reservedCar) => reservedCar.car.id);
                setReservedCarIds(reservedIds);
            })
            .catch((error) => {
                console.error('Erro ao listar carros reservados:', error);
            });

        // Busque a lista de todos os carros disponíveis
        request('GET', '/car')
            .then((response) => {
                setAllCars(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar carros:', error);
            });
    }, [isAuthenticated]);

    useEffect(() => {
        // Filtre os carros disponíveis (não reservados)
        const availableCars = allCars.filter((car) => !reservedCarIds.includes(car.id));

        // Em seguida, aplique a filtragem com base no valor da pesquisa
        const filteredAvailableCars = availableCars.filter((car) =>
            car.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredCars(filteredAvailableCars);
    }, [searchValue, allCars, reservedCarIds]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Header />
            <div className='filter-container'>
                <input
                    placeholder='Pesquisar...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className='filter-button'>
                    <IoIosOptions size={20} />
                </button>
            </div>
            <div className='full-list-car'>
                <div className='list-car'>
                    {filteredCars.map((car) => (
                        <div className='list-car-item' key={car.id}>
                            <img src={car.image} alt={car.title} />
                            <div className='list-car-item-content'>
                                <strong>{car.title}</strong> <br />
                                <div>
                                    <p> R${car.price}/dia </p>
                                    <Link className='button-open-detail' to={`/car/${car.id}`}>Reservar</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
