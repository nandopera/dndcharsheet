function carregarDados() {
  const classe = document.getElementById('classe').value;
  if (!classe) return;
 
   const modConstElement = document.getElementById('modificadorConstituicao');
   let modificadorConstituicao = 0;
 
   document.getElementById('modificadorConstituicao').addEventListener('input', calculateHitPoints);
 
   function calculateHitPoints() {
     const constituicaoValue = parseInt(document.getElementById('modificadorConstituicao').value);
 
     modificadorConstituicao = Math.floor((constituicaoValue - 10) / 2);
 
     const hitPointsBase = parseInt(document.getElementById('hitPointBase').textContent);
 
     const hitPoints = hitPointsBase + modificadorConstituicao;
 
     document.getElementById('hitPoint').textContent = `${hitPoints}`;
   }

  axios.get(`https://api.open5e.com/v1/classes/${classe}`)
    .then(response => {
      if (!response.data) {
        throw new Error('Invalid API response');
      }

      const hitPointsBase = parseInt(response.data.hp_at_1st_level);

      if (isNaN(hitPointsBase)) {
        throw new Error('Invalid hit point value');
      }

      const hitPoints = hitPointsBase + modificadorConstituicao;

      document.getElementById('hitPoint').textContent = `${hitPoints}`;

      let savingThrowsList = '';
      const profSavingThrows = response.data.prof_saving_throws;

      if (typeof profSavingThrows === 'string') {
        savingThrowsList = profSavingThrows;
      } else {
        for (const prop in profSavingThrows) {
          if (profSavingThrows.hasOwnProperty(prop)) {
            savingThrowsList += `${prop}: ${profSavingThrows[prop]}`;
          }
        }
      }

      document.getElementById('ficha').innerHTML = `
        <h2>Class Summary</h2>
        <ul>
          <li><strong>Saving Throws:</strong> ${savingThrowsList}</li>
          <li><strong>Proficient Skills:</strong> ${response.data.prof_weapons}</li>
          <li><strong>Proficient Proficiencies:</strong> ${response.data.prof_skills}</li>
          <li><strong>Hit Points:</strong> ${hitPoints}</li>
        </ul>
      `;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('ficha').innerHTML = `<p>Error loading class data.</p>`;
    });
}
