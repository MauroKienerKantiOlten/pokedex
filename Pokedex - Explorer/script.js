// Globale Variablen
let numberOfPokemon = 0;


// HTML-Elemente
let firstSection = document.createElement("div");
firstSection.id = "title-section";
firstSection.classList.add("container");
document.body.appendChild(firstSection);

let title = document.createElement("h1");
title.id = "title";
title.innerText = "Pokédex";
firstSection.appendChild(title);

let pokemonCards = document.createElement("div");
pokemonCards.id = "pokemon-cards";
pokemonCards.classList.add("container");
document.body.appendChild(pokemonCards);

let pokemonDetailView = document.createElement("div");
pokemonDetailView.id = "pokemon-detail-view";
pokemonDetailView.classList.add("container");
pokemonDetailView.classList.add("hidden");
document.body.appendChild(pokemonDetailView);

// Funktionen
function displaySinglePokemon(pokemon){
    pokemonCards.classList.toggle("hidden");
    pokemonDetailView.classList.toggle("hidden");
    pokemonDetailView.innerHTML = "";

    const card = createPokemonCard(pokemon);
    pokemonDetailView.appendChild(card);
}   

/** Creates a HTML Pokemon Card to display */
function createPokemonCard(pokemon){
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = pokemon.name;   

    const image = document.createElement("img");
    image.src = pokemon.image;
    image.alt = pokemon.name;

    const type = document.createElement("p");
    type.textContent = "Typ: " + pokemon.type;

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(type); 

    card.addEventListener("mouseover", function(){
        image.src = pokemon.alternateImage;
    });

    card.addEventListener("mouseout", function(){
        image.src = pokemon.image;
    });

    return card;
}


async function displayPokemonList(){
    const pokemonList = await getAllPokemon();

    for(const pokemon of pokemonList){
        const pokemonData = await getData(pokemon.url);
        
        pokemonData.image = pokemonData.sprites.other["official-artwork"]["front_default"];
        pokemonData.alternateImage = pokemonData.sprites.other["official-artwork"]["front_shiny"];
        pokemonData.type = pokemonData.types[0].type.name;

        const card = createPokemonCard(pokemonData);

        card.addEventListener("click", function(){
            displaySinglePokemon(pokemonData);
        });

        pokemonCards.appendChild(card);
    }
}

async function getAllPokemon(offset = 0, limit = 100) {
    const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    return pokemon.results;
}

async function getData(apiEndpoint) {

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error.message);
    }
}


// Event-Listeners
title.addEventListener("click", function(){
    if(pokemonCards.classList.contains("hidden")){
        pokemonCards.classList.toggle("hidden");
        pokemonDetailView.classList.toggle("hidden");
    }
});

displayPokemonList();