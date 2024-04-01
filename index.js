#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const account = {
    balance: 1000, // Initial balance
};
function displayBalance() {
    console.log(chalk.blue(`Your current balance is: ${account.balance}`));
}
function withdraw(amount) {
    if (amount > account.balance) {
        console.log(chalk.red("Insufficient funds!"));
    }
    else {
        account.balance -= amount;
        console.log(chalk.green(`Withdraw successful! Remaining balance: ${account.balance}`));
    }
}
function deposit(amount) {
    account.balance += amount;
    console.log(chalk.green(`Deposit successful! Current balance: ${account.balance}`));
}
function mainMenu() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: chalk.bgBlue("Choose an action:"),
            choices: ["Check Balance", "Withdraw", "Deposit", "Exit"],
        },
    ])
        .then((answer) => {
        switch (answer.action) {
            case "Check Balance":
                displayBalance();
                break;
            case "Withdraw":
                inquirer
                    .prompt({
                    type: "number",
                    name: "amount",
                    message: "Enter amount to withdraw:",
                })
                    .then((answer) => {
                    withdraw(answer.amount);
                    mainMenu();
                });
                break;
            case "Deposit":
                inquirer
                    .prompt({
                    type: "number",
                    name: "amount",
                    message: "Enter amount to deposit:",
                })
                    .then((answer) => {
                    deposit(answer.amount);
                    mainMenu();
                });
                break;
            case "Exit":
                console.log(chalk.green("\n \tThank you for using the ATM. Goodbye!\n"));
                break;
        }
    });
}
console.log(chalk.blue.bold("\n \tThis is cli-ATM program\n"));
mainMenu();
