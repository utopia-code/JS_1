// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
export function searchNumber(matrix , targetNumber) {
    let arr = matrix.flat(Infinity)
    return arr.some(number => number === targetNumber)
}

// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
export class Shape {
    constructor(name) {
        this.name = name;
    }

    calculateArea() {
        throw new Error(`The 'calculateArea' function must be implemented in child classes.`)
    }

    getName() {
        return this.name
    }
}

export class Circle extends Shape {
    constructor(name, radius) {
        super(name);
        this.radius = radius;
    }

    calculateArea() {
        return Math.round(Math.PI * Math.pow(this.radius, 2) * 100) / 100;
    }

    getName() {
        return `I'm a circle named '${super.getName()}'`
    }
}

// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;

    this.isGenre = function(genre) {
       return genre === this.genre ? true : false;
    }
}

Book.prototype.getInfo = function() {
    return {Title: this.title, Author: this.author, Genre: this.genre}
}

Book.prototype.setGenre = function(newGenre) {
    return this.genre = newGenre
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
function calculateTotalHours(employee) {
    return employee.projects.reduce((totalHoursProject, project) => {
        return totalHoursProject + project.tasks.reduce((totalHoursTasks, task) => {
            return totalHoursTasks + task.hoursWorked;
        }, 0);
    }, 0);
}
  
function sortByString(arr) {
    return arr.sort(
        (a,b) => {
            const nameA = a.departmentName.toUpperCase();
            const nameB = b.departmentName.toUpperCase();
            if (nameA < nameB) {return -1}
            if (nameA > nameB) {return 1}
            return 0;
        }
    )
}
  
function setRankByDepartment(company) {
    const result = company.departments.map(
        department => ({
            departmentName: department.name,
            totalHoursWorked: department.employees.reduce((totalHoursEmployee, employee) => {
                return totalHoursEmployee + calculateTotalHours(employee)
            },0)
        })
    )
  
    sortByString(result)
  
    return result
}
  
function setEmployeeRankByDepartment(department) {
    const departmentName = department.name;
    const rank = department.employees.map(employee => ({
          fullName: `${employee.firstName} ${employee.lastName}`,
          totalHoursWorked: calculateTotalHours(employee)
      }))
  
    rank.sort((a,b) => b.totalHoursWorked - a.totalHoursWorked)
  
    return {
        departmentName,
        rank
    }
}

export function dashboardCompany(company) {

    if (company === undefined || company === null || typeof company != 'object') {
        throw new Error('The value of company is invalid.')
    }
    
    const employeeRankByDepartment = company.departments.map(department => setEmployeeRankByDepartment(department))
    sortByString(employeeRankByDepartment)
    const rankByDepartment = setRankByDepartment(company);
    
    return {
        employeeRankByDepartment,
        rankByDepartment,
    };

}
    
// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export class WordsAnalyzer {

    _words;
    _totalVowels;
    _totalConsonants;
    _totalNumbers;
    _totalSymbols;

    constructor( data ) {
        if (!data ) {
            throw new Error("The list of words is invalid.")
        }

        this._words = data.words;
        this._calculateTotals()
    }

    get words() {
        return this._words
    }

    set words(value) {
        if (!Array.isArray(value) ) {
            throw new Error("The value of words is invalid.")
        }

        this._words = value;
        this._calculateTotals()
    }

    get totalVowels() {
        return this._totalVowels
    }

    get totalConsonants() {
        return this._totalConsonants
    }

    get totalNumbers() {
        return this._totalNumbers
    }

    get totalSymbols() {
        return this._totalSymbols
    }

    _calculateTotals() {
        this._totalVowels = 0;
        this._totalConsonants = 0;
        this._totalNumbers = 0;
        this._totalSymbols = 0;

        for (const item of this._words) {
            const words = item.split(' ').join('');

            for (const char of words) {
                if (/[aeiouAEIOU]/.test(char)) {
                    this._totalVowels++;
                } else if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(char)) {
                    this._totalConsonants++;
                } else if (/[0-9]/.test(char)) {
                    this._totalNumbers++;
                } else {
                    this._totalSymbols++;
                }
            }
        }
    }

    getTotals() {
        return {
            "consonants": this.totalConsonants,
            "numbers": this.totalNumbers,
            "symbols": this.totalSymbols,
            "vowels": this.totalVowels
        }
    }

    textExists(textToSearch) {
        return this._words.some(item => item.includes(textToSearch))
    }

    orderWords(orderType) {
        if (orderType === 'ASC') {
            return this._words.sort()
        } else if (orderType === 'DESC') {
            this._words.sort()
            return this._words.reverse()
        } else {
            throw new Error("Order type not valid.")
        }
    } 

    deleteWord(number) {
        if (number > 0 && number <= this._words.length && typeof number === 'number') {
            this._words.splice(number - 1, 1)

            this._calculateTotals()

            return this._words
        } else {
            throw new Error("The value of number is invalid.")
        }
    }
}
