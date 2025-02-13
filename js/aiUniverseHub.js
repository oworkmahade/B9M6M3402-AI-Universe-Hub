// load ai dada from API

const loadAI = async (isSeeMore) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const aiList = data.data.tools;
  displayAI(aiList, isSeeMore);
};

// display AI data in the UI
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
                   </div>
                           


                   <div class="lower-container ">
                    <hr class="border border-slate-200 w-4/5 mx-auto">
                    <div class="text-arrow-container flex flex-row justify-between items-center w-4/5 mx-auto my-4">

                      <div class="text flex flex-col">
                      <h2 class="text-xl font-semibold">${
                        aiElement?.name ? aiElement.name : "Name not found"
                      }</h2>

                    <div class="date-container flex flex-row items-center gap-2">
           
                    <div class="date-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>

                    <div class="date">
                    <p class="text-sm font-normal py-4">${
                      aiElement?.published_in
                        ? aiElement.published_in
                        : "Date not found"
                    }</p>
                    </div>

                    </div>
            

                   </div>
                   <div class="arrow">
                    <button id="seeDetails" onclick="seeDetails(${
                      aiElement.id
                    })" class="btn btn-circle">
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

// activate see more button
const seeMore = () => {
  loadAI(true);
};

// fetch details of AI data
const seeDetails = async (id) => {
  console.log(id);
  const formattedId =
    Number(id) < 10 ? id.toString().padStart(2, "0") : id.toString();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${formattedId}`
  );
  const data = await res.json();
  const aiDataDetails = data.data;
  seeDetailsModal(aiDataDetails);
};

// display data in modal
const seeDetailsModal = (aiDataDetails) => {
  console.log(aiDataDetails);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
                          <div class="text-section flex-1 p-4 border border-slate-100 rounded-xl bg-[#fef6f6]">
                            <!-- upper -->
                            <div class="upper mt-4">
                                <h1 class="text-xl font-semibold">${
                                  aiDataDetails?.description
                                }</h1>
                            </div>
                            <!-- middle  -->
                            <div class="middle flex flex-row gap-2 mt-4">
                                <div class="month-basic  bg-slate-100 rounded-xl flex-1 text-center p-4 text-green-600 flex justify-center items-center font-semibold">
                                <h2>${aiDataDetails?.pricing[0].price}</h2>
                        
                                   
                                </div>
                                <div class="month-pro  bg-slate-100 rounded-xl flex-1 text-center p-4 text-orange-600 flex justify-center items-center font-semibold">
                                     <h2>${aiDataDetails?.pricing[1].price}</h2>
                                </div>
                                <div
                                    class="contact-us-ent  bg-slate-100 rounded-xl flex-1 text-center p-4 text-red-600 flex justify-center items-center font-semibold">
                                   <h2>${aiDataDetails?.pricing[2].price}</h2>
                                </div>
                            </div>
                            <!-- lower -->
                            <div class="lower mt-4 flex flex-row justify-between gap-4">
                                <div class="features">
                        <h2 class="text-xl font-semibold mb-4">Features</h2>
                                </div>
                                <div class="integrations">
                                    <h2 class="text-xl font-semibold mb-4">Integrations</h2>
                                         ${
                                           aiDataDetails?.integrations
                                             ? aiDataDetails.integrations
                                                 .map(
                                                   (integration, index) =>
                                                     `${
                                                       index + 1
                                                     }. ${integration}`
                                                 )
                                                 .join("<br>")
                                             : "Integrations not found"
                                         } </h2>
                                </div>
                            </div>

                        </div>
                        <div
                            class="image-section flex-1 p-4 border border-slate-100 rounded-xl flex flex-col justify-center items-center">
                            <div class="image">
                                <figure class="px-10 pt-10">
                                    <img src="" alt="" class="rounded-xl" />
                                </figure>
                            </div>
                            <div class="text">
                                <h2>text1</h2>
                                <h2>text2</h2>
                            </div>
                        </div>
  `;
  my_modal.showModal();
};

// automatically call the function
loadAI();
