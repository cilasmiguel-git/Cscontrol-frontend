import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importe o useSelector
import apiAxios from '../../api/apiAxios';
import Header from '../../components/header/Header';
import './cardetail.css';
import Footer from '../../components/footer/Footer';

const CarDetail = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [nomeInteressado, setNomeInteressado] = useState('');
    const [telefoneInteressado, setTelefoneInteressado] = useState('');
    const [reservaStatus, setReservaStatus] = useState(null);
    const navigate = useNavigate();

    // Use o useSelector para acessar o estado de autenticação
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    useEffect(() => {
        apiAxios.get(`/car/${carId}`)
            .then((response) => {
                setCar(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes do carro:', error);
            });
    }, [carId]);

    const handleReservaSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            // Redirecionar para a página de login se o usuário não estiver autenticado
            navigate('/login');
            return;
        }

        // Enviar uma solicitação para reservar o carro
        apiAxios.post(`/reserved-car/reserve/${carId}`, null, {
            params: {
                nomeInteressado: nomeInteressado,
                telefoneInteressado: telefoneInteressado,
            },
        })
            .then((response) => {
                setReservaStatus('Carro reservado com sucesso.');
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
                <div className='cardetail-size'>
                    {isAuthenticated ? ( // Verifique a autenticação aqui
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
                    ) : (
                        <p>Faça login para fazer uma reserva.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CarDetail;
