# Questões para discussão:
## Qual a vantagem de usar uma abordagem como gRPC ao invés de sockets?
A maior vantagem que pude ver foi em relação a independência da linguaguem. Usando gRPC, podemos estabelecer o schema no arquivo .proto e utilizar as implementações através de linguagens diferentes muito facilmente.
Outra vantagem que senti na hora de implementar foi a facilidade de se estabelecer callbacks para as funções, facilitou muito o desenvolvimento.
## Ainda comparando-se com a abordagem utilizando sockets, qual o papel do Protocol Buffer nos exercícios acima? Há algum aumento de complexidade?
O protocol buffer, fora diminuir o tamanho do que é mandado através da rede(quando comparado a objetos JSON), permite uma independência de linguagem. Ao se definir um schema no formato de ProtoBuffer, pode-se usá-lo entre servers e clients de diferentes linguagens.
## De forma geral, quais as principais diferenças entre as implementações da calculadora e dos chats?
A principal diferença é a necessidade de persistência de informações, nas implementações do chat: era necessário ter o registro de todos os clients conectados, e constantemente buscar um cliente específico, dentre esses.
Era também necessário no chat identificar a procedência das mensagens, e fazer uma seleção de para qual clientes fazer o broadcast daquela mensagem.