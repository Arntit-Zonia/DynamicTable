var array = [
  { ID: 1, firstName: "Coffee", lastName: "3£"},
  { ID: 2, firstName: "Enegry Drink", lastName: "2.5£"},
  { ID: 3, firstName: "Muffin", lastName: "2£"}
];

let myTable = document.getElementById("myTable");
let tbody = document.querySelector("tbody");
let add = document.querySelector("#add");
let edit = document.querySelector("#edit");
let del = document.querySelector("#delete");

 //gets the property && values from array and inserts them in the table
(function getData() {
  for (let obj of array) {
    let values = Object.values(obj);
    let result = "";
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
  
    for(let i = 0; i < values.length; i++) {
      result += `<td>${values[i]}</td>`;
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
  
  $("th").click((e) => e.stopPropagation()); //stops event bubbling
}());

//support for bootstrap modal
($('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
}()));

// adds a new tr and td by using specified text
(function addModal() {
  let addElements = document.querySelectorAll(".addElements");
  let result = "";

  add.addEventListener("click", () => {
    for(let i = 0; i < addElements.length; i++) {
      var tr = document.createElement("tr");
      tbody.appendChild(tr);
      result += `<td>${addElements[i].value}</td>`;
      addElements[i].value = "";
    }
    tr.innerHTML = result;
    result = "";
  });
}());

// deletes selected tr
(function delModal() {
  $(del).click( () => {
    if($("tr").hasClass("selected")) {
      $("tr").remove(".selected");
      
    }
  });
}());

//modifies data already present in the table tr
(function editModal() {
  let editElements = document.querySelectorAll(".editElements");
  let result = "";

  edit.addEventListener("click", () => {
    let selected = $("tr").hasClass("selected");
    for(let i = 0; i < editElements.length; i++) {
      if(selected){
        let tableData = document.querySelectorAll(".selected");
        for(let elm of tableData) {
          result += `<td>${editElements[i].value}</td>`;
          elm.innerHTML = result;
          editElements[i].value = "";
        }
      }
    }
    result = "";
  });
}());
