# Questões para discussão:
## Quais as principais diferenças entre esta implementação e a implementação com sockets TCP?
Creio que a principal diferença é que utilizando web socket foi mais rápido e fácil, e também poder rodar/debugar pelo browser. Os eventos nos sockets são bem parecidos tanto em sintaxe quanto em semântica.
## Quais as principais dificuldades com a implementação usando EventSource?
Com a implementação do EventSource, não entendi totalmente como deve ser o formato dos parâmetros passados no método write(). As mensagens não chegavam, até que eu usei o mesmo formato do exemplo: "data:" + mensagem + "\n\n", e passou a funcionar.
