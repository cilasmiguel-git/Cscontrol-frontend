import React, { useState, useEffect } from 'react';
import apiAxios from '../../api/apiAxios';
import Header from '../../components/header/Header';

const AddCarScreen = () => {
  const [newFood, setNewFood] = useState({});
  const [foods, setFoods] = useState([]); // Estado para armazenar a lista de carros
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  useEffect(() => {
    // Carregue a lista de carros ao carregar o componente
    apiAxios
      .get('/car')
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error('Erro ao listar carros:', error);
      });
  }, []); // O segundo argumento vazio garante que isso seja executado apenas uma vez durante a montagem inicial

  const handleInputChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleAddCar = () => {
    apiAxios
      .post('/car', newFood)
      .then(() => {
        // Atualize a lista de carros após a adição bem-sucedida
        apiAxios
          .get('/car')
          .then((response) => {
            setFoods(response.data);
          })
          .catch((error) => {
            console.error('Erro ao listar carros:', error);
          });

        // Limpe o formulário após a adição
        setNewFood({
          title: '',
          image: '',
          price: '',
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
            value={newFood.title || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="URL da Imagem"
            value={newFood.image || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={newFood.price || ''}
            onChange={handleInputChange}
          />
          <button onClick={handleAddCar}>Adicionar</button>
        </div>
      </div>
    </div>
  );
};

export default AddCarScreen;
