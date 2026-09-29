```javascript
console.log("JavaScript carregado!");


// =========================================
// ELEMENTOS DA PÁGINA
// =========================================

const form = document.getElementById("consultaForm");
const cnpjInput = document.getElementById("cnpj");
const consultarBtn = document.getElementById("consultarBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const resultadoSection =
    document.getElementById("resultadoSection");

const resultadoCard =
    document.getElementById("resultadoCard");


// =========================================
// FORMULÁRIO DO ESPECIALISTA
// =========================================

const especialistaSection =
    document.getElementById("especialistaSection");

const especialistaForm =
    document.getElementById("especialistaForm");

const nomeCliente =
    document.getElementById("nomeCliente");

const cnpjCliente =
    document.getElementById("cnpjCliente");

const emailCliente =
    document.getElementById("emailCliente");

const whatsappCliente =
    document.getElementById("whatsappCliente");


// =========================================
// WHATSAPP DO ESCRITÓRIO
// =========================================

const numeroWhatsApp =
    "5511965435876";


// Guarda a situação cadastral da última consulta
let statusConsultaAtual =
    "Não informado";


// =========================================
// WHATSAPP DO CABEÇALHO
// =========================================

const whatsappHeader =
    document.getElementById("whatsappHeader");


if (whatsappHeader) {

    const mensagemHeader =
        "Olá! Gostaria de falar com um especialista.";

    whatsappHeader.href =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
            mensagemHeader
        )}`;

    whatsappHeader.target =
        "_blank";

    whatsappHeader.rel =
        "noopener noreferrer";
}


// =========================================
// FORMATAÇÃO DO CNPJ
// =========================================

if (cnpjInput) {

    cnpjInput.addEventListener(
        "input",
        function () {

            let valor =
                cnpjInput.value.replace(/\D/g, "");

            valor =
                valor.slice(0, 14);


            valor =
                valor.replace(
                    /^(\d{2})(\d)/,
                    "$1.$2"
                );


            valor =
                valor.replace(
                    /^(\d{2})\.(\d{3})(\d)/,
                    "$1.$2.$3"
                );


            valor =
                valor.replace(
                    /\.(\d{3})(\d)/,
                    ".$1/$2"
                );


            valor =
                valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );


            cnpjInput.value =
                valor;

        }
    );

}


// =========================================
// FORMATAR CNPJ
// =========================================

function formatarCNPJ(cnpj) {

    const valor =
        String(cnpj || "")
        .replace(/\D/g, "");


    if (valor.length !== 14) {

        return cnpj ||
            "Não informado";

    }


    return valor.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );

}


// =========================================
// PROTEÇÃO CONTRA HTML
// =========================================

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================
// MOSTRAR RESULTADO
// =========================================

