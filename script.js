let nextPid = 1;
const container       = document.getElementById('form-container');
const addBtn          = document.getElementById('add-btn');
const clearBtn        = document.getElementById('btn-clear');
const simulateBtn     = document.getElementById('btn-start');
const fileInput       = document.getElementById('file-input');
const randomBtn       = document.getElementById('btn-random');
const algorithmSelect = document.getElementById('algorithm');

const quantumItem  = document.querySelector('#quantum').closest('.setting-item');
const priorityItem = document.querySelector('#priority').closest('.setting-item');
const modeItem     = document.querySelector('#mode').closest('.setting-item');
const formHeader   = document.querySelector('.form-header');

// 1) atualiza visibilidade de quantum/priority/mode
function updateSettingsUI() {
  const alg = algorithmSelect.value;
  quantumItem.style.display  = (alg === 'rr' || alg === 'srtf' || alg === 'pp') ? 'flex' : 'none';
  priorityItem.style.display = (alg === 'pc' || alg === 'pp')          ? 'flex' : 'none';
  modeItem.style.display     = 'flex';
}

// 2) atualiza cabeçalho e 3) linhas existentes
function updateFormDisplay() {
  const alg = algorithmSelect.value;
  const showPriority = (alg === 'pc' || alg === 'pp');
  // cabeçalho
  const cols = ['PID', 'Arrival Time', 'Duration Time']
             .concat(showPriority ? ['Priority Value'] : []);
  formHeader.innerHTML = '';
  cols.forEach(txt => {
    const sp = document.createElement('span');
    sp.textContent = txt;
    formHeader.appendChild(sp);
  });
  formHeader.style.gridTemplateColumns = `repeat(${cols.length}, 1fr)`;

  // ajusta cada row já existente
  container.querySelectorAll('.row').forEach(row => {
    // define css var para grid-template-columns
    row.style.setProperty('--num-cols', cols.length);
    // mostra/oculta só o <input> de priority
    const prInp = row.querySelector('input[id^="priority-"]');
    if (prInp) {
      prInp.style.display = showPriority ? 'block' : 'none';
    }
  });
}

algorithmSelect.addEventListener('change', () => {
  updateSettingsUI();
  updateFormDisplay();
});
// inicializa
updateSettingsUI();
updateFormDisplay();

// limpa tudo
clearBtn.addEventListener('click', () => {
  container.innerHTML = '';
  nextPid = 1;
});

// adiciona linha, **sempre** criando os 4 inputs
function addProcessRow() {
  const cols = formHeader.querySelectorAll('span').length;
  const row = document.createElement('div');
  row.classList.add('row');
  row.style.setProperty('--num-cols', cols);

  // PID
  const pidInput = document.createElement('input');
  pidInput.type = 'number';
  pidInput.value = nextPid++;
  pidInput.readOnly = true;
  row.appendChild(pidInput);

  // Arrival e Duration
  ['arrival', 'duration'].forEach(field => {
    const inp = document.createElement('input');
    inp.type = 'number';
    inp.id = `${field}-${nextPid-1}`;
    inp.value = 0;
    row.appendChild(inp);
  });

  // Priority (sempre criado, mas ocultável)
  const pr = document.createElement('input');
  pr.type = 'number';
  pr.id = `priority-${nextPid-1}`;
  pr.value = 0;
  row.appendChild(pr);

  container.appendChild(row);

  // logo após criar, aplica a visibilidade correta
  // (assim já fica consistente com o alg. atual)
  const alg = algorithmSelect.value;
  pr.style.display = (alg === 'pc' || alg === 'pp') ? 'block' : 'none';
}

addBtn.addEventListener('click', addProcessRow);

// random só preenche as linhas existentes
randomBtn.addEventListener('click', () => {
  const rows  = container.querySelectorAll('.row');
  if (rows.length === 0) {
    alert('Não há processos para gerar valores aleatórios. Adicione ao menos um.');
    return;
  }
  rows.forEach((row, idx) => {
    const pid = idx + 1;
    document.getElementById(`arrival-${pid}`).value  = Math.floor(Math.random() * 10);
    document.getElementById(`duration-${pid}`).value = Math.floor(Math.random() * 10) + 1;
    const pr = document.getElementById(`priority-${pid}`);
    if (pr && pr.style.display !== 'none') {
      pr.value = Math.floor(Math.random() * 5);
    }
  });
});

// simulate e upload (sem alterações)
simulateBtn.addEventListener('click', () => {
  const processos = [];
  for (let pid = 1; pid < nextPid; pid++) {
    processos.push({
      pid,
      arrival : Number(document.getElementById(`arrival-${pid}`).value),
      duration: Number(document.getElementById(`duration-${pid}`).value),
      // prioridade undefined se oculto
      priority: document.getElementById(`priority-${pid}`).style.display === 'none'
                ? undefined
                : Number(document.getElementById(`priority-${pid}`).value)
    });
  }
  console.log(processos);
  alert(JSON.stringify(processos, null, 2));
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result);
    alert('Arquivo carregado! Veja o console para o conteúdo.');
  };
  reader.readAsText(file);
});
