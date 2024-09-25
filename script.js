fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    let totalScore = 0;
    const itemCount = data.length;

    data.forEach(item => {
      const section = document.querySelector(`section.${item.category.toLowerCase()}`);

      if (section) {
        const scoreSpan = section.querySelector("h4 span");
        if (scoreSpan) {
          scoreSpan.textContent = `${item.score}`;
          totalScore += item.score;
        }
      }
    });
    const averageScore = totalScore / itemCount;

    const averageScoreDiv = document.getElementById("average-score");
    averageScoreDiv.textContent = `${averageScore.toFixed(0)}`
    console.log(averageScore.toFixed(0))
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation: ", error)
  });