
let manager = {}

var managerAssets = require('../testAssets/managerAssets')
module.exports = {
    beforeEach: browser => {
        manager = browser.page.employeeManagerPage()
        manager.navigate()
    },
    after: browser => {
        browser.end()
    },
    //before running the test, make sure there are no existing entries that say "New Employee"
    'Employee Creation Test': browser => {
        manager
          .addEmployeesForTest(managerAssets)
          manager
        .end()
    },
    'Search Test': browser => {
        manager
          managerAssets.forEach(test =>{
              manager.navigate('https://devmountain-qa.github.io/employee-manager-v2/build/index.html')
              .waitForElementVisible('@searchField', 10000)
              .setValue('@searchField', test.name)
              .useXpath()
              manager.expect.element(`//li[text()="${test.name}"]`).to.be.visible
              manager
              .useCss()
              .clearValue('@searchField')
          })  
          manager
          .end()
    },
    'Cancel Edit Test': browser => {
        manager
            managerAssets.forEach(test =>{
                manager.navigate('https://devmountain-qa.github.io/employee-manager-v2/build/index.html')
                .useXpath()
                .waitForElementVisible(`(//ul[@class="listContainer"])`, 100000)
                .useCss()
                .clickEmployee(test.name)
                manager.expect.element('@cardTitle').text.to.contain(test.name)
                manager
                .pause(200)
                .clearValue('@nameField')
                .pause(200)
                .setValue('@nameField', 'Delete This Name')
                .pause(200)
                manager.expect.element('@nameField').value.to.contain('Delete This Name')
                manager
                .pause(200)
                .clearValue('@phoneField')
                .pause(200)
                .setValue('@phoneField', '0000000000')
                .pause(200)
                manager.expect.element('@phoneField').value.to.contain('0000000000')
                manager
                .pause(200)
                .clearValue('@titleField')
                .pause(200)
                .setValue('@titleField', 'Delete This Title')
                .pause(200)
                manager.expect.element('@titleField').value.to.contain('Delete This Title')
                manager
                .pause(200)
                .clearValue('@emailField')
                .pause(200)
                .setValue('@emailField', 'Delete This Email Address')
                .pause(200)
                manager.expect.element('@emailField').value.to.contain('Delete This Email Address')
                manager
                .click('@cancelButton')
                .pause(200)
                manager.expect.element('@nameField').value.to.contain(test.name)
                manager.expect.element('@phoneField').value.to.contain(test.pNumber)
                manager.expect.element('@emailField').value.to.contain(test.eAddress)
                manager.expect.element('@titleField').value.to.contain(test.title)
                manager 
            })
            manager
            .end()
    },
    'It can edit an existing employee': browser => {
        manager
        managerAssets.forEach(test =>{
            manager.navigate('https://devmountain-qa.github.io/employee-manager-v2/build/index.html')
            .useXpath()   
            .waitForElementVisible(`(//ul[@class="listContainer"])`, 10000)
            .useCss()
                .clickEmployee(test.name)
                manager.expect.element('@cardTitle').text.to.contain(test.name)
                manager
                manager.expect.element('@cardTitle').text.to.contain(test.name)
                manager
                .clearValue('@nameField')
                .pause(200)
                .setValue('@nameField', 'Delete This Name')
                .pause(200)
                manager.expect.element('@nameField').value.to.contain('Delete This Name')
                manager
                .pause(200)
                .pause(200)
                .clearValue('@phoneField')
                .pause(200)
                .setValue('@phoneField', '0000000000')
                .pause(200)
                manager.expect.element('@phoneField').value.to.contain('0000000000')
                manager
                .pause(200)
                .pause(200)
                .clearValue('@titleField')
                .pause(200)
                .setValue('@titleField', 'Delete This Title')
                .pause(200)
                manager.expect.element('@titleField').value.to.contain('Delete This Title')
                manager
                .pause(200)
                .pause(500)
                .clearValue('@emailField')
                .pause(500)
                .setValue('@emailField', 'Delete This Email Address')
                .pause(200)
                manager.expect.element('@emailField').value.to.contain('Delete This Email Address')
                manager
                .pause(200)
                .click('@saveButton')
                .pause(500)
                manager.api.refresh()
                manager
                .useXpath()
                .waitForElementVisible(`(//li[@class="listText"])[2]`, 100000)
                .click(`(//li[@class="listText"])[2]`)
                .useCss()
                .pause(500)
                .clickEmployee('Delete This Name')
                .pause(500)
                manager.expect.element('@nameField').value.to.contain('Delete This Name')
                manager.expect.element('@phoneField').value.to.contain('0000000000')
                manager.expect.element('@titleField').value.to.contain('Delete This Title')
                manager.expect.element('@emailField').value.to.contain('Delete This Email Address')
                manager
                .pause(200)
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
                .clearValue('@titleField')
                .pause(200)
                .setValue('@titleField', test.title)
                .pause(200)
                .pause(200)
                .clearValue('@emailField')
                .pause(200)
                .setValue('@emailField', test.eAddress)
                .pause(200)
                .click('@saveButton')
                .pause(200)
                manager.api.refresh()
                manager
                .useXpath()
                .waitForElementVisible(`(//li[@class="listText"])[2]`, 100000)
                .click(`(//li[@class="listText"])[2]`)
                .useCss()
                .clickEmployee(test.name)
                manager.expect.element('@nameField').value.to.contain(test.name)
                manager.expect.element('@phoneField').value.to.contain(test.pNumber)
                manager.expect.element('@titleField').value.to.contain(test.title)
                manager.expect.element('@emailField').value.to.contain(test.eAddress)
                manager
        })
        manager
        .end()
    },
    'Employee Deletion Test': browser => {
        manager
          .deleteEmployeesForTest(managerAssets)
          manager
        .end()
    },
}