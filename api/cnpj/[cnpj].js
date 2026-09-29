module.exports = async (req, res) => {

    try {

        const cnpj = String(req.query.cnpj || "").replace(/\D/g, "");

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
        return res.status(200).json(dados);

    } catch (erro) {

        console.error("Erro na consulta:", erro);

        return res.status(500).json({
            erro: "Erro interno ao consultar o CNPJ."
        });
    }
};
