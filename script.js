const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}


//add new object to data arr
const addData = (obj) => {
    data.push(obj)
    updateDOM()
}

const updateDOM = (providedData = data) => {
    //clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(person => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
        main.appendChild(element)
    })
}


//format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

const doubleMoney = (money) => {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
}

const sortByRichest = () => {
    data = data.sort((a, b) => {
        return b.money - a.money
    })
    updateDOM()
}

const showMillionaires = () => {
    data = data.filter(m => m.money > 999999.99)
    updateDOM()
}

const calculateWealth = () => {
    const total = data.reduce((sum, n) => sum + n.money, 0)
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(total)} </strong> </h3>`
    main.appendChild(wealthEl)
}



// event listener
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)



