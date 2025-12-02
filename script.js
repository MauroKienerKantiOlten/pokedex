// Globale Variablen
const pokemonBilderQuelle = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const pokemons = [
  { name: "Pikachu", type: "Elektro", image: `${pokemonBilderQuelle}25.png` },
  { name: "Glumanda", type: "Feuer", image: `${pokemonBilderQuelle}4.png` },
  { name: "Schiggy", type: "Wasser", image: `${pokemonBilderQuelle}7.png` },
  { name: "Bisasam", type: "Pflanze", image: `${pokemonBilderQuelle}1.png` },
  { name: "Evoli", type: "Normal", image: `${pokemonBilderQuelle}133.png` },
  { name: "Nidoran", type: "Gift", image: `${pokemonBilderQuelle}32.png` },
  { name: "Vulpix", type: "Feuer", image: `${pokemonBilderQuelle}37.png` },
  { name: "Entoron", type: "Wasser", image: `${pokemonBilderQuelle}55.png` },
  { name: "Traumato", type: "Psycho", image: `${pokemonBilderQuelle}97.png` },
  { name: "Lavados", type: "Feuer", image: `${pokemonBilderQuelle}146.png` },
];


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

for (const pokemon of pokemons){

    const card = createPokemonCard(pokemon);

    card.addEventListener("click", function(){
        displaySinglePokemon(pokemon);
    });

    pokemonCards.appendChild(card);
}

// Funktionen
function displaySinglePokemon(pokemon){
    pokemonCards.classList.toggle("hidden");
    pokemonDetailView.classList.toggle("hidden");
    pokemonDetailView.innerHTML = "";

    const card = createPokemonCard(pokemon);
    pokemonDetailView.appendChild(card);
}   

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

    return card;
}


// Event-Listeners
title.addEventListener("click", function(){
    if(pokemonCards.classList.contains("hidden")){
        pokemonCards.classList.toggle("hidden");
        pokemonDetailView.classList.toggle("hidden");
        console.log("Verändere Ansicht");
    }
});