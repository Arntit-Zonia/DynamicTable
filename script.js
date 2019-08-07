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

//adds support for bootstrap modal
($('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
}()));

// selectors
let myTable = document.getElementById("myTable");
let tbody = document.querySelector("tbody");
let addSaveBtn = document.querySelector("#addSaveBtn");
let edit = document.querySelector("#edit");
let editSave = document.querySelector("#editSave");
let del = document.querySelector("#delete");
let addElements = document.querySelectorAll(".addElements");
let editElements = document.querySelectorAll(".editElements");

//gets the property && values from arr and inserts them in the table
(function getData() {
  for (let obj of arr) {
    let values = Object.values(obj);
    let result = "";
    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (let elm of values) {
      result += `<td class="tdData">${elm}</td>`;
    }
    tr.innerHTML = result;
  }
}());

//enables toggle selection for clicked tr
(function selectData() {
  $('tbody').on("click", "tr", function () {
    $('tr').not(this).removeClass('selected');
    $(this).toggleClass('selected');
  });

  $("th").click((e) => e.stopPropagation()); //stops event bubbling && prevents selecting th
}());

(function preAdd() { //resets input text for Add option on click
  $("#preAddBtn").click(() => {
    for (let elm of addElements) {
      elm.value = "";
    }
  });
}());

// adds a new tr and td by using specified text
(function addModal() {
  let result = "";
  let addCloseBtn = document.querySelector("#addCloseBtn");
  
  addSaveBtn.addEventListener("click", (e) => {
    let validInputs = [];
    e.preventDefault();
    for (let elm of addElements) { // validation check
      validInputs.push(elm.value);
      if(validInputs.some(input => input === "")) {
        addCloseBtn.disabled = true;
        alert("All Fields Required");
        result = "";
        return;
      }
      else addCloseBtn.disabled = false;
      var tr = document.createElement("tr");
      tbody.appendChild(tr);
      result += `<td class="tdData">${elm.value}</td>`;
    }
    tr.innerHTML = result;
    result = "";
    $("#addModal").modal("hide");
  });
}());

// deletes selected tr
(function delBtn() {
  $(del).click(() => {
    if ($("tr").hasClass("selected")) $("tr").remove(".selected");
  });
}());

// displays the value of the selected tr for easier editing
(function preEdit() {
  let preEditBtn = document.querySelector("#preEdit");

  preEditBtn.addEventListener("click", () => {
    for (let i = 0; i < editElements.length; i++) {
      let tdData = document.querySelectorAll(".selected .tdData");
      editElements[i].value = "";
      if (tdData[i]) {
        editElements[i].value = tdData[i].innerHTML;
      }
    }
  });
}());

//modifies data already present in the table tr
(function editModal() {
  let result = "";

  editSave.addEventListener("click", (e) => {
    let validInputs = [];
    e.preventDefault();
    for (let i = 0; i < editElements.length; i++) {
      validInputs.push(editElements[i].value);
      if(validInputs.some(elm => elm === "")) {
        edit.disabled = true;
        alert("All Fields Required");
        result = "";
        return;
      }
      else {
        edit.disabled = false;
      }
      let tableData = document.querySelectorAll(".selected");
      for (let elm of tableData) {
        result += `<td class="tdData">${editElements[i].value}</td>`;
        elm.innerHTML = result;
      }
    }
    result = "";
    $("#editModal").modal("hide");
  });
}());
