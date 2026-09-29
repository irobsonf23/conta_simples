const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Permite que o Express entregue os arquivos do site
app.use(express.static(__dirname));


// Consulta CNPJ
app.get("/api/cnpj/:cnpj", async (req, res) => {

    try {

        const cnpj = req.params.cnpj.replace(/\D/g, "");


        // Verifica se possui 14 números
        if (cnpj.length !== 14) {

            return res.status(400).json({
                erro: "CNPJ inválido."
            });

        }


        // Consulta a API CNPJá
        const resposta = await fetch(
            `https://open.cnpja.com/office/${cnpj}`
        );


        // Verifica resposta da API
        if (!resposta.ok) {

            return res.status(resposta.status).json({
                erro: "Não foi possível consultar o CNPJ."
            });

        }


        // Converte resposta para JSON
        const dados = await resposta.json();


        // Envia os dados para o navegador
        res.json(dados);


    } catch (erro) {

        console.error("Erro na consulta:", erro);

        res.status(500).json({
            erro: "Erro interno ao consultar o CNPJ."
        });

    }

});


// Inicia o servidor
app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});