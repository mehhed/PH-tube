// function for adding daynamic tab 
function tabFunction() {
  let main = document.getElementById('main-tag');
  let tabContainer = document.createElement('div');
  tabContainer.classList.add('py-5', 'text-center');
  tabContainer.innerHTML = `
  <a onclick="loadData(1000); setCatagoriIdInShortByButton(1000); changeStyle('Drawing', 'Comedy', 'music', 'All')" id="All"  class="  rounded-lg md:mx-2 md:btn-normal btn btn-sm btn-gray-300">All</a>
  <a onclick="loadData(1001); setCatagoriIdInShortByButton(1001); changeStyle('Drawing', 'Comedy', 'All', 'music')" id="music" class="rounded-lg md:mx-2 md:btn-normal btn btn-sm btn-gray-300 ">Music</a>
  <a onclick="loadData(1003); setCatagoriIdInShortByButton(1003); changeStyle('music', 'Drawing', 'All', 'Comedy')" id="Comedy" class="rounded-lg md:mx-2 md:btn-normal btn btn-sm btn-gray-300 ">Comedy</a>
  <a onclick="loadData(1005); setCatagoriIdInShortByButton(1005); changeStyle('All', 'music', 'Comedy', 'Drawing')" id="Drawing" class="rounded-lg md:mx-2 md:btn-normal btn btn-sm  btn-gray-300">Drawing</a>
  `;
  main.appendChild(tabContainer)
}
tabFunction()
// function for chane style tabs 
function changeStyle(remove_one, remove_two, remove_three, adding,) {
  document.getElementById(`${remove_one}`).classList.remove('bg-red-500', 'text-white');
  document.getElementById(`${remove_two}`).classList.remove('bg-red-500', 'text-white');
  document.getElementById(`${remove_three}`).classList.remove('bg-red-500', 'text-white');
  document.getElementById(`${adding}`).classList.add('bg-red-500', 'text-white');
}
changeStyle('Drawing', 'Comedy', 'music', 'All'); // deafult call for set style all tab button
// thi's site for adding card container in main tag 
let main = document.getElementById('main-tag');
let cardContainer = document.createElement('div');
main.appendChild(cardContainer);
loadData(1000, ) // deafult call
// function for load data to database with api 
function loadData(catagori_id, shortByView) {
  //  fetch for load data 
    cardContainer.innerHTML = '';
    fetch(`https://openapi.programming-hero.com/api/videos/category/${catagori_id}`)
    .then(data => data.json())
    .then(dataObject => {
      let dataArray = dataObject.data
      shortBy (dataArray, shortByView);
      })
}
// shorting function here 
function shortBy(catagoriData, shortClick) {
  if (shortClick === true) {
    let obj = catagoriData;
    obj.sort((peramitar_one, peramitar_two) => {
      let items_one = isNaN(peramitar_one.others.views) ? parseFloat(peramitar_one.others.views) : peramitar_one.others.views;
      let items_two = isNaN(peramitar_two.others.views) ? parseFloat(peramitar_two.others.views) : peramitar_two.others.views;
      return   items_two - items_one;
    })
    addingCard(obj)
  } else {
    let catagoriDataDeafult = catagoriData;
    addingCard(catagoriDataDeafult);
    console.log(catagoriDataDeafult)
  }
}
// function for adding card in card container 
function addingCard(dataArray) {
  if (dataArray.length === 0) {
    let elemetn = document.createElement('div')
    elemetn.classList.add('w-[100vw', 'text-center', 'mt-10');
    elemetn.innerHTML = `
    <img src="icon.png" class="mx-auto"> <br>
    <p class="text-3xl font-semibold">Oops!! Sorry, There is no <br> content here</p>
  `;
    cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-4', 'py-5');
    cardContainer.appendChild(elemetn);
  } else {
    cardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-4', 'py-5');
    dataArray.forEach(element => {
      // create card div and adding class 
      let card = document.createElement('div');
      card.classList.add('card', 'shadow-none', 'glass');
      // convert lotal second string to number  
      let totalSocend = parseFloat(element.others.posted_date);
       // convert second to hours and minits 
      function secondsToHoursMinutes(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remaining_Seconds = seconds % 3600;
        const minutes = Math.floor(remaining_Seconds / 60);
        return {
          hours: hours,
          minutes: minutes
        };
      }
      const time = secondsToHoursMinutes(totalSocend);
      // set card inner html like baner img owner 
      card.innerHTML = `
            <figure>
                <div class=" h-[200px] relative w-full">
                  <img src="${element.thumbnail}" alt="" class="w-full h-full" />
                  <span class="${(element.others.posted_date === '') ? 'hidden' : 'absolute right-1 bottom-1 text-sm bg-black text-white py-1 px-3 rounded-lg'}">${isNaN(time.hours) ? '' : time.hours}hrs ${isNaN(time.minutes) ? '' : time.minutes} min ago</span>
                </div>
            </figure>
            <div class="card-body border-none p-0 mt-3">
                <div class="flex gap-x-3">
                    <div>
                      <img src="${element.authors[0].profile_picture}" alt=""  class="rounded-full h-[50px] w-[50px]">
                    </div>
                    <div>
                        <h2 class="card-title">${element.title}</h2>
                        <p class="my-1 flex gap-x-2 items-center"><span>${element.authors[0].profile_name}</span> <svg xmlns="${element.authors[0].verified ? 'http://www.w3.org/2000/svg' : ''}" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_13_1000)">
                          <path d="${element.authors[0].verified ? 'M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z' : ''}" fill="#2568EF"/>
                          <path d="M12.7093 7.20637L9.14053 10.7751L7.29053 8.92668C6.88897 8.52512 6.2374 8.52512 5.83584 8.92668C5.43428 9.32824 5.43428 9.97981 5.83584 10.3814L8.43115 12.9767C8.82178 13.3673 9.45615 13.3673 9.84678 12.9767L14.1624 8.66106C14.564 8.25949 14.564 7.60793 14.1624 7.20637C13.7608 6.80481 13.1108 6.80481 12.7093 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_13_1000">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg> </p>
                        <p>${element.others.views}</p>
                    </div>
                </div>
            </div>
            `;
      cardContainer.appendChild(card);
    });
  }// cloase elase 
}
// bloag button related js 
document.getElementById('bloag-button').addEventListener('click', function () {
  document.location.href = 'blog.html';
})
// handale short by button 
setCatagoriIdInShortByButton(1000)// deafult call for set card top to low by view
function setCatagoriIdInShortByButton(catagoriId) {
  document.getElementById('ShortByView').removeAttribute('onclick');
  document.getElementById('ShortByView').setAttribute('onclick', `loadData(${catagoriId}, true)`)
}