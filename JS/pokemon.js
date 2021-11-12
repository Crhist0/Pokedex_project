// function autoPlay() {
//     document.getElementById("audio").innerHTML =
//         `<audio src="./bg.mp3" preload="auto" autoplay loop>
//         <p>If you are reading this, it is because your browser does not support the audio element.</p>
//         </audio>`
// }
// autoPlay()
// nao funcionou por nada nesse mundo

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
document.getElementById(sprites).onmouseover = () => {
  document.getElementById(sprites).setAttribute("src", pokemon.sprites.back_default);
};

function changeHtml() {
  let index = document.getElementById("formsDoId").value;
  console.log(index);
  axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((res) => {
    console.log(res.data.name);
    let pokemon = res.data;
    let content = document.querySelector("#content");
    let tipos = [];
    let localidades = [];
    for (const index in pokemon.types) {
      tipos.push(capitalizeFirstLetter(pokemon.types[index].type.name));
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index}`).then((res) => {
      let habitat = res.data.habitat ? res.data.habitat.name : `Não há registros.`;

      let flavors = res.data.flavor_text_entries;
      let flavor = "";
      for (const Flavor of flavors) {
        if (Flavor.language.name == "en") {
          flavor = Flavor.flavor_text;
          break;
        }
        // pegar o primeiro em ingles
      }

      let genera = res.data.genera;
      let genero = "";
      for (const gender of genera) {
        if (gender.language.name == "en") {
          genero = gender.genus;
          break;
        }
      }

      axios.get(`https://pokeapi.co/api/v2/pokemon/${index}/encounters`).then((res) => {
        let local = res.data;
        console.log(local);
        for (const index in local) {
          let cidade = Array.from(capitalizeFirstLetter(local[index].location_area.name));
          cidade.splice(cidade.length - 5, 5); // pra tirar o "-area"
          localidades.push(cidade.join(""));
        }

        content.innerHTML = `
                <div class="row" id="pokedexSprite"  onmouseover="changeSprite()" onmouseout="changeSpriteBack()">
                    <img id="spritesFront" style="height:200px; display:block" src="${
                      pokemon.sprites.front_default
                    }" >
                    <img id="spritesBack" style="height:200px; display:none" src="${
                      pokemon.sprites.back_default
                    }" >
                </div>
                <div class="row d-flex justify-content-center" id="pokedexParagrafos">
                    <p> Index: ${pokemon.id}</p>
                    <p> Nome: ${capitalizeFirstLetter(pokemon.name)} </p>
                    <p> Genero: ${genero}</p>
                    <p> Habitat: ${habitat}</p>
                    <p> Tipo: ${tipos.join(", ")} </p>
                    <p> Peso: ${(pokemon.weight / 10).toFixed(1)} kg </p>
                    <p> Altura: ${(pokemon.height / 10).toFixed(1)} m </p>
                    <p> Shiny: <input class="form-check-input ms-3" type="checkbox" value="" id="shinyCheckbox" onchange="changeSpriteShiny()"> </p>
                    <p style="margin-top:16px; margin-bottom: 16px"> Detalhes: ${flavor} </p>
                    <p> Localização: ${
                      localidades.join(", ") ? localidades.join(", ") : `Não há registros.`
                    } </p>
                </div>
                    `;
      });
    });
  });
}

function changeSprite() {
  document.getElementById("spritesBack").style.display = "block";
  document.getElementById("spritesFront").style.display = "none";
}

function changeSpriteBack() {
  document.getElementById("spritesBack").style.display = "none";
  document.getElementById("spritesFront").style.display = "block";
}

function changeSpriteShiny() {
  let index = document.getElementById("formsDoId").value;
  if (document.getElementById("shinyCheckbox").checked) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((res) => {
      let pokemon = res.data;
      document.getElementById("spritesFront").src = `${pokemon.sprites.front_shiny}`;
      document.getElementById("spritesBack").src = `${pokemon.sprites.back_shiny}`;
    });
  } else {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((res) => {
      let pokemon = res.data;
      document.getElementById("spritesFront").src = `${pokemon.sprites.front_default}`;
      document.getElementById("spritesBack").src = `${pokemon.sprites.back_default}`;
    });
  }
}
