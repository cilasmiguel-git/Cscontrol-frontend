import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { request } from '../../api/axios_helper';
import { useSelector } from 'react-redux';

const AddCarScreen = () => {
  const [newCar, setNewCar] = useState({});
  const [cars, setCars] = useState([]); // Estado para armazenar a lista de carros
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  const token = useSelector(state => state.authentication.user); // Obtenha o token JWT do armazenamento local

  useEffect(() => {
    // Carregue a lista de carros ao carregar o componente
    request('GET', '/car', null)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Erro ao listar carros:', error);
      });
  }, []); // O segundo argumento vazio garante que isso seja executado apenas uma vez durante a montagem inicial

  const handleInputChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleAddCar = () => {
    if (!token) {
      return;
    }
    request('POST', '/car', newCar)
      .then(() => {
        // Atualize a lista de carros após a adição bem-sucedida
        request('GET', '/car', null)
          .then((response) => {
            setCars(response.data);
          })
          .catch((error) => {
            console.error('Erro ao listar carros:', error);
          });

        // Limpe o formulário após a adição
        setNewCar({
          title: '',
          image: '',
          price: '',
          marca: '', // Adicione o campo marca
          modelo: '', // Adicione o campo modelo
          anoFabricacao: '', // Adicione o campo anoFabricacao
          anoModelo: '', // Adicione o campo anoModelo
          descricao: '', // Adicione o campo descricao
        });

        // Defina a mensagem de sucesso
        setSuccessMessage('Carro adicionado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao adicionar carro:', error);
      });
  };

  return (
    <div>
      <Header />
      <div className='full-size'>
        <div className='container'>
          <h2>Adicionar Carro</h2>
          {successMessage && <p>{successMessage}</p>}
          <input
            type="text"
            name="title"
            placeholder="Nome do Carro"
            value={newCar.title || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="URL da Imagem"
            value={newCar.image || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={newCar.price || ''}
            onChange={handleInputChange}
          />
          {/* Novos campos */}
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={newCar.marca || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={newCar.modelo || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="anoFabricacao"
            placeholder="Ano de Fabricação"
            value={newCar.anoFabricacao || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="anoModelo"
            placeholder="Ano do Modelo"
            value={newCar.anoModelo || ''}
            onChange={handleInputChange}
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={newCar.descricao || ''}
            onChange={handleInputChange}
          />
          <button onClick={handleAddCar}>Adicionar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCarScreen;
