let currentPage = 1;
const ITEMS_PER_PAGE = 5;

export async function submitScore(name, time) {
  await fetch("http://localhost:8080/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, time }),
  });
  displayScores(currentPage);
}

export async function displayScores(page) {
  const res = await fetch(`http://localhost:8080/scores?page=${page}`);
  const data = await res.json();

  const scores = data.scores;
  const hasNextPage = data.hasNextPage;

  let table = document.createElement("table");
  table.style.borderCollapse = "separate";
  table.style.borderSpacing = "10px 5px"; // Espacement horizontal et vertical entre les cellules

  let headerRow = document.createElement("tr");

  // Créer les en-têtes de la table
  let rankHeader = document.createElement("th");
  rankHeader.textContent = "Rank";
  rankHeader.style.padding = "5px";
  rankHeader.style.minWidth = "80px";
  rankHeader.style.textAlign = "left";
  headerRow.appendChild(rankHeader);

  let nameHeader = document.createElement("th");
  nameHeader.textContent = "Name";
  nameHeader.style.padding = "5px";
  nameHeader.style.minWidth = "100px";
  nameHeader.style.textAlign = "left";
  headerRow.appendChild(nameHeader);

  let timeHeader = document.createElement("th");
  timeHeader.textContent = "Time";
  timeHeader.style.padding = "5px";
  timeHeader.style.minWidth = "80px";
  timeHeader.style.textAlign = "left";
  headerRow.appendChild(timeHeader);

  table.appendChild(headerRow);

  // Ajouter les scores à la table
  scores.forEach((s, i) => {
    let row = document.createElement("tr");

    let rankCell = document.createElement("td");
    const rank = (page - 1) * ITEMS_PER_PAGE + i + 1;
    rankCell.textContent = rank;

    row.appendChild(rankCell);

    let nameCell = document.createElement("td");
    let paddedName =
      s.name.length < 6 ? s.name +"  ".repeat(6 - s.name.length) : s.name;
    nameCell.innerHTML = paddedName.replace(/ /g, "&nbsp;");
    nameCell.style.textAlign = "left";
    nameCell.style.padding = "2px";
    row.appendChild(nameCell);

    let timeCell = document.createElement("td");
    timeCell.textContent = s.time;
    timeCell.style.textAlign = "left";
    timeCell.style.padding = "2px";
    row.appendChild(timeCell);

    table.appendChild(row);
  });

  const scoreboardElement = document.getElementById("scoreboard");
  scoreboardElement.innerHTML = "";
  scoreboardElement.appendChild(table);
  scoreboardElement.style.marginLeft = "290px";

  // Pagination
  const paginationDiv = document.createElement("div");
  paginationDiv.style.width = "500px";
  paginationDiv.style.marginTop = "-0px"; // Ajoute un espace entre la table et les boutons

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = page <= 1;
  prevBtn.onclick = () => navigatePage(page - 1);
  prevBtn.style.background =
    'url("assets/green-btn.png") no-repeat center center';
  prevBtn.style.backgroundSize = "contain";
  prevBtn.style.cursor = "pointer";
  prevBtn.style.border = "none";
  prevBtn.style.padding = "10px 20px";
  prevBtn.style.fontSize = "16px";
  prevBtn.style.fontFamily = "early_gameboyregular";
  prevBtn.style.marginLeft = "60px";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = !hasNextPage;
  nextBtn.onclick = () => navigatePage(page + 1);
  nextBtn.style.background =
    'url("assets/green-btn.png") no-repeat center center';
  nextBtn.style.backgroundSize = "contain";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.border = "none";
  nextBtn.style.padding = "10px 20px";
  nextBtn.style.fontSize = "16px";
  nextBtn.style.fontFamily = "early_gameboyregular";
  nextBtn.style.marginLeft = "30px";

  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(nextBtn);
  scoreboardElement.appendChild(paginationDiv);
}

function navigatePage(page) {
  currentPage = page;
  displayScores(currentPage);
}
