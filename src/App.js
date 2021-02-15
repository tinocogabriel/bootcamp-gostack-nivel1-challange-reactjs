import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const repository = await api.post(`repositories`,{title:"Teste",url:"Teste",techs:["Teste","Teste"]});
    setRepositories([...repositories,repository.data]);
  }

  async function handleRemoveRepository(id) {
    const array = [...repositories];
    const repositoryIndex = array.findIndex(repository => repository.id === id);

    await api.delete(`repositories/${id}`);
    
    array.splice(repositoryIndex,1)

    setRepositories(array);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository=>{
            return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
