# Activity 3 - TCP and UDP calculator using custom protocol
Calculator implemented with TCP and UDP, but following provided protocol's guidelines: https://docs.jboss.org/jbossremoting/2.5.4.SP2/guide/html/ch02.html

## How?
For both implementations, you should run the _cpServerInvoker.js, then the _cpClient.js.
When both are running, it is enough to type on the client side the desired calculate command, following the format:
```
a1 a2 op

where op should be one of: +, -, *, /

#for example:
1 1 +
4 2 *
3812 12798 -
18721 23 /
```

## Questions:
#### Quais as principais dificuldades de implementação?
#### Como poderia ser feito o tratamento de erros?
#### Haveria alguma razão para se implementar um mecanismo de numeração/identificação de mensagens neste protocolo?