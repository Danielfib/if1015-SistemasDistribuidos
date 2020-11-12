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
# rode as sources(em terminais diferentes):
node sourceWS.js
node sourceRMQ.js

#rode o filtro RxJS
node voltageFilter.js

#rode a fila RMQ recebedora do filtro
node badVoltagesReceiver.js
```

Ou, você pode rodar apenas o all.js caso não queira ter que abrir cada terminal.
```bash
node all.js
```

Abra o arquivo queueViewer.html para visualizar no browser as voltagens fora do alcance sendo notificadas.