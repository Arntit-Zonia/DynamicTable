let arr = [
  { ID: 1, firstName: "John", lastName: "Doe"},
  { ID: 2, firstName: "Kevin", lastName: "Swanson"},
  { ID: 3, firstName: "Grace", lastName: "Smith"}
];

//adds support for bootstrap modal
($('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
}()));

// selectors
let myTable = document.getElementById("myTable");
let tbody = document.querySelector("tbody");
let add = document.querySelector("#add");
let edit = document.querySelector("#edit");
let del = document.querySelector("#delete");
let addElements = document.querySelectorAll(".addElements");
let editElements = document.querySelectorAll(".editElements");

 //gets the property && values from arr and inserts them in the table
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

//enables toggle selection for clicked tr
(function selectData() {
  $('tbody').on("click", "tr", function() {
    $('tr').not(this).removeClass('selected');
    $(this).toggleClass('selected');
  });
  
  $("th").click((e) => e.stopPropagation()); //stops event bubbling && prevents selecting th
}());

(function preAdd() { //resets input text for Add option on click
  $("#preAddBtn").click(() => {
    for(let elm of addElements) {
      elm.value = "";
    }
  });
}());

// adds a new tr and td by using specified text
(function addModal() {
  let result = "";
  let tr = document.createElement("tr");

  add.addEventListener("click", () => {
    for(let elm of addElements) { // validation check
      if(elm.value === "") {
        result = "";
        return;
      }
      tbody.appendChild(tr);
      result += `<td class="tdData">${elm.value}</td>`;
      elm.value = "";
    }
    tr.innerHTML = result;
    result = "";
  });
}());

// deletes selected tr
(function delBtn() {
  $(del).click( () => {
    if($("tr").hasClass("selected")) $("tr").remove(".selected");
  });
}());

// displays the value of the selected tr for easier editing
(function preEdit() {
  let preEditBtn = document.querySelector("#preEdit");

  preEditBtn.addEventListener("click", () => {
    for(let i = 0; i < editElements.length; i++) {
      let tdData = document.querySelectorAll(".selected .tdData");
      editElements[i].value = "";
        if(tdData[i]) {
          editElements[i].value = tdData[i].innerHTML;
        } 
    }
  });
}());

//modifies data already present in the table tr
(function editModal() {
  let result = "";

  edit.addEventListener("click", () => {
    // let selected = $("tr").hasClass("selected");
    for(let i = 0; i < editElements.length; i++) {
      if(editElements[i].value === "") {
        alert("All Fields Required");
        document.location.reload();
      }
      let tableData = document.querySelectorAll(".selected");
      for(let elm of tableData) {
        result += `<td class="tdData">${editElements[i].value}</td>`;
        elm.innerHTML = result;
      }
      editElements[i].value = "";
    }
    result = "";
  });
}());
