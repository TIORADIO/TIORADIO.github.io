<script>
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    const result = await response.json();
    if (response.ok) {
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Enviado correctamente';
      successMessage.classList.add('success');
      form.appendChild(successMessage);
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Error al enviar: ' + result.error;
      errorMessage.classList.add('error');
      form.appendChild(errorMessage);
    }
  });
</script>
