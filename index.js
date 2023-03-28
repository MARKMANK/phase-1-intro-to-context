let allEmployeeRecordsArray = [];
//turns an array into an object with defined keys
function createEmployeeRecord ([firstName,familyName,title,payPerHour]){
    const employeeRecord = {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": [],
    }
    return employeeRecord;
}

//creates an array using the new objects
function createEmployeeRecords (inputArray){
    allEmployeeRecordsArray = [];
    for(let i = 0;i < inputArray.length;i++){
        const newEmployee = createEmployeeRecord(inputArray[i])
        allEmployeeRecordsArray.push(newEmployee)
    }
    return allEmployeeRecordsArray;
}
//stampSting in YYYY-MM-DD HHMM
function createTimeInEvent (employeeRecord,stampString){
    const stampArray = stampString.split('');
    const clockInObject = {
        "type": "TimeIn",
        "hour": parseInt(stampArray.slice(11,15).join("")),
        "date": stampArray.slice(0,10).join(""),
    }
    employeeRecord.timeInEvents.push(clockInObject);
    return employeeRecord;
}

function createTimeOutEvent (employeeRecord,stampString){
    const stampArray = stampString.split('');
    const clockOutObject = {
        "type": "TimeOut",
        "hour": parseInt(stampArray.slice(11,15).join("")),
        "date": stampArray.slice(0,10).join(""),
    }
    employeeRecord.timeOutEvents.push(clockOutObject);
    return employeeRecord;
}
//dateString in YYYY-MM-DD
function hoursWorkedOnDate(employeeRecord,dateString){
    let hoursWorked = 0;
    for(let i = 0;i < employeeRecord.timeInEvents.length;i++){
        if(dateString == employeeRecord.timeInEvents[i].date){
            hoursWorked = parseInt((employeeRecord.timeOutEvents[i].hour)-(employeeRecord.timeInEvents[i].hour))/100;
        }
} 
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord,dateString){
    const payOwed = hoursWorkedOnDate(employeeRecord,dateString) * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord){
    const wageArray = [];
    for(let i = 0;i < employeeRecord.timeOutEvents.length;i++){
        const timeOutDate = employeeRecord.timeOutEvents[i].date;
        for(let j = 0;j < employeeRecord.timeInEvents.length;j++){
            const timeInDate = employeeRecord.timeInEvents[j].date;
            if(timeOutDate == timeInDate){
                const dailyPayout = wagesEarnedOnDate(employeeRecord,timeOutDate);
                wageArray.push(dailyPayout);
            }
        }
    }
    const totalPayOwed = wageArray.reduce((a, b) => a + b, 0);
    return totalPayOwed;
}

function calculatePayroll(employeeRecordsArray){
    console.log(employeeRecordsArray)
    let companyWagesArray = [];
    console.log(companyWagesArray)
    employeeRecordsArray.forEach(employee => companyWagesArray.push(allWagesFor(employee)) );
    const companyPayOwed = companyWagesArray.reduce((a, b) => a + b, 0);
    return companyPayOwed;
}