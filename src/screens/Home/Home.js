import React, { useEffect, useState } from 'react'
import apiAxios from '../../api/apiAxios';
import "./home.css"
import { IoIosSearch, IoIosOptions } from 'react-icons/io'; // Importe os ícones desejados
import Header from '../../components/header/Header';
const Home = () => {


    const [searchValue, setSearchValue] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        apiAxios.get('/car')
            .then((response) => {
                setFoods(response.data);
            })
            .catch((error) => {
                console.error('Erro ao listar comidas:', error);
            });
    }, []);
    useEffect(() => {
        // Atualize a lista de carros filtrados com base no valor de pesquisa
        const filteredCars = foods.filter((food) =>
            food.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredFoods(filteredCars);
    }, [searchValue, foods]);


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
                    {filteredFoods.map((food) => (
                        <div className='list-car-item' key={food.id}>
                            <img src={food.image} alt={food.title} />
                            <div className='list-car-item-content'>
                                <strong>{food.title}</strong> <br />
                                <div>
                                    Preço: {food.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home