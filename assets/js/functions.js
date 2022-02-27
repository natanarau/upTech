const camp = document.querySelector('#amount');
const unitaryDefault = document.querySelector('#unitary').innerHTML;
const unitaryMod = unitaryDefault.toString().replace(',', '.');

// Função atualizadora
const eventUpdate = camp.addEventListener('change', (event) => {
  const qt = camp.value;
  const unitary = qt * unitaryMod;
  const total = unitary.toFixed(2).replace('.', ',');
  document.querySelector('#result').innerHTML = total;
});
// Se eventUpdate estiver undefined, retorna valor do produto
if (eventUpdate === undefined) {
  document.querySelector('#result').innerHTML = unitaryDefault;
}
