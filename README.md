# EDR-SIM - Endpoint Detection & Response Simulator 🛡️

O **EDR-SIM** é uma plataforma de simulação corporativa de alta fidelidade que demonstra as competências essenciais de um **Analista de Segurança de Endpoint (EDR/XDR/NGAV)**. Desenvolvido para servir como um ambiente de treinamento e demonstração, o simulador cobre todo o ciclo de vida de operações de segurança, desde a detecção e investigação até a resposta automatizada.

---

## 🚀 Tecnologias & Técnicas

### Stack Tecnológica
*   **Frontend**: React 18 + Vite 6
*   **Estilização**: Tailwind CSS v4 (Design System customizado para temas Cyber-Dark)
*   **Gráficos**: Recharts para visualização de telemetria e mapas de calor (Heatmaps).
*   **Persistência**: `StorageService` implementado sobre `localStorage` para simular um banco de dados persistente em um ambiente servidor-less (ideal para GitHub Pages ou Vercel).
*   **Navegação**: React Router para arquitetura modular de SPA.
*   **Onboarding**: React Joyride para guiar novos analistas pela plataforma.

### Técnicas Implementadas
*   **Triação de Alertas**: Lógica de priorização baseada em severidade (Critical, High, Medium, Low).
*   **Mapeamento MITRE ATT&CK®**: Integração técnica com o framework de táticas e técnicas adversárias.
*   **Orquestração de Resposta (SOAR)**: Fluxos de trabalho automatizados para contenção, erradicação e recuperação.
*   **Tuning de Detecção**: Gerenciamento de regras SIGMA e listas de exceções para redução de fadiga de alertas.

---

## 🏗️ Arquitetura e Árvore de Diretórios

A estrutura do projeto foi desenhada para ser modular e escalável, permitindo a fácil adição de novos módulos de segurança ou integração com APIs reais no futuro.

```text
edr-sim/
├── src/
│   ├── modules/              # Módulos Funcionais do Simulador
│   │   ├── dashboard/        # Centro de Comando e Estatísticas
│   │   ├── alerts/           # Investigação e Triação de Alertas
│   │   ├── endpoints/        # Inventário e Isolamento de Hosts
│   │   ├── mitre/            # Matriz interativa MITRE ATT&CK
│   │   ├── incidents/        # Orquestração de Resposta (SOAR)
│   │   ├── rules/            # Tuning de Regras e Exceções
│   │   ├── troubleshooting/   # Diagnósticos da Plataforma
│   │   ├── reports/          # Relatórios e Briefing Executivo
│   │   └── integrations/     # Gestão do Stack de Segurança
│   ├── services/             # Lógica de Persistência e Mock API
│   ├── data/                 # Dataset Inicial (Endpoints, Alertas, Técnicas)
│   ├── App.jsx               # Componente Raiz e Roteamento
│   └── main.jsx              # Ponto de entrada do React
├── public/                   # Ativos Estáticos (Ícones, SVGs)
├── index.html                # Template HTML principal
└── vite.config.js            # Configuração otimizada do Vite 6
```

---

## 🛡️ Casos de Uso e Estudos de Caso

### 📂 Caso 1: Investigação de Execução Suspeita de PowerShell
Um alerta de severidade **Critical** é disparado no host `WORKSTATION-05`. O analista utiliza o módulo de **Alerts** para visualizar os detalhes técnicos (T1059.001 - PowerShell). Através do EDR-SIM, é possível ver a relação com a técnica MITRE e seguir o playbook de resposta para encerrar o processo malicioso.

### 📂 Caso 2: Resposta a Incidente de Ransomware
Durante um ataque simulado, o analista utiliza o módulo de **Endpoints** para realizar o **Isolamento de Rede** imediato de um servidor vulnerável. Em seguida, aciona o playbook de "Eradication" no módulo de **Incidents**, que executa automaticamente a limpeza de chaves de registro e arquivos temporários, registrando todo o log em um terminal interativo.

### 📂 Caso 3: Tuning de Regras SIGMA para Redução de Falsos Positivos
O ambiente está gerando alertas excessivos para ferramentas de backup legítimas. O analista acessa o módulo de **Tuning** para criar uma exceção baseada no hash do binário oficial, reduzindo o ruído operacional em 40% e permitindo que o SOC foque em ameaças reais.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn

### Instalação e Execução
1.  Clone o repositório ou baixe o código.
2.  No terminal, instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Abra o navegador em `http://localhost:5173`. O tour de boas-vindas iniciará automaticamente!

### Build para Produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `/dist`.

---

> [!NOTE]
> Este projeto foi desenvolvido seguindo o "Modus Operandi" de desenvolvimento profissional, com commits atômicos, gerenciamento de branches por feature e foco em excelência visual.
