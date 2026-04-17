//1-Pegando o HTML
const form = document.getElementById('formCadastro');
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');


//2-Eventos
cepInput.addEventListener('blur', buscarCEP);
FormData.addEventListener("input", salvarDados);
window.addEventListener("load", carregarDados);

//3-Buscar CEP
async function buscarCEP() {
    const cep = cepInput.value.replace("-", "");
    if (cep.length !== 8) {
        alert("CEP inválido!");
        return;
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();
        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }
        ruaInput.value = dados.logradouro;
        bairroInput.value = dados.bairro;
        cidadeInput.value = dados.localidade;
        estadoInput.value = dados.uf;
        salvarDados();
    } catch (error) {
        alert("Erro ao buscar CEP!");
        console.error(error);
    }


    //4-Salvar dados no localStorage
    function salvarDados() {

        const dados = {
            nome: form.nome.value,
            email: form.email.value,
            senha: form.senha.value,
            cep: cepInput.value,
            rua: ruaInput.value,
            bairro: bairroInput.value,
            cidade: cidadeInput.value,
            estado: estadoInput.value
        };
        localStorage.setItem("cadastroUsuario", JSON.stringify(dados));
    }

    //5-Restaurar dados do localStorage
    function carregarDados() {
        const dadosSalvos = localStorage.getItem("cadastroUsuario");
        if (!dadosSalvos) return;
        const dados = JSON.parse(dadosSalvos);

        form.nome.value = dados.nome;
        form.email.value = dados.email;
        form.senha.value = dados.senha;
        cepInput.value = dados.cep;
        ruaInput.value = dados.rua;
        bairroInput.value = dados.bairro;
        cidadeInput.value = dados.cidade;
        estadoInput.value = dados.estado;
        }
    }