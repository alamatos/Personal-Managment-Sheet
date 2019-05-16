// Create a class that is going to represent the object expense in our app

class Expense {
    constructor (year, month, day, type, desc, value) {
        this.year = year
        this.month = month
        this.day = day
        this.type = type
        this.desc = desc
        this.value = value
    }
    validateData () {
        for (let data in this) {

            if (this[data] == undefined || this[data] == null || this[data]=='') {
                return false
            }
            
        }
        return true
    }
}

class Bd {
    constructor () {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNexId () {
        let nextId = localStorage.getItem('id')
        return parseInt(nextId)+1
    }
    
    save(exp) {
        
        let id = this.getNexId ()
        localStorage.setItem('id',id)
        localStorage.setItem(id,JSON.stringify(exp))
        
    }
    allExpenses () {

        let expenses = Array()

        let id = localStorage.getItem('id')

        for (let i=1;i<= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i))

            if (expense === null) {
                continue
            } 
            expense.id=i
            expenses.push(expense)
        
        }
        
        return expenses
    }

    search (expense) {
        let filteredExpenses= Array()
        filteredExpenses = this.allExpenses()
        
        console.log(expense)
        console.log(filteredExpenses)

    if (expense.year !='') {
        console.log('filtro de ano')

        filteredExpenses =  filteredExpenses.filter(f => f.year == expense.year)
    }
    if (expense.month !='') {
        console.log('filtro de mês')

        filteredExpenses =  filteredExpenses.filter(f=>f.month == expense.month)
    }
    if (expense.day !=='') {
        console.log('filtro de dia')

        filteredExpenses =  filteredExpenses.filter(f=> f.day == expense.day)
    }
    if (expense.type !=='') {
        console.log('filtro de tipo')

        filteredExpenses =  filteredExpenses.filter(f => f.type == expense.type)
    }
    if (expense.desc !=='') {
        console.log('filtro de desc')

        filteredExpenses =  filteredExpenses.filter(f => f.desc == expense.desc)
    }
    if (expense.value !=='') {
        console.log('filtro de valor')

        filteredExpenses =  filteredExpenses.filter(f => f.value == expense.value)
    }
    return filteredExpenses
    }

    remove (id) {
        localStorage.removeItem(id)
    }
}
let bd = new Bd()



function expenseRegistration () {
    let year = document.getElementById('year')
    let month = document.getElementById('month')
    let day = document.getElementById('day')
    let type = document.getElementById('type')
    let desc = document.getElementById('description')
    let value = document.getElementById('value')
    


let expense = new Expense(year.value, month.value, day.value, type.value, desc.value, value.value)

if (expense.validateData()) {
    bd.save(expense)
    document.getElementById('modalTitle').innerHTML = 'Record inserted successfully'
    document.getElementById('modalTitlediv').className = 'modal-header text-success'
    document.getElementById('modalContent').innerHTML = "Expense registered with success."
    document.getElementById('modalBtn').innerHTML = 'Go back'
    document.getElementById('modalBtn').className = 'btn btn-success'
    $('#modalSaveComments').modal('show')

    year.value= ''
    month.value = ''
    day.value = ''
    type.value = ''
    desc.value = ''
    value.value =''
} else {
    document.getElementById('modalTitle').innerHTML = 'Recording error'
    document.getElementById('modalTitlediv').className = 'modal-header text-danger'
    document.getElementById('modalContent').innerHTML = "There are required fields that haven't been filled in."
    document.getElementById('modalBtn').innerHTML = 'Go back and correct info'
    document.getElementById('modalBtn').className = 'btn btn-danger'
    
    $('#modalSaveComments').modal('show')
    }

}

// create an object using contructor functions

function loadExpensesList (expenses = Array(), filter = false) {

    if (expenses.length == 0 && filter== false) {
        expenses = bd.allExpenses ()
    }
    // selecting the HTML element where i'm going to insert all the data

    let expensesList = document.getElementById('expensesList')
    expensesList.innerHTML=''

    // I need to go through all the items in the array expenses in order to add them into the HTML
    expenses.forEach((d)=> {

        // create a table row
        let line = expensesList.insertRow()
        
        // create columns
        line.insertCell(0).innerHTML =`${d.day}/${d.month}/${d.year}` 
        
        switch (d.type) {
            case '1': d.type = ' Food'
            break
            case '2' : d.type = 'Education'
            break
            case '3' : d.type = 'Recreation'
            break
            case '4' : d.type = 'Health'
            break
            case '5' : d.type = 'Transport'
            break

            
        }
        line.insertCell(1).innerHTML = `${d.type}`
        line.insertCell(2).innerHTML = `${d.desc}`
        line.insertCell(3).innerHTML = `${d.value}`

        // create a button to eliminate expenses
        let btn = document.createElement('button')
        btn.className='btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id= `id_expense_ ${d.id}`
        btn.onclick = function () {
            
            let id = this.id.replace('id_expense_','')
            alert(id)
            bd.remove(id)
            window.location.reload()
        }
        line.insertCell(4).append(btn)

        console.log(d)
    })
}
 
function searchExpense() {
    let year = document.getElementById('year').value
    let month = document.getElementById('month').value
    let day = document.getElementById('day').value
    let type = document.getElementById('type').value
    let description = document.getElementById('description').value
    let value = document.getElementById('value').value

    let expense = new Expense(year,month, day, type, description, value)
    
    let expenses = bd.search(expense)
    loadExpensesList(expenses, true)
    
}