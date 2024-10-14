# Gestão de Animais em Situação de Rua

## Descrição do Projeto
Este projeto tem como objetivo desenvolver uma solução para o controle sustentável da população de animais em situação de rua no Recife. A solução aborda problemas de saúde pública, bem-estar animal e políticas de adoção, além de parcerias com clínicas veterinárias e ONGs locais.

## Cenário
A cidade de Recife enfrenta uma crescente quantidade de animais em situação de rua, resultando em:
- **Transmissão de doenças zoonóticas** entre animais e humanos.
- **Desafios no manejo de animais**, como alimentação, saúde e abrigo.
- **Frustração da comunidade** com o aumento de animais abandonados nas ruas.

## Features Mínimas:
- **Login para acesso em área restrita**: Permite que usuários autenticados acessem áreas restritas.
- **Esqueci minha senha**: Função de recuperação de acesso para usuários que esqueceram suas credenciais.
- **Logoff**: Saída segura da área restrita, encerrando a sessão do usuário.
- **Cadastro de Usuário (CRUD)**: Funcionalidade completa para criar, consultar, atualizar e deletar usuários.
- **Cadastro XPTO (CRUD)**: Similar ao cadastro de usuários, permite criar, consultar, atualizar e deletar registros do tipo XPTO.
- **Consulta de Listagem com paginação**: Listagem de dados com suporte a paginação para melhor performance.
- **Máscara/formatação de campos**: Aplicação de máscaras em campos de dados como datas, CPF, telefone, entre outros.
- **Responsividade para dispositivos móveis**: Layout e funcionalidades otimizados para dispositivos móveis.
- **Validação de token**: Validação de tokens de autenticação para assegurar o consumo seguro das APIs.
- **Containerização com Docker**: Uso de Docker para configurar o ambiente de desenvolvimento e produção. O projeto inclui um `Dockerfile` e, se necessário, um `docker-compose.yml` para orquestração de serviços entre front-end e back-end.

## Features Complementares (Extra Points):
- **Testes Automatizados**: Testes unitários para validar o comportamento e integridade do código.
- **Logging para Telemetria**: Coleta de logs e monitoramento do sistema em ambientes de produção e homologação.


## Tecnologias Utilizadas
- **Front-end**: React.js
- **Back-end**: Java
