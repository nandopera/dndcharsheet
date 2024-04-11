// Função para carregar dados da classe selecionada
function carregarDados() {
  const classe = document.getElementById('classe').value;
  if (!classe) return;

  // Faz a requisição para a API do Open5E usando Axios
  axios.get(`https://api.open5e.com/v1/classes/${classe}`)
    .then(response => {
      // Verifica se os dados retornados são válidos
      if (!response.data || !response.data.name || !response.data.prof_saving_throws || !response.data.prof_weapons || !response.data.prof_skills) {
        throw new Error('Dados da classe inválidos');
      }

      // Exibe os dados da classe na ficha
      let savingThrowsList = '';
      const profSavingThrows = response.data.prof_saving_throws;

      if (typeof profSavingThrows === 'string') {
        savingThrowsList = profSavingThrows;
      } else {
        for (const prop in profSavingThrows) {
          if (profSavingThrows.hasOwnProperty(prop)) {
            savingThrowsList += `${prop}: ${profSavingThrows[prop]}, `;
          }
        }
      }

      document.getElementById('ficha').innerHTML = `
        <h2>${response.data.name}</h2>
        <ul>
          <li><strong>Atributos de Salvação:</strong> ${savingThrowsList}</li>
          <li><strong>Habilidades Proficientes:</strong> ${response.data.prof_weapons}</li>
          <li><strong>Perícias Proficientes:</strong> ${response.data.prof_skills}</li>
        </ul>
      `;

      // Converte o número de pontos de vida de string para número e exibe
      const hitPoints = parseInt(response.data.hp_at_1st_level);
      document.getElementById('hitPoint').textContent = hitPoints;
    })
    
    .catch(error => {
      // Exibe um erro caso a requisição falhe
      console.error(error);
      document.getElementById('ficha').innerHTML = `<p>Erro ao carregar dados da classe.</p>`;
    });
}
