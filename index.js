import express from 'express';

const host = '0.0.0.0';
const porta = 1213;

const server = express();

server.get('/reajuste', (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    const idade = parseInt(req.query.idade);
    const sexo = req.query.sexo;
    const salario = parseFloat(req.query.salario);
    const ano = parseInt(req.query.ano);
    const matricula = parseInt(req.query.matricula);

    var reajuste = 0;
    var newSalario = salario;
    var mensagem = '';

    if (!idade || !salario || !ano || !matricula) {
        mensagem = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reajuste</title>
            </head>
            <body>
                <h1>Requisições insuficientes!</h1>
                <h2>Por favor, informe corretamente a idade, salário, ano e matrícula!</h2>
            </body>
            </html>
        `;
    } else if (idade <= 16 || salario <= 0 || ano <= 1960 || matricula <= 0) {
        mensagem = 'Informações inválidas!';
    } else {
        if (idade >= 18 && idade <= 39) {
            if (sexo === 'M') {
                reajuste = salario * 0.10 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 17;
                } else {
                    newSalario = newSalario - 10;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.08 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 16;
                } else {
                    newSalario = newSalario - 11;
                }
            }
        } else if (idade >= 40 && idade <= 69) {
            if (sexo === 'M') {
                reajuste = salario * 0.08 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 15;
                } else {
                    newSalario = newSalario - 5;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.10 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 14;
                } else {
                    newSalario = newSalario - 15;
                }
            }
        } else if (idade >= 70 && idade <= 99) {
            if (sexo === 'M') {
                reajuste = salario * 0.15 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 13;
                } else {
                    newSalario = newSalario - 12;
                }
            } else if (sexo === 'F') {
                reajuste = salario * 0.17 / 100;
                newSalario = salario + reajuste;
                if (2025 - ano >= 1960) {
                    newSalario = newSalario + 12;
                } else {
                    newSalario = newSalario - 17;
                }
            }
        }

        mensagem = `
            Salário Atual: ${salario}
            Reajuste: ${reajuste}
            Novo Salário: ${newSalario}
        `;
    }

    resp.send(mensagem);
});

server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
