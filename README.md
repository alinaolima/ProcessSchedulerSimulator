# Process Scheduler Simulator

Este é um simulador de algoritmos de escalonamento de processos desenvolvido com **HTML**, **CSS** e **JavaScript**, com foco no aprendizado prático e no desenvolvimento de habilidades em projetos reais. O objetivo é permitir a simulação visual e interativa de diferentes algoritmos de escalonamento de tarefas em sistemas operacionais.

---

## Estrutura do Projeto

```bash
process-scheduler-simulator/
├── index.html           // Página principal da aplicação
├── style.css            // Estilo visual da página
├── script.js            // Script principal que integra tudo
├── /algorithms          // Algoritmos de escalonamento
│   ├── fcfs.js            
│   ├── sjf.js
│   ├── rr.js
│   └── priop.js
├── /utils               // Funções auxiliares  
│   ├── input.js         // Leitura do formulário e do .txt
│   ├── generator.js     // Geração aleatória de processos
│   └── validator.js     // Validação de campos
├── assets/              // Imagens ou ícones (se houver)
│   └── logo.png
├── test-data/           // Arquivos .txt de entrada para testes
│   └── exemplo.txt