function mostrarResultado(dados) {

    const status =
        dados.status?.text ||
        "Não informado";


    // Guarda o status para o WhatsApp
    statusConsultaAtual =
        status;


    const nome =
        dados.company?.name ||
        "Não informado";


    const nomeFantasia =
        dados.alias ||
        "Não informado";


    const cnpj =
        dados.taxId
            ? formatarCNPJ(dados.taxId)
            : "Não informado";


    const cidade =
        dados.address?.city ||
        "Não informado";


    const estado =
        dados.address?.state ||
        "Não informado";


    const motivo =
        dados.reason?.text ||
        "Não informado";


    const atividade =
        dados.mainActivity?.text ||
        "Não informado";


    // =========================================
    // SITUAÇÃO
    // =========================================

    const statusNormalizado =
        status.toLowerCase().trim();


    const situacaoBaixada =
        statusNormalizado === "baixada";


    const situacaoAtiva =
        statusNormalizado === "ativa";


    let classeResultado =
        "resultado-pendencia";


    let icone =
        "!";


    let titulo =
        "Situação cadastral encontrada";


    if (situacaoAtiva) {

        classeResultado =
            "resultado-ok";

        icone =
            "✓";

        titulo =
            "CNPJ com situação ativa";

    }

    else if (situacaoBaixada) {

        classeResultado =
            "resultado-pendencia";

        icone =
            "!";

        titulo =
            "CNPJ com situação baixada";

    }


    // =========================================
    // CARD DO RESULTADO
    // =========================================

    resultadoCard.innerHTML = `

        <div class="resultado-conteudo ${classeResultado}">

            <div class="resultado-icone">
                ${icone}
            </div>


            <span class="resultado-status">
                SITUAÇÃO CADASTRAL
            </span>


            <h2>
                ${escaparHTML(titulo)}
            </h2>


            <p class="resultado-descricao">
                A consulta foi realizada com sucesso.
                Confira abaixo as informações encontradas.
            </p>


            <div class="resultado-dados">


                <div class="resultado-dado">

                    <span>
                        CNPJ
                    </span>

                    <strong>
                        ${escaparHTML(cnpj)}
                    </strong>

                </div>


                <div class="resultado-dado">

                    <span>
                        Situação
                    </span>

                    <strong>
                        ${escaparHTML(status)}
                    </strong>

                </div>


                <div class="resultado-dado">

                    <span>
                        Razão social
                    </span>

                    <strong>
                        ${escaparHTML(nome)}
                    </strong>

                </div>


                <div class="resultado-dado">

                    <span>
                        Nome fantasia
                    </span>

                    <strong>
                        ${escaparHTML(nomeFantasia)}
                    </strong>

                </div>


                <div class="resultado-dado">

                    <span>
                        Localização
                    </span>

                    <strong>
                        ${escaparHTML(cidade)}
                        -
                        ${escaparHTML(estado)}
                    </strong>

                </div>


                <div class="resultado-dado">

                    <span>
                        Atividade principal
                    </span>

                    <strong>
                        ${escaparHTML(atividade)}
                    </strong>

                </div>


                ${
                    situacaoBaixada
                        ? `
                            <div class="resultado-dado">

                                <span>
                                    Motivo
                                </span>

                                <strong>
                                    ${escaparHTML(motivo)}
                                </strong>

                            </div>
                        `
                        : ""
                }


            </div>


            <!-- =================================
                 BOTÃO DO ESPECIALISTA
            ================================== -->

            <div class="especialista-area">

                <p class="especialista-texto">
                    Precisa de ajuda com seu CNPJ?
                </p>


                <button
                    type="button"
                    class="especialista-button"
                    id="abrirEspecialista"
                >
                    Clique aqui para falar com um especialista
                </button>

            </div>


        </div>

    `;


    // =========================================
    // MOSTRA RESULTADO
    // =========================================

    resultadoSection.hidden =
        false;


    // =========================================
    // BOTÃO ESPECIALISTA
    // =========================================

    const abrirEspecialista =
        document.getElementById(
            "abrirEspecialista"
        );


    if (abrirEspecialista) {

        abrirEspecialista.addEventListener(
            "click",
            function () {

                // Preenche o CNPJ automaticamente

                if (cnpjCliente) {

                    cnpjCliente.value =
                        cnpj;

                }


                // Mostra formulário

                if (especialistaSection) {

                    especialistaSection.hidden =
                        false;


                    especialistaSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    // =========================================
    // ROLA ATÉ O RESULTADO
    // =========================================

    resultadoSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================
// CONSULTA DO CNPJ
// =========================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const cnpj =
                cnpjInput.value.replace(
                    /\D/g,
                    ""
                );


            // =====================================
            // VALIDAÇÃO
            // =====================================

            if (cnpj.length !== 14) {

                errorMessage.textContent =
                    "Digite um CNPJ válido com 14 números.";

                errorMessage.hidden =
                    false;

                resultadoSection.hidden =
                    true;

                return;

            }


            // =====================================
            // LIMPA A TELA
            // =====================================

            errorMessage.hidden =
                true;


            resultadoSection.hidden =
                true;


            if (especialistaSection) {

                especialistaSection.hidden =
                    true;

            }


            loading.hidden =
                false;


            consultarBtn.disabled =
                true;


            consultarBtn.textContent =
                "Consultando...";


            try {

                // =================================
                // CONSULTA API
                // =================================

                const resposta =
                    await fetch(
                        `/api/cnpj/${cnpj}`
                    );


                // =================================
                // TENTA RECEBER JSON
                // =================================

                const dados =
                    await resposta.json();


                // =================================
                // VERIFICA ERRO
                // =================================

                if (!resposta.ok) {

                    throw new Error(
                        dados.erro ||
                        "Não foi possível consultar o CNPJ."
                    );

                }


                console.log(
                    "Dados recebidos da API:",
                    dados
                );


                // =================================
                // MOSTRA RESULTADO
                // =================================

                mostrarResultado(
                    dados
                );


            }

            catch (erro) {

                console.error(
                    "Erro na consulta:",
                    erro
                );


                errorMessage.textContent =
                    erro.message ||
                    "Ocorreu um erro ao consultar o CNPJ.";


                errorMessage.hidden =
                    false;

            }

            finally {

                loading.hidden =
                    true;


                consultarBtn.disabled =
                    false;


                consultarBtn.textContent =
                    "Consultar CNPJ";

            }

        }
    );

}


// =========================================
// FORMATAÇÃO DO WHATSAPP
// =========================================

if (whatsappCliente) {

    whatsappCliente.addEventListener(
        "input",
        function () {

            let valor =
                whatsappCliente.value.replace(
                    /\D/g,
                    ""
                );


            valor =
                valor.slice(0, 11);


            if (valor.length <= 2) {

                whatsappCliente.value =
                    valor
                        ? `(${valor}`
                        : "";

            }

            else if (valor.length <= 7) {

                whatsappCliente.value =
                    `(${valor.slice(0, 2)}) ${valor.slice(2)}`;

            }

            else {

                whatsappCliente.value =
                    `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;

            }

        }
    );

}


// =========================================
// FORMULÁRIO DO ESPECIALISTA
// =========================================

if (especialistaForm) {

    especialistaForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nome =
                nomeCliente.value.trim();


            const cnpj =
                cnpjCliente.value.trim();


            const email =
                emailCliente.value.trim();


            const whatsapp =
                whatsappCliente.value.trim();


            // =================================
            // VALIDAÇÃO
            // =================================

            if (!nome) {

                nomeCliente.focus();

                return;

            }


            if (!email) {

                emailCliente.focus();

                return;

            }


            if (!whatsapp) {

                whatsappCliente.focus();

                return;

            }


            // =================================
            // MENSAGEM DO WHATSAPP
            // =================================

            const mensagem =

                `Olá! Fiz uma consulta pelo site e gostaria de falar com um especialista.

Nome: ${nome}
CNPJ: ${cnpj}
E-mail: ${email}
WhatsApp: ${whatsapp}
Situação cadastral: ${statusConsultaAtual}`;


            // =================================
            // LINK WHATSAPP
            // =================================

            const link =

                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                    mensagem
                )}`;


            // =================================
            // ABRE WHATSAPP
            // =================================

            window.open(
                link,
                "_blank"
            );

        }
    );

}
```
