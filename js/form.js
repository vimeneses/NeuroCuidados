function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11); // até 11 dígitos
  if (digits.length <= 10) {
    // (99) 9999-9999
    return digits
      .replace(/^(\d{0,2})/, '($1')
      .replace(/^(\(\d{2})(\d{0,4})/, '$1) $2')
      .replace(/(\d{4})(\d{0,4})$/, '$1-$2');
  }
  // (99) 99999-9999
  return digits
    .replace(/^(\d{0,2})/, '($1')
    .replace(/^(\(\d{2})(\d{0,5})/, '$1) $2')
    .replace(/(\d{5})(\d{0,4})$/, '$1-$2');
}

const form = document.getElementById('contatoForm');
const btn = document.getElementById('btnEnviar');
const fb = document.getElementById('feedback');
const lgpd = document.getElementById('lgpd');

const els = {
  nome: document.getElementById('nome'),
    tel: document.getElementById('tel'),
  cidade: document.getElementById('cidade'),
  estado: document.getElementById('estado'),
  assunto: document.getElementById('assunto'),
  mensagem: document.getElementById('mensagem'),
};

const errors = {
  nome: document.getElementById('erro-nome'),
  tel: document.getElementById('erro-tel'),
  cidade: document.getElementById('erro-cidade'),
  estado: document.getElementById('erro-estado'),
  assunto: document.getElementById('erro-assunto'),
  mensagem: document.getElementById('erro-mensagem'),
  preferencia: document.getElementById('erro-preferencia'),
  lgpd: document.getElementById('erro-lgpd'),
};

lgpd.addEventListener('change', () => {
  btn.disabled = !lgpd.checked;
});

els.tel.addEventListener('input', (e) => {
  e.target.value = maskPhone(e.target.value);
});

function validateField(name) {
  const el = els[name];
  const val = (el.value || '').trim();
  let msg = '';

  switch (name) {
    case 'nome':
      if (val.length < 3) msg = 'Informe ao menos 3 caracteres.';
      break;
    case 'tel': {
      const digits = val.replace(/\D/g, '');
      if (digits.length < 10) msg = 'Informe DDD + número (10 a 11 dígitos).';
      break;
    }
    case 'cidade':
      if (val.length < 2) msg = 'Informe sua cidade.';
      break;
    case 'estado':
      if (!val) msg = 'Selecione seu estado.';
      break;
    case 'assunto':
      if (!val) msg = 'Selecione um assunto.';
      break;
    case 'mensagem':
      if (val.length < 20) msg = 'Descreva com pelo menos 8 caracteres.';
      break;
  }
  errors[name].textContent = msg;
  return !msg;
}

Object.keys(els).forEach((name) => {
  els[name].addEventListener('blur', () => validateField(name));
  els[name].addEventListener('input', () => validateField(name));
});

function validatePreferencia() {
  const selected = [...document.querySelectorAll('input[name="preferencia"]')]
    .some(r => r.checked);
  errors.preferencia.textContent = selected ? '' : 'Escolha como prefere ser contatado.';
  return selected;
}
document.querySelectorAll('input[name="preferencia"]').forEach(r => {
  r.addEventListener('change', validatePreferencia);
});

function validateLgpd() {
  errors.lgpd.textContent = lgpd.checked ? '' : 'É necessário autorizar o contato.';
  return lgpd.checked;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fb.textContent = '';
  // roda todas as validações
  const ok =
    validateField('nome') &
    validateField('tel') &
    validateField('cidade') &
    validateField('estado') &
    validateField('assunto') &
    validateField('mensagem') &
    validatePreferencia() &
    validateLgpd();

  if (!ok) {
    fb.textContent = 'Revise os campos destacados e tente novamente.';
    fb.style.color = '#ef4444';
    return;
  }

  fb.textContent = 'Formulário enviado com sucesso! Em breve entraremos em contato.';
  fb.style.color = '#22c55e';
  form.reset();
  btn.disabled = true;
});
