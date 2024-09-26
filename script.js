fetch ("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    let totalScore = 0;
    const itemCount = data.length;

    data.forEach((item, index) => {
      const section = document.querySelectorAll("section")[index];
      if (section) {
        totalScore += setupSection(section, item, index);
      }
    });

    const averageScore = (totalScore / itemCount).toFixed(0);
    const averageScoreDiv = document.getElementById("average-score");
    averageScoreDiv.textContent = `${averageScore}`;

    displayResults(averageScore);
  })
  .catch(error => {
    console.log("There was a problem with the fetch operation: ", error);
  });

function setupSection(section, item, index) {
  const imageContainer = document.querySelectorAll(".summary-header img")[index];
  const skill = document.querySelectorAll(".summary-header h3")[index];

  section.classList.add(item.category.toLowerCase());
  section.style.backgroundColor = item.backgroundColor;

  if (imageContainer) {
    imageContainer.src = item.icon;
    imageContainer.alt = `${item.category} Icon`;
  }

  if (skill) {
    skill.textContent = item.category;
    skill.style.color = item.textColor;
  }

  const scoreSpan = section.querySelector("h4 span");
  if (scoreSpan) {
    scoreSpan.textContent = item.score;
    return item.score;
  }

  return 0;
}

function displayResults(averageScore) {
  const resultHeader = document.querySelector(".result-description h3");
  const resultDescription = document.querySelector(".result-description p");

  const results = {
    "100": { header: "Perfect", description: "You scored higher than 98% of the people who have taken these tests." },
    "90-99": { header: "Excellent", description: "You scored higher than 87% of the people who have taken these tests." },
    "70-89": { header: "Great", description: "You scored higher than 65% of the people who have taken these tests." },
    "50-69": { header: "Good", description: "You scored higher than 50% of the people who have taken these tests." },
    "40-49": { header: "Okay", description: "You scored higher than 40% of the people who have taken these tests." },
    "0-39": { header: "Below Average", description: "You scored higher than 25% of the people who have taken these tests." },
  };

  let result;

  for (const [key, value] of Object.entries(results)) {
    const [min, max] = key.split("-").map(Number);
    if (averageScore >= min && averageScore <= (max || min)) {
      result = value;
      break;
    }
  }

  if (result) {
    resultHeader.textContent = result.header;
    resultDescription.textContent = result.description;
  }
}