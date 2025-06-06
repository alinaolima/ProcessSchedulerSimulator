let nextPid = 1;
const container = document.getElementById('form-container');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const simulateBtn = document.getElementById('simulate-btn');

addBtn.addEventListener('click', () => {
    // Adiciona cabeçalhos se for a primeira linha
    if (nextPid === 1) {
        const header = document.createElement('div');
        header.classList.add('row', 'header');
        header.id = 'header-row';

        ['PID', 'Arrival time', 'Duration Time', 'Priority Value'].forEach(text => {
            const span = document.createElement('span');
            span.textContent = text;
            header.appendChild(span);
        });

        container.appendChild(header);
    }

    // Cria nova linha de dados
    const row = document.createElement('div');
    row.classList.add('row');
    row.id = `row-${nextPid}`;

    // Campo PID (não editável)
    const pidInput = document.createElement('input');
    pidInput.type = 'number';
    pidInput.id = `pid-${nextPid}`;
    pidInput.name = `pid-${nextPid}`;
    pidInput.value = nextPid;
    pidInput.readOnly = true;

    // Campo Time Arrival
    const arrivalInput = document.createElement('input');
    arrivalInput.type = 'number';
    arrivalInput.id = `arrival-${nextPid}`;
    arrivalInput.name = `arrival-${nextPid}`;
    arrivalInput.value = 0;

    // Campo Time Duration
    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.id = `duration-${nextPid}`;
    durationInput.name = `duration-${nextPid}`;
    durationInput.value = 0;

    // Campo Priority Value
    const priorityInput = document.createElement('input');
    priorityInput.type = 'number';
    priorityInput.id = `priority-${nextPid}`;
    priorityInput.name = `priority-${nextPid}`;
    priorityInput.value = 0;

    // Adiciona inputs na linha
    row.appendChild(pidInput);
    row.appendChild(arrivalInput);
    row.appendChild(durationInput);
    row.appendChild(priorityInput);

    // Anexa a linha no container
    container.appendChild(row);

    // Incrementa PID para próxima linha
    nextPid++;
});

clearBtn.addEventListener('click', () => {
    // Remove cabeçalhos e todas as linhas
    container.innerHTML = '';
    nextPid = 1;
});

simulateBtn.addEventListener('click', () => {
    const processos = [];

    for (let pid = 1; pid < nextPid; pid++) {
        const arrival = document.getElementById(`arrival-${pid}`);
        const duration = document.getElementById(`duration-${pid}`);
        const priority = document.getElementById(`priority-${pid}`);

        if (arrival && duration && priority) {
            processos.push({
                pid: pid,
                arrival: Number(arrival.value),
                duration: Number(duration.value),
                priority: Number(priority.value)
            });
        }
    }

    console.log(processos);
    alert(JSON.stringify(processos, null, 2));
});





