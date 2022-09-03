const options = {
  series: [
    {
      name: "CLP",
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [],
  },
};

const boton = document.getElementById("btn");

const obtenerMonedas = async (indicadorMoneda) => {
  try {
    const response = await fetch(
      `https://mindicador.cl/api/${indicadorMoneda}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const mostrarGrafico = (serie) => {
  const ultimosValores = serie.slice(0, 10);
  ultimosValores.forEach((dia) => {
    options.series[0].data.push(dia.valor);
    options.xaxis.categories.push(dia.fecha.split("T")[0]);
  });

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
};

boton.addEventListener("click", async () => {
  const monedaChilena = document.getElementById("input-clp").value;
  const monedaDolarEuro = document.getElementById("moneda").value;
  const resultadoConversion = document.getElementById("resultado");
  const resultadoFallido = document.getElementById("resultado-fallido");

  if (!Number(monedaChilena)) {
    resultadoFallido.classList.add("fallido");
    resultadoFallido.innerHTML = `Debe ingresar solo numeros`;
  } else {
    const data = await obtenerMonedas(monedaDolarEuro);
    resultadoFallido.classList.remove("fallido");
    resultadoFallido.innerHTML = "";
    let conversionDeClpAMoneda = monedaChilena / data.serie[0].valor;
    resultadoConversion.innerHTML = `Resultado: $ ${conversionDeClpAMoneda.toFixed(
      2
    )}`;
    mostrarGrafico(data.serie);
  }
});
