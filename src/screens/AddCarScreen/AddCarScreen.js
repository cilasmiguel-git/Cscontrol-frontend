import React, { useState, useEffect } from 'react';
import apiAxios from '../../api/apiAxios';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

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
          {/* Novos campos */}
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={newFood.marca}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={newFood.modelo}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="anoFabricacao"
            placeholder="Ano de Fabricação"
            value={newFood.anoFabricacao}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="anoModelo"
            placeholder="Ano do Modelo"
            value={newFood.anoModelo}
            onChange={handleInputChange}
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={newFood.descricao}
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
