const form = document.querySelector(".list_form");
const input = document.querySelector(".list_input");
const list_container = document.querySelector(".list_container");

const startConf = () => {
   // baslangic ayarlari
   const lists = JSON.parse(localStorage.getItem("lists"));
   if (!lists) {
      localStorage.setItem("lists", JSON.stringify([]));
   } else {
      lists.forEach(list => {
         addHTML(list);
      });
   }
}

const addlist = (e) => {
   e.preventDefault();

   const inputVal = input.value;

   if (inputVal == '')  { // boş değer girilmeye çalışıyor ise hata veriyoruz
      input.style.border = '1px solid tomato';
      setTimeout(() => {
         input.style.borderColor = 'transparent';
      }, 2500);
      return false;
   }

   const list = {
      text: inputVal,
      isCompleted: false,
   };

   const lists = JSON.parse(localStorage.getItem("lists"));
   lists.push(list);
   localStorage.setItem("lists", JSON.stringify(lists));

   addHTML(list);

   form.reset();
}

const deletelist = (e) => {
   const list = e.target.parentElement.parentElement;
   const text = list.firstChild.children[1].textContent;

   let lists = JSON.parse(localStorage.getItem("lists"));
   lists = lists.filter(td => td.text != text);
   localStorage.setItem("lists", JSON.stringify(lists));

   list.remove();
}

const completelist = (e) => {
   const list = e.target.parentElement.parentElement;
   const text = list.firstChild.children[1].textContent;

   let lists = JSON.parse(localStorage.getItem("lists"));

   lists.forEach(td => {
      if (td.text === text) td.isCompleted = !td.isCompleted
   });

   localStorage.setItem("lists", JSON.stringify(lists));
}

const savelist = (e) => {
   const list = e.target.parentElement.parentElement;
   const prevText = list.firstChild.children[1].textContent; // değiştirilmeden önceki değer
   const newText = list.firstChild.children[2].value; // editlerken girdiğimiz yeni değer

   let lists = JSON.parse(localStorage.getItem("lists"));

   lists.forEach(td => {
      if (td.text === prevText) td.text = newText;
   });

   localStorage.setItem("lists", JSON.stringify(lists));

   list.firstChild.children[1].textContent = newText;  // HTML üzerindeki değerini de değiştiriyoruz

   list.classList.remove("-edited"); // verdiğimiz classı kaldırıyoruz
}

const editlist = (e) => {
   const list = e.target.parentElement.parentElement;
   list.classList.add("-edited");
}

const addHTML = (list) => {
   const listDiv = document.createElement("div");
   listDiv.classList.add("list");

   const deleteBtn = document.createElement("a");
   deleteBtn.classList.add("delete");
   deleteBtn.textContent = "X";
   deleteBtn.addEventListener("click", deletelist);

   const hotelImg = document.createElement("div");
   hotelImg.classList.add("hotel_img");

   const hotel = document.createElement("div");
   hotel.classList.add("hotel");

   const hotelName = document.createElement("p");
   hotelName.classList.add("hotel_name");
   hotelName.textContent = list.text;

   const hotelRating = document.createElement("p");
   hotelRating.classList.add("hotel_rating");



   list.appendChild(deleteBtn);
   list.appendChild(hotelImg);
   list.appendChild(hotel);

   hotel.appendChild(hotelName);
   hotel.appendChild(hotelRating);


   listDiv.appendChild(list);

   list_container.appendChild(listDiv);
}

startConf();

form.addEventListener("submit", addlist);
