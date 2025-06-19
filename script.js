const chatContent = document.getElementById("chat-content");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function criarMensagem(mensagem, doUsuario) {
    const elemento = document.createElement("div");
    elemento.classList.add("break-words", "px-4", "py-2", "rounded-full");
    elemento.classList.add(doUsuario ? "bg-blue-500" : "bg-white");
    elemento.classList.add(doUsuario ? "text-white" : "text-gray-800");
    elemento.classList.add(doUsuario ? "ml-auto" : "mr-auto");
    elemento.textContent = mensagem;
    return elemento;
}

async function buscarResposta(mensagemUsuario) {
    try {
        const resposta = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5IZkJDMlNyYUVUTjIyZVN3UWFNX3BFTU85SWpCM2NUMUk3T2dxejhLSzBhNWNMMXNzZlp3c09BSTR6YW1Sc1BmdGNTVk1GY0liT1RoWDZZX1lNZlZ0Z1dqd3c9PQ==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: "Responda sempre em português. " + mensagemUsuario
            })
        });

        if (!resposta.ok) {
            console.error("Erro:", resposta.statusText);
            return "Ocorreu um erro ao obter a resposta. Tente novamente mais tarde.";
        }

        const dados = await resposta.json();

        if (data.text) {
            return data.text;
        } else {
            console.error("Resposta inválida:", data);
            return "Ocorreu um erro ao processar sua mensagem.";
        }
    } catch (erro) {
        console.error("Erro:", erro);
        return "Não sei ainda.";
    }
}

chatForm.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const mensagemUsuario = userInput.value.trim();
    if (!mensagemUsuario) return;

    chatContent.appendChild(criarMensagem(mensagemUsuario, true));
    scrollParaBaixo();
    userInput.value = "";
    userInput.disabled = true;

    const carregando = criarMensagem("Digitando...", false);
    chatContent.appendChild(carregando);
    scrollParaBaixo();

    const respostaBot = await buscarResposta(mensagemUsuario);
    carregando.remove();
    chatContent.appendChild(criarMensagem(respostaBot, false));
    scrollParaBaixo();

    userInput.disabled = false;
    userInput.focus();
});

function scrollParaBaixo() {
    chatContent.scrollTop = chatContent.scrollHeight;
}