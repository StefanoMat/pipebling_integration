# PipeBling Integration
This repository is created to develop a integration between Pipedrive and Bling! with NodeJS

## Diferencias do PipeBling Integration
#Reconhece os campos CNPJ(cnpj) e Inscrição Estadual(inscricao_estadual) da organização do PipeDrive **automagicamente**. Para o Bling realizar verificações mais precisas do respectivo pedido.
#Retorna todas as oportundiades criadas. Agrupadas por dia e valor total

## Rotas
Na rota para efetuar a integração, envie um POST com o corpo JSON contendo "pipeDriveKey" e "blingKey" para ter acesso á suas contas para:
```
/v1/integration
```
Na rota para capturar os regisros criados, envie um GET para:
```
/v1/deals
```


## Como iniciar?

## Variáveis de ambiente 
configure o arquivo .ENV do root para apontar a porta do servidor Node e o host do MongoDB

## Crie o banco de dados
Crie uma base (padrão é: pipebling_integration) com uma collection chamada 'deals'

## Inicie o servidor
###  Para o back-end
Rode os comando na raiz do projeto
```
npm install
npm start
```

## Testes
Rode os testes na pasta app/
```
npm test
```

## Design Patterns utilizados
### #Factory
### #Dependency Injection
### #Adapter
### #Decorator
