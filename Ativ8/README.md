# Como usar?
## Pré-requisito
Estar com o RabbitMQ instalado e rodando no localhost, na porta padrão (5672)
Mais informações em: https://www.rabbitmq.com/download.html

Instalar o WebServer, caso já não esteja:
```bash
npm install ws
```
## Uso da aplicação
```bash
# rode o servidor
npm server.js
```

Abra a página client.html (quantas quiser)

```bash
# rode o terminal que fará o registro dos pedidos, passando como parâmetro o nome do pedido
node requestsApp.js nomeDoPedido
# você pode rodar isso várias vezes, tentando diferentes nomes, para adicionar vários pedidos
```

Nas páginas abertas, você pode clicar no botão de Autorizar, para cada pedido, e a lista será atualizada em todas as páginas.

# Questões para discussão:
## Qual o principal ponto para se tratar os sources com RxJS?

## Quais as principais dificuldades com a resolução do exercício?