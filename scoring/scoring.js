
export async function submitScore(name, time) {
    await fetch("http://localhost:8080/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, time }),
    });
    displayScores(1);
}

export async function displayScores(page) {
    const res = await fetch(`http://localhost:8080/scores?page=${page}`);
    const scores = await res.json();

    let html = "<table><tr><th>Rank</th><th>Name</th><th>Time</th></tr>";
    scores.forEach((s, i) => {
        html += `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.time}</td></tr>`;
    });
    html += "</table>";
    document.getElementById("scoreboard").innerHTML = html;
}
