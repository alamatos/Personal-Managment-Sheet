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

 