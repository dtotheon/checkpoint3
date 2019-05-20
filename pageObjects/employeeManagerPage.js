var employeeManagerCommands = {
    clickEmployee: function(employeeName) {
        this.api.useXpath()
        this.click(`//li[text()="${employeeName}"]`)
        this.api.useCss()
        return this
    }, 
    editEmployee: function(employeeInfo){
        if(employeeInfo.name){
            this
                .clearValue('@nameField')
                .setValue('@nameField', employeeInfo.name)
        }
        if(employeeInfo.phone){
            this
                .clearValue('@phoneField')
                .setValue('@phoneField', employeeInfo.phone)
        }
        if(employeeInfo.title){
            this
                .clearValue('@titleField')
                .setValue('@titleField', employeeInfo.title)
        }
        return this
    },
    addEmployeesForTest: function(managerAssets){
        managerAssets.forEach(test =>{
        this
        this.navigate('https://devmountain-qa.github.io/employee-manager-v2/build/index.html')
            .waitForElementVisible('@addButton', 100000)
            .click('@addButton')
            .useXpath()
            .waitForElementVisible('//li[text()="New Employee"]', 100000)
            .useCss()
            .clickEmployee('New Employee')
            .waitForElementVisible('@cardTitle', 100000)
            this.expect.element('@cardTitle').text.to.equal('New Employee').before(100)
            this
            .clearValue('@nameField')
            .pause(200)
            .setValue('@nameField', test.name)
            .pause(200)
            .pause(200)
            .clearValue('@phoneField')
            .pause(200)
            .setValue('@phoneField', test.pNumber)  
            .pause(200)
            .pause(200)
            .clearValue('@emailField')
            .pause(200)
            .setValue('@emailField', test.eAddress)
            .pause(200)
            .pause(200)
            .clearValue('@titleField')
            .pause(200)
            .setValue('@titleField', test.title)
            .pause(200)
            .click('@saveButton')
            .pause(600)
            .clickEmployee(test.name)
            .pause(200)
            this.expect.element('@cardTitle').text.to.equal(test.name).before(100)
            this.expect.element('@nameField').value.to.equal(test.name)
            this.expect.element('@phoneField').value.to.equal(test.pNumber)
            this.expect.element('@emailField').value.to.equal(test.eAddress)
            this.expect.element('@titleField').value.to.equal(test.title)
        return this})
    },
    deleteEmployeesForTest: function(managerAssets){
        managerAssets.forEach(test =>{
        this.navigate('https://devmountain-qa.github.io/employee-manager-v2/build/index.html')
            .waitForElementVisible('@addButton', 100000)
            .clickEmployee(test.name)
            .pause(200)
            .click('@deleteButton')
            .pause(200)
            .api.getAlertText(result => {
                this.assert.ok(result.value.indexOf("removing")!==-1)
            })
            .pause(200)
            .acceptAlert()
            .useXpath()
            this.expect.element(`//li[text()="${test.name}"]`).to.not.be.present.before(500)
            this.api.useCss()
        return this})
    },
}


module.exports = {
    url: 'https://devmountain-qa.github.io/employee-manager-v2/build/index.html',
    commands: [employeeManagerCommands],
    elements: {
        versionNumber: 'footer',
        addButton: 'li[name="addEmployee"]',
        newEmployee: {
            selector: '//li[text()="New Employee"]',
            locateStrategy: 'xpath'
        },
        cardTitle: '#employeeTitle',
        nameField: 'input[name="nameEntry"]',
        phoneField: 'input[name="phoneEntry"]',
        titleField: 'input[name="titleEntry"]',
        emailField:'input[name="emailEntry"]',
        saveButton: '#saveBtn',
        searchField:'input[name="searchBox"]',
        clearSearch:'button[name="clearSearch"]',
        cancelButton:'button[name="cancel"]',
        deleteButton:'button[name="delete"]'



    }
}