import updateUSers from '../config/users-update.json'
import users from '../config/payload.json'


describe(' PUT CALL In Cypress', () => {

    it(' PUT CALL USing fixture JSON', () => {
        cy.fixture('payload-put-users').then((payload) => {
            cy.request({

                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/4528299',
                headers: {

                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                },
                body: payload
            }).then((res) => {

                expect(res.status).to.be.equal(200)
                expect(res.body).has.property("name", "Rafi123")
            })

        })
    })

    it('PUT CALL - Config JSON file', () => {
        cy.request({
            method: 'PUT',
            url: 'https://gorest.co.in/public/v2/users/4528299',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: updateUSers
        }).then((res) => {

            expect(res.status).to.be.equal(200)
            expect(res.body).has.property("name", "GG Test")
        })

    })


    it(' End to End Flow (POST, PUT, GET)', () => {
        users.email = "abc124@gmail.com"
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: users
        }).then((res) => {
            let id = res.body.id
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                },
                body: updateUSers
            })
                .then((res) => {
                    expect(res.status).to.be.equal(200)
                })
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                },
            })
                .then((res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body).has.property('name', updateUSers.name)
                })
        })
    })
})