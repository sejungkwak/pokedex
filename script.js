const main = document.getElementById('main');

displayData();
getColors();

function displayData() {
  let promises = [];
  for ( let i = 1 ; i <= 151 ; i++ ) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`));
  }
  
  Promise.all(promises)
    .then(data => {
      return Promise.all(data.map(r => r.json()));
    })
    .then(data => {
      data.forEach(pokemon => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `
        <div class="circle"></div>
        <img class="avatar" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('00' + +pokemon.id).slice(-3)}.png" alt="${pokemon.name}" width="130" height="130">
        <div class="id">#${('00' + +pokemon.id).slice(-3)}</div>
        <p class="name">${pokemon.name}</p>
        <small class="type">Type: ${pokemon.types[0].type.name}</small>
      `
      main.appendChild(div);
      })})
    .catch(e => console.log(e));
}

function getColors() {
  let promises = [];
  for ( let i = 1 ; i <= 151 ; i++ ) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`))
  }
  
  Promise.all(promises)
    .then(data => {
      return Promise.all(data.map(r => r.json()));
    })
    .then(data => {
      const cards = document.querySelectorAll('.card');
      for ( let i = 0 ; i <= 150 ; i++ ) {
        cards[i].style.backgroundColor = data[i].color.name;
      }
    })
    .catch(e => console.log(e))
}

