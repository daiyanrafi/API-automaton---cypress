describe('API automation', () => {

    //POSITIVE TESTING
    it('GET users', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            Headers: {
                Authorization: "Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e"
            }
        })
            .then((res) => {
                cy.log(JSON.stringify(res)) //this line for print the log
                expect(res.status).to.equal(200)
            })
    }) 

    it('GET Single user', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/6850135',
            Headers: {
                Authorization: "Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e"
            }
        })
            .then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(6850135)
            })
    })
    
    //NEGATIVE TESTING
    it('Invalid GET Users', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/user',
            Headers: {
                Authorization: "Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e"
            },
            failOnStatusCode: false
        })
            .then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.equal(404)
            })
    })
    
    it('Invalid Single GET User', () => {

        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/000999',
            Headers: {
                Authorization: "Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e"
            },
            failOnStatusCode: false
        })
            .then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).to.equal(404)
            })
    })



})