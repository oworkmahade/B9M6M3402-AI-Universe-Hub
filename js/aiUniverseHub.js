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
                           


                   <div class="lower-container ">
                    <hr class="border border-slate-200 w-4/5 mx-auto">
                    <div class="text-arrow-container flex flex-row justify-between items-center w-4/5 mx-auto my-4">
                      <div class="text flex flex-col">
                    <h2 class="text-xl font-semibold">ChatGPT</h2>
                    <p class="text-sm font-normal py-4">11/01/2022</p>
                   </div>
                   <div class="arrow">
                    <button class="btn btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
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
