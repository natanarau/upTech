const camp = document.querySelector('#amount');
const unitaryDefault = document.querySelector('#unitary').innerHTML;
const unitaryMod = unitaryDefault.toString().replace(',', '.');

const mudou = camp.addEventListener('change', (event) => {
  const qt = camp.value;
  const unitary = qt * unitaryMod;
  const total = unitary.toFixed(2).toString().replace('.', ',');
  document.querySelector('#result').innerHTML = total;
  return total;
});

if (mudou === undefined) {
  document.querySelector('#result').innerHTML = unitaryDefault;
}
