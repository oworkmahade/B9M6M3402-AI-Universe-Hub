const loadAI = async (isSeeMore) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiList = data.data.tools;
  displayAI(aiList, isSeeMore);
};

const displayAI = (aiList, isSeeMore) => {
  const aiCardContainer = document.getElementById("ai-card-container");
  aiCardContainer.innerHTML = "";
  const seeMoreBtn = document.getElementById("seeMore-btn");
  if (aiList.length > 6 && isSeeMore) {
    seeMoreBtn.classList.add("hidden");
  } else {
    seeMoreBtn.classList.remove("hidden");
  }

  if (!isSeeMore) {
    aiList = aiList.slice(0, 6);
  }

  aiList.forEach((aiElement) => {
    console.log(aiElement);

    const aiCard = document.createElement("div");
    aiCard.classList = `card bg-base-100 w-96 shadow-xl`;
    aiCard.innerHTML = `
                    <figure class="px-10 pt-10">
                    <img src="${
                      aiElement?.image ? aiElement.image : "Images Not Found "
                    }" alt=""
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body items-left text-left">
                    <h2 class="text-xl font-semibold">Features</h2>
                    <h2 class="text-sm font-normal">${aiElement?.features
                      .map((feature, index) => `${index + 1}. ${feature}`)
                      .join("<br>")}</h2>

                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                   </div>
    `;
    aiCardContainer.appendChild(aiCard);
  });
};

const seeMore = () => {
  loadAI(true);
};

loadAI();
