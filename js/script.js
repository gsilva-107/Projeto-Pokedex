const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image-fluid');

const containerType = document.querySelector('.container_type');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonAnt = document.querySelector('.btn-prev');
const buttonProx = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let = searchPokemon = 1;
let shiny = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    removeList();
    pokemonName.innerHTML = 'Indo a caça...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        data.types.forEach(element => {
            const newType = document.createElement('h1');
            newType.textContent = element.type.name;
            newType.setAttribute('id', element.type.name);
            newType.setAttribute('class','pokemon_type');
            containerType.appendChild(newType);
        });

        if(shiny){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }else{
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
         
        input.value ='';
        searchPokemon = data.id;
        
    } else {
        pokemonName.innerHTML = 'Não Encontrado!';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

const removeList = function() {
    const types = document.querySelectorAll('.pokemon_type');
    types.forEach(element =>{
        element.parentNode.removeChild(element)
    });
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonAnt.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        
    }
});

buttonProx.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
});

renderPokemon(searchPokemon);

buttonShiny.addEventListener('click', () =>{
    if(shiny === false){
        shiny = true;
        buttonShiny.textContent = 'Versão Normal';
    }else{
        shiny = false;
        buttonShiny.textContent = 'Versão Shiny';
    };
    renderPokemon(searchPokemon);
});