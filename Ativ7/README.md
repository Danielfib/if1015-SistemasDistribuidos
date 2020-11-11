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
node server.js
```

Abra a página client.html (quantas quiser)

```bash
# rode o terminal que fará o registro dos pedidos, passando como parâmetro o nome do pedido
node requestsApp.js nomeDoPedido
# você pode rodar isso várias vezes, tentando diferentes nomes, para adicionar vários pedidos
```

Nas páginas abertas, você pode clicar no botão de Autorizar, para cada pedido, e a lista será atualizada em todas as páginas.

# Questões para discussão:
## Qual a principal diferença entre cada exemplo dos tutoriais seguidos?
O primeiro tutorial aborda uma fila de mensagens simples, sem persistência e sem o conhecimento da lógica de divisão de tarefas que vem com o segundo tutorial (worker queues).

O segundo tutorial expande o primeiro, introduzindo conceitos de como RabbitMQ maneja, por padrão, tarefas quando existem vários consumidores. Ele também apresenta conceitos de persistência, tanto da fila quanto das mensagens.

O terceiro tutorial revela que na verdade, a mensagem não vai do produtor para a fila direto, mas que existe uma entidade no meio chamada Exnchange. Ao iniciar uma fila sem especificar o exchange, o que estava sendo feito nos primeiros dois exemplos, é iniciado um exchange default, que possui a lógica de divisão de tarefas padrão do RabbitMQ mostrada nos dois primeiros exemplos.
E então o terceiro tutorial segue a apresentar os diferentes tipos de comportamento que o exchange pode ter, mas focando no "fanout", que consiste em enviar cada mensagem para todos os consumidores, em vez de selecionar o consumidor para pegar aquela tarefa.
## Suponha que o seu servidor de filas (rabbitmq-server) está executando e possui filas que contém mensagens ainda não consumidas, e acidentalmente a máquina em que ele roda reinicia, como se pode garantir que as mensagens estarão salvas quando o servidor de filas voltar a funcionar?
Utilizando a flag de "durable" ao chamar o assert das filas ou exchanges, e a flag "noAck" em false, no método de consume do canal. Isso permite que o RabbitMQ saiba quando houve a perda da mensagem e redistribua a tarefa para outro consumidor. Porém, existe uma pequena janela de tempo em que a mensagem foi enviada mas ainda não aceita pela fila, em que é possível perder a mensagem.


