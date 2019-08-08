let arr = [{
  ID: 1,
  firstName: "John",
  lastName: "Doe"
},
{
  ID: 2,
  firstName: "Kevin",
  lastName: "Swanson"
},
{
  ID: 3,
  firstName: "Grace",
  lastName: "Smith"
}
];

// adds support for bootstrap modal
($('#myModal').on('shown.bs.modal', function () {
$('#myInput').trigger('focus');
}()));

// selectors
let tbody = document.querySelector("tbody");
let addElements = document.querySelectorAll(".addElements");
let editElements = document.querySelectorAll(".editElements");
let preEditBtn = document.querySelector("#preEdit");

// gets the properties && values from arr and inserts them in the table
(function getData() {
  for(let obj of arr) {
    let values = Object.values(obj);
    let result = "";
    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    for(let elm of values) {
      result += `<td class="tdData">${elm}</td>`;
    }
    tr.innerHTML = result;
  }
}());

// enables toggle selection for clicked tr
// fires Edit click event only if a tr is selected
(function selectData() {
  preEditBtn.style.pointerEvents = 'none';

  $(tbody).on("click", "tr", function () {
    $('tr').not(this).removeClass('selected');
    $(this).toggleClass('selected'); 
    if($(this).hasClass("selected")) {
        preEditBtn.style.pointerEvents = 'auto';
    }
    else preEditBtn.style.pointerEvents = 'none';
  });

  $("th").click((e) => e.stopPropagation()); // stops event bubbling && prevents selecting th
}());

(function preAdd() { // resets input text for Add option on click
  $("#preAddBtn").click(() => {
    for(let elm of addElements) {
      elm.value = "";
    }
  });
}());

// adds a new tr and td by using specified text
(function addModal() {
  let addApply = document.querySelector("#addApply");
  let result = "";

  addApply.addEventListener("click", () => {
    for(let elm of addElements) {
      if(elm.value === "") { // validation check
        alert("All Fields Required");
        result = "";
        return;
      }
      var tr = document.createElement("tr");
      tbody.appendChild(tr);
      result += `<td class="tdData">${elm.value}</td>`;
    }
    tr.innerHTML = result;
    result = ""; // result gets reset so values won't pile on each other
    $("#addModal").modal("hide");
  });
}());

// displays the values of the selected tr for easier editing
(function preEdit() {
  preEditBtn.addEventListener("click", () => {
    for(let i = 0; i < editElements.length; i++) {
      let tdData = document.querySelectorAll(".selected .tdData");
      editElements[i].value = "";
      if (tdData[i]) {
        editElements[i].value = tdData[i].innerHTML;
      }
    }
  });
}());

// modifies data already present in the table
(function editModal() {
  let editApply = document.querySelector("#editApply");
  let result = "";
  let trCopy = [];

  editApply.addEventListener("click", () => {
    for(let input of editElements) {
      let tableData = document.querySelectorAll(".selected");
      for(let elm of tableData) {
        trCopy.push(elm.innerHTML); // copy of current tr values

        if(input.value === "") { // validation check
          alert("All Fields Required");
          elm.innerHTML = trCopy[0]; // index 0 contains all current tr values
          result = "";
          return;
        }
        result += `<td class="tdData">${input.value}</td>`;
        elm.innerHTML = result;
      }
    }
    result = "";
    $("#editModal").modal("hide");
  });
}());

// deletes selected tr
(function delBtn() {
  $("#delete").click(() => {
    if ($("tr").hasClass("selected")) $("tr").remove(".selected");

    //if there are no items in the list, the event for Edit doesn't fire
    if($("tr").length === 1) preEditBtn.style.pointerEvents = 'none';
    
    // fixes issue where edit would become available after an item was deleted
    preEditBtn.style.pointerEvents = 'none';
  });
}());
