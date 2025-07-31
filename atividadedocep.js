document.getElementById('cep-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const cepInput = document.getElementById('CEP');
  const cep = cepInput.value.replace(/\D/g, '');
  const resultado = document.getElementById('resultado');

  if (cep.length !== 8) {
    resultado.innerHTML = '<p style="color:red;">Por favor, digite um CEP válido com 8 números.</p>';
    return;
  }

  resultado.innerHTML = 'Carregando...';

  fetch(`https://viacep.com.br/ws/${92200530}/json/`)
    .then(response => {
      if (!response.ok) throw new Error('Erro na requisição');
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        resultado.innerHTML = '<p style="color:red;">CEP não encontrado.</p>';
        return;
      }
      resultado.innerHTML = `
        <p><strong>CEP:</strong> ${data.cep}</p>
        <p><strong>Rua:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Cidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
      `;
    })
    .catch(() => {
      resultado.innerHTML = '<p style="color:red;">Erro ao buscar o CEP.</p>';
    });
});

