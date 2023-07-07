Requisitos
Node JS (última versão estável)

PostgreSQL (container docker ou próprio SGBD)

1 - Com o Docker instalado na máquina executar o comando docker run --name postgres -e POSTGRES_PASSWORD=suasenha -p 5432:5432 -d postgres

2 - Depois iniciar o container PostgreSQL criado com o comando docker start postgres

3 - Crie a database teste_seidor

4 - Cria um arquivo .env seguindo as variaveis do arquivo .env.example, substitua os valores para os valores utilizados por
você

#Aplicação backend#
 
Execute os comandos no diretório do projeto
#yarn ou npm install#
Execute esse comando para instalar todas as dependências utilizadas no projeto.

#yarn typeorm migration:run ou npm typeorm migration:run#
Execute esse comando para rodar as migrations e criar as tabelas no banco de dados.

#yarn dev ou npm run dev#
Execute esse comando para executar a API no endereço http://localhost:3333

#yarn test ou npm test#
Execute esse comando para executar os testes automatizados.
