const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function sendMessage() {
    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {
        botReply(text);
    }, 1000);
}

function addMessage(message, type) {
    const div = document.createElement("div");

    div.classList.add("message", type);
    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function botReply(text) {

    text = text.toLowerCase();

    let reply = "Desculpe, não entendi. 😅";

    if (text.includes("oi") || text.includes("olá")) {
        reply = "Olá! Como posso ajudar?";
    }

    else if (text.includes("quem e a kezia")) {
        reply = "Kezia é uma desenvolvedora Front-End em formação 🚀";
    }

    else if (text.includes("seu nome")) {
        reply = "Sou um ChatBot criado em JavaScript.";
    }

    else if (text.includes("hora")) {
        reply = `Agora são ${new Date().toLocaleTimeString()}`;
    }

    else if (text.includes("data")) {
        reply = `Hoje é ${new Date().toLocaleDateString()}`;
    }

    else if (text.includes("obrigado")) {
        reply = "Por nada! 😊";
    }

    else if (text.includes("tchau")) {
        reply = "Até logo! 👋";
    }

    else if (text.includes("piada")) {
        reply = "Por que o JavaScript foi ao psicólogo? Porque tinha muitos problemas de escopo 😂";
    }

    else if (text.startsWith("clima ")) {

        const cidade = text.replace("clima ", "");

        const respostaClima = await getWeather(cidade);

        addMessage(respostaClima, "bot");

        return;
    }

    addMessage(reply, "bot");
}

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        const data = await response.json();

        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;

        return `🌤️ Em ${city} está ${temp}°C com ${desc}`;

    } catch (error) {

        console.error(error);

        return "❌ Não consegui buscar o clima.";

    }
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});