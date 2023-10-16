import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import './cardetail.css';
import Footer from '../../components/footer/Footer';
import { request } from '../../api/axios_helper';
import { useSelector } from 'react-redux';

const CarDetail = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [nomeInteressado, setNomeInteressado] = useState('');
    const [telefoneInteressado, setTelefoneInteressado] = useState('');
    const [reservaStatus, setReservaStatus] = useState(null);
    const navigate = useNavigate();
    
    const token = useSelector(state => state.authentication.user);


    useEffect(() => {
        // Use a função request para buscar detalhes do carro
        request('GET', `/car/${carId}`)
            .then((response) => {
                setCar(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes do carro:', error);
            });
    }, [carId]);

    const handleReservaSubmit = (e) => {
        e.preventDefault();
    
        // Certifique-se de que seu token JWT está configurado corretamente no cabeçalho da solicitação.
        request('POST', `/reserved-car/reserve/${carId}?nomeInteressado=${nomeInteressado}&telefoneInteressado=${telefoneInteressado}`)
            .then((response) => {
                if (response.status === 200) {
                    setReservaStatus('Carro reservado com sucesso.');
                } else {
                    setReservaStatus('Erro ao fazer reserva. Tente novamente mais tarde.');
                }
            })
            .catch((error) => {
                console.error('Erro ao fazer reserva:', error);
                setReservaStatus('Erro ao fazer reserva. Tente novamente mais tarde.');
            });
    };

    if (!car) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <Header />
            <div className="cardetail-container">
                <div className='cardetail-size'>
                    {car.image && <img className="cardetail-image" src={car.image} alt={car.title} />}
                    <div className='cardetail-items'>
                        {car.title && <strong>{car.title}</strong>} <br />
                        {car.marca && <>Marca: {car.marca}</>} <br />
                        {car.modelo && <>Modelo: {car.modelo}</>} <br />
                        {car.anoFabricacao && <>Ano de Fabricação: {car.anoFabricacao}</>} <br />
                        {car.anoModelo && <>Ano do Modelo: {car.anoModelo}</>} <br />
                        {car.descricao && <>Descrição: {car.descricao}</>} <br />
                        {car.price && <>Preço: {car.price}</>}
                    </div>
                </div>
                {token  ? (
                <div className='cardetail-size'>
                    <form onSubmit={handleReservaSubmit}>
                        <h2>Fazer uma reserva</h2>
                        <div>
                            <label htmlFor="nomeInteressado">Nome do Interessado:</label>
                            <input
                                type="text"
                                id="nomeInteressado"
                                value={nomeInteressado}
                                onChange={(e) => setNomeInteressado(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="telefoneInteressado">Telefone do Interessado:</label>
                            <input
                                type="text"
                                id="telefoneInteressado"
                                value={telefoneInteressado}
                                onChange={(e) => setTelefoneInteressado(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Reservar</button>
                        {reservaStatus && <p>{reservaStatus}</p>}
                    </form>
                </div>
                )
                :
                (
                <div className='cardetail-size'>
                    <h3>Você precisa estar autenticado para fazer uma reserva. Por favor, faça login.</h3>
                </div>
                )
                }
            </div>
            <Footer />
        </div>
    );
}

export default CarDetail;
