const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = async (req, res) => {

    try {

        const cnpj = String(req.query.cnpj || "").replace(/\D/g, "");


        // =========================================
        // VERIFICA CNPJ
        // =========================================

        if (cnpj.length !== 14) {

            return res.status(400).json({
                erro: "CNPJ inválido."
            });

        }


        // =========================================
        // CONSULTA CNPJá
        // =========================================

        const resposta = await fetch(
            `https://open.cnpja.com/office/${cnpj}`
        );


        if (!resposta.ok) {

            return res.status(resposta.status).json({
                erro: "Não foi possível consultar o CNPJ."
            });

        }


        const dados = await resposta.json();


        // =========================================
        // SALVA NO NEON
        // =========================================

        try {

            await pool.query(
                `
                INSERT INTO consultas_cnpj
                (
                    cnpj,
                    razao_social,
                    nome_fantasia,
                    situacao,
                    motivo,
                    cidade,
                    estado,
                    atividade_principal
                )
                VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8)
                `,
                [

                    cnpj,

                    dados.company?.name || null,

                    dados.alias || null,

                    dados.status?.text || null,

                    dados.reason?.text || null,

                    dados.address?.city || null,

                    dados.address?.state || null,

                    dados.mainActivity?.text || null

                ]
            );


            console.log(
                `Consulta ${cnpj} salva no Neon.`
            );


        } catch (erroBanco) {

            console.error(
                "Erro ao salvar no Neon:",
                erroBanco.message
            );

        }


        // =========================================
        // DEVOLVE OS DADOS PARA O SITE
        // =========================================

        return res.status(200).json(dados);


    } catch (erro) {

        console.error(
            "Erro na consulta:",
            erro
        );

        return res.status(500).json({
            erro: "Erro interno ao consultar o CNPJ."
        });

    }

};
