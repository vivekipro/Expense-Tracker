var budgetInput = document.getElementById("budget");
var budgetbtn = document.getElementById('budgetbtn');
var totalbudget = document.getElementById('totalbudget');
let expenseText = document.getElementById('expenseText');
let expenseAmount = document.getElementById('expenseAmount');
let addamtbtn = document.getElementById('addamtbtn');
let moneyplus = document.getElementById('moneyplus');
let moneyminus = document.getElementById('moneyminus');
var budgetValue = 0;
var expense = 0;
var balance = 0;
let arr = [];


//add total budget and show on ui
budgetbtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the value from the input and format it
    budgetValue = parseFloat(budgetInput.value).toFixed(2);
    balance = (parseFloat(budgetValue) - expense).toFixed(2);
    moneyminus.innerHTML = `$ ${balance}`;
    moneyplus.innerHTML = `$ ${expense}`;

    // Update the total budget display
    totalbudget.innerHTML = `$ ${budgetValue}`;
    budgetInput.value = 0;
});



//add expense and balance amt on ui
addamtbtn.addEventListener('click', (e) => {
    e.preventDefault();

    let expamt = parseFloat(expenseAmount.value);
    let arrtxt = expenseText.value;

    // Check if the entered expense is a valid number
    if (!isNaN(expamt)) {
        // Calculate the new balance and update the display
        expense = (parseFloat(expense) + expamt).toFixed(2);
        balance = (parseFloat(budgetValue) - expense).toFixed(2);
        arr.push({
            title: arrtxt,
            value: expamt
        });
        updateExpenseListUI();
        // console.log(arr);

        moneyplus.innerHTML = `$ ${expense}`;
        moneyminus.innerHTML = `$ ${balance}`;

        expenseText.value = '';
        expenseAmount.value = '';
    } else {
        alert('Please enter a valid expense amount.');
    }
});






function updateExpenseListUI() {
    let tbody = document.getElementById('tbody')
    tbody.innerHTML = '';

    // Add each expense item to the table
   
        arr.map((item, index) => {
            let newRow = tbody.insertRow();
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);

            cell1.innerHTML = item.title;
            cell2.innerHTML = `$ ${item.value}`;
            cell2.classList.add("expenseAmount");
            cell3.innerHTML = '<i class="fa-solid fa-trash" style="color: #ed2e0c;" onclick="deleteExpense(' + index + ')"></i>';
            cell4.innerHTML = '<i class="fa-solid fa-pen" style="color: #0861fd;" onclick="updateExpense(' + index + ')"></i>';
        });
    
}


// Function to delete an expense item
function deleteExpense(index) {
    // Remove the expense item from the array
    expense -= parseFloat(arr[index].value);
    // console.log(arr[index].value)
    balance = parseInt(balance) + parseInt(arr[index].value);
    arr.splice(index, 1);
    console.log(arr)
    // Update the UI
    updateExpenseListUI();
    moneyplus.innerHTML = `$ ${expense}`;
    moneyminus.innerHTML = `$ ${balance}`;

}


// Function to update an expense item
function updateExpense(index) {
    const updatedTitle = prompt('Enter updated expense title:', arr[index].title);
    const updatedValue = parseFloat(prompt('Enter updated expense value:', arr[index].value));

    
    if (!isNaN(updatedValue)) {
        arr[index].title = updatedTitle;
        arr[index].value = updatedValue;

        
        expense = arr.reduce((total, item) => total + item.value, 0);
        balance = budgetValue - expense;

        
        updateExpenseListUI();
        moneyplus.innerHTML = `$ ${expense.toFixed(2)}`;
        moneyminus.innerHTML = `$ ${balance.toFixed(2)}`;
    } else {
        alert('Please enter a valid expense value.');
    }
}
