// src/CepSearch.jsx
import React, { useState } from "react";

function CepSearch() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (cep.length !== 8 || isNaN(cep)) {
      setError("CEP inválido! Digite um CEP com 8 números.");
      setData(null);
      return;
    }

    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const result = await response.json();
      
      if (result.erro) {
        setError("CEP não encontrado.");
        setData(null);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Erro ao buscar o CEP. Tente novamente.");
      setData(null);
    }
  };

  return (
    <div className="cep-container">
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="cep-info">
          <p><strong>Logradouro:</strong> {data.logradouro}</p>
          <p><strong>Bairro:</strong> {data.bairro}</p>
          <p><strong>Cidade:</strong> {data.localidade}</p>
          <p><strong>Estado:</strong> {data.uf}</p>
        </div>
      )}
    </div>
  );
}

export default CepSearch;