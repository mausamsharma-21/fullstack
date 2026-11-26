
const jokeElement = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

async function getJoke() {
  jokeBtn.disabled = true;
  jokeElement.textContent = "Loading a funny joke... 😂";

  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
      throw new Error("Could not fetch a joke");
    }

    const data = await response.json();

    jokeElement.textContent = `${data.setup} — ${data.punchline}`;
  } catch (error) {
    jokeElement.textContent =
      "Oops! Couldn't load a joke. Please try again.";
    console.error(error);
  } finally {
    jokeBtn.disabled = false;
  }
}

jokeBtn.addEventListener("click", getJoke);
