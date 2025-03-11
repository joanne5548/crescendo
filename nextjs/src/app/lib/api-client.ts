export const postUserMessage = async (content: string) => {
    try {
        const res = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userPrompt: content }),
        });

        if (!res.ok) {
            console.log(`Server Error: ${res.status}`);
        }

        const { text } = await res.json();
        return text;
    } catch (error) {
        console.log(`Server Error: ${error}`);
    }
};
