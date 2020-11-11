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
# rode a fila recebedora
node badVoltagesReceiver.js

# rode o source WebSocket
node sourceWS.js

#rode o filtro RxJS
node voltageFilter.js
```

Veja enquanto o source WebSocket se comunica com o filtro RxJS e este encaminha as voltagens fora do intervalo definido para a queue do RabbitMQ.