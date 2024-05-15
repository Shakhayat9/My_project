document.addEventListener("DOMContentLoaded", () => {
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const totalIncomeEl = document.getElementById("total-income");
    const totalExpensesEl = document.getElementById("total-expenses");
    const balanceEl = document.getElementById("balance");

    let transactions = [];

    transactionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const type = document.getElementById("type").value;
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);

        if (description && amount && !isNaN(amount)) {
            const transaction = {
                id: generateID(),
                type,
                description,
                amount
            };

            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateSummary();
            transactionForm.reset();
        }
    });

    function generateID() {
        return Math.floor(Math.random() * 1000000);
    }

    function addTransactionDOM(transaction) {
        const listItem = document.createElement("li");
        listItem.classList.add(transaction.type === "income" ? "income" : "expense");

        listItem.innerHTML = `
            ${transaction.description} <span>${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;

        transactionList.appendChild(listItem);
    }

    function updateSummary() {
        const totalIncome = transactions
            .filter(transaction => transaction.type === "income")
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        
        const totalExpenses = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const balance = totalIncome - totalExpenses;

        totalIncomeEl.textContent = totalIncome.toFixed(2);
        totalExpensesEl.textContent = totalExpenses.toFixed(2);
        balanceEl.textContent = balance.toFixed(2);
    }

    window.removeTransaction = (id) => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        init();
    };

    function init() {
        transactionList.innerHTML = "";
        transactions.forEach(addTransactionDOM);
        updateSummary();
    }

    init();
});
