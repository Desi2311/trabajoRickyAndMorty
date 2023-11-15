//MENU RESPONSIVO 
const nav = document.querySelector("nav");
const abrir = document.querySelector("#botonDeAbrir")
const cerrar = document.querySelector("#botonDeCerrar")

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
})


const raiz = document.getElementById("raiz");
const totalPersonajes = document.getElementById("total-personajes");
let pagina = 1;
let total = 0;

//FILTRO DE GENERO
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");

//PAGINADO
const paginaActual = document.getElementById("pagina-actual");
const proximaPagina = document.getElementById("next-page");
const prevPagina = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const primerPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");

//API
const getData = async () => {
  const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
  const response = await fetch(URL);
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  printData(json.results);
  updatePagination();
  data = json;
  return json;
};
getData(pagina);
let data = {};

//CARD PERSONAJE

const printData = (arr) => {
  let card = "";
  totalPersonajes.innerHTML = arr.length;
  arr.forEach((personaje) => {
    card =
      card +
      `<div class="card">
                <img src=${personaje.image} alt="">
                <p>Nombre:${personaje.name}</p>
                <p>Genero:${personaje.gender}</p>
                <p>Especies:${personaje.species}</p>
                <p>Estado:${personaje.status}</p>
                <p>Origen:${personaje.origin.name}</p>
                <p>Locacion:${personaje.location.name}</p>   
                <button class="botonVerMas">Ver mas</button>
            </div>
        </div>
      `;
  });
  raiz.innerHTML = card;
};

//RESPONSIVO BOTONES DE PAGINA
const pagination = async (prom) => {
  const result = await prom;
  proximaPagina.addEventListener("click", () => {
    pagina += 1;
    getData();
  });

  prevPagina.addEventListener("click", () => {
    pagina -= 1;
    getData();
  });

  primerPagina.addEventListener("click", () => {
    if (pagina >= 2) {
      pagina = 1;
      getData();
    }
  });
  
  ultimaPagina.addEventListener("click", () => {
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
    }
  });
};

const updatePagination = () => {
  if (pagina <= 1) {
    prevPagina.disabled = true;
    primerPagina.disabled = true;
  } else {
    prevPagina.disabled = false;
    primerPagina.disabled = false;
  }

  if (pagina === total) {
    ultimaPagina.disabled = true;
    proximaPagina.disabled = true;
  } else {
    ultimaPagina.disabled = false;
    proximaPagina.disabled = false;
  }
};

//FILTROS MENU

mujeres.addEventListener("click", () => {
  const arr = data.results;
  const arrMujeres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }

  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arr = data.results;
  const arrHombres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrHombres.push(arr[i]);
    }
  }
  printData(arrHombres);
});

sinGenero.addEventListener("click", () => {
  const arr = data.results;
  const arrSinGenero = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrSinGenero.push(arr[i]);
    }
  }
  printData(arrSinGenero);
});

noSeSabe.addEventListener("click", () => {
  const arr = data.results;
  const arrNoSeSabe = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrNoSeSabe.push(arr[i]);
    }
  }
  printData(arrNoSeSabe);
});

todos.addEventListener("click", () => {
  const arr = data.results;
  printData(arr);
});

pagination(getData());
