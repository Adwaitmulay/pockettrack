// all expenses stored here
var expenses = [];

// this runs when add button is clicked
function addExpense() {

  // get values from inputs
  var name = document.getElementById("expName").value;
  var amount = document.getElementById("expAmount").value;
  var category = document.getElementById("expCategory").value;
  var errorMsg = document.getElementById("errorMsg");

  // check if fields are empty
  if (name == "" || amount == "" || category == "") {
    errorMsg.textContent = "Please fill all fields!";
    return;
  }

  // check if amount is valid number
  if (amount <= 0) {
    errorMsg.textContent = "Amount should be more than 0!";
    return;
  }

  // clear error
  errorMsg.textContent = "";

  // make expense object
  var newExpense = {
    id: Date.now(),
    name: name,
    amount: parseFloat(amount),
    category: category
  };

  // add to array
  expenses.push(newExpense);

  // clear input fields
  document.getElementById("expName").value = "";
  document.getElementById("expAmount").value = "";
  document.getElementById("expCategory").value = "";

  // update the page
  showExpenses();
  updateTotal();
}

// show expenses in the list
function showExpenses() {

  var list = document.getElementById("expenseList");
  var filter = document.getElementById("filterCategory").value;

  // clear list first
  list.innerHTML = "";

  // filter expenses
  var filtered = [];

  for (var i = 0; i < expenses.length; i++) {
    if (filter == "All" || expenses[i].category == filter) {
      filtered.push(expenses[i]);
    }
  }

  // if no expenses
  if (filtered.length == 0) {
    list.innerHTML = '<li class="empty-msg">No expenses found.</li>';
    return;
  }

  // show each expense
  for (var j = 0; j < filtered.length; j++) {

    var exp = filtered[j];

    var li = document.createElement("li");

    li.innerHTML =
      '<div class="exp-left">' +
        '<span class="exp-name">' + exp.name + '</span>' +
        '<span class="exp-category">' + exp.category + '</span>' +
      '</div>' +
      '<div class="exp-right">' +
        '<span class="exp-amount">₹' + exp.amount.toFixed(2) + '</span>' +
        '<button class="delete-btn" onclick="deleteExpense(' + exp.id + ')">🗑️</button>' +
      '</div>';

    list.appendChild(li);
  }
}

// delete one expense
function deleteExpense(id) {

  var newList = [];

  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id != id) {
      newList.push(expenses[i]);
    }
  }

  expenses = newList;

  showExpenses();
  updateTotal();
}

// update total amount shown
function updateTotal() {

  var total = 0;

  for (var i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }

  document.getElementById("total").textContent = "₹" + total.toFixed(2);
}

// filter when dropdown changes
function filterExpenses() {
  showExpenses();
}

// reset everything
function resetAll() {

  var confirm = window.confirm("Are you sure you want to delete all expenses?");

  if (confirm) {
    expenses = [];
    showExpenses();
    updateTotal();
  }
}
