# Calculadora Analítica de ROI e Viabilidade de Projetos

**Acesso ao projeto em produção:** https://calculator-roi-two.vercel.app/

## Sobre o Projeto

Desenvolvi esta aplicação como uma ferramenta de inteligência de negócios focada em análise de viabilidade financeira. A ideia surgiu da necessidade real de eliminar incertezas na hora de aprovar orçamentos para campanhas de fidelidade, aquisição de equipamentos ou lançamento de novos projetos.

A calculadora transforma dados financeiros em respostas claras. Ela permite que a equipe identifique rapidamente o Ponto de Equilíbrio (Break-even), mostrando o momento exato em que um investimento deixa de ser um custo e passa a gerar lucro real para a operação.

## Principais Funcionalidades

* **Cálculo Dinâmico em Tempo Real:** Os valores são processados e atualizados instantaneamente conforme o usuário insere o Custo do Investimento e a Margem de Contribuição.
* **Identificação de Ponto de Equilíbrio:** Determina a quantidade exata de ações, vendas ou operações necessárias para zerar o investimento inicial.
* **Simulação Comparativa:** Gera uma tabela projetando cenários de lucro ou prejuízo para volumes escalonados (1, 5, 10, 15 e 20 unidades), integrando a linha de break-even de forma dinâmica.
* **Feedback Visual Condicional:** Aplica formatação de cores (vermelho para prejuízo, verde para lucro) para facilitar a interpretação rápida dos dados.
* **Gráfico de Barras Customizado:** Interface de análise visual construída nativamente, garantindo uma aplicação leve e rápida.
* **Design Responsivo:** Layout otimizado para dispositivos móveis, permitindo que a ferramenta seja acessada de qualquer lugar, seja no escritório ou em campo.

## Lógica Matemática Aplicada

O motor de cálculo do sistema fundamenta-se nas seguintes regras financeiras:

1. Ponto de Equilíbrio (Quantidade Mínima):
Q = Custo do Investimento / Retorno por Ação (arredondado para o próximo número inteiro)

2. Retorno sobre Investimento (ROI):
ROI = ((Retorno Total - Custo do Investimento) / Custo do Investimento) * 100

## Tecnologias Utilizadas

A arquitetura do projeto foi definida com foco em performance e manutenibilidade:

* **Frontend:** React.js
* **Tooling:** Vite (para um ambiente de desenvolvimento ágil e build otimizado)
* **Estilização:** Tailwind CSS (construção de interface moderna e responsiva)
* **Ícones:** Lucide-React
* **Hospedagem:** Vercel

## Como Executar Localmente

Para rodar este projeto na sua máquina, siga os passos descritos abaixo. É necessário ter o Node.js instalado.

1. Clone este repositório:
git clone [Insira o link do seu repositório GitHub aqui]

2. Acesse a raiz do projeto:
cd [nome-da-pasta-do-projeto]

3. Instale as dependências:
npm install

4. Inicie o servidor de desenvolvimento:
npm run dev

5. Abra o navegador no endereço indicado no terminal (padrão: http://localhost:5173).

---
Desenvolvido por Matheus Bueno.
