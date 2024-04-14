import payload from '../config/payload.json'

describe(' POST CALL In Cypress', () => {

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(4, 10)
        const email = randomString + "@gmail.com"
        return email
    }


    it(' POST CALL from hardcoded payload json', () => {
        let emailAddress = generateRandomEmail()
        let payload = {
            "name": "Rafi GG 01",
            "email": emailAddress,
            "gender": "female",
            "status": "active"
        }

        cy.log(" -------New GG Email------- " + emailAddress)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: payload

        }).then((res) => {
            expect(res.status).to.equal(201)
            expect(res.body).has.property("name", "Rafi GG 01")
            expect(res.body).has.property("gender", "female")
            expect(res.body).has.property("status", "active")
            expect(res.body.id).to.not.be.null
        })


    })

    it(' POST CALL - Fixtures json file', () => {
        cy.fixture('users').then((resObject) => {
            resObject.email = generateRandomEmail()

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {

                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                },
                body: resObject

            }).then((res) => {
                expect(res.status).to.equal(201)
                expect(res.body).has.property("name", "AB Test 01")
                expect(res.body).has.property("gender", "female")
                expect(res.body).has.property("status", "active")
                expect(res.body.id).to.not.be.null
            })


        })




    })

    it(' POST CALL - Config>payload.JSON ', () => {
        payload.email = generateRandomEmail()
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: payload

        }).then((res) => {
            expect(res.status).to.equal(201)
            expect(res.body).has.property("name", "AB Test 01")
            expect(res.body).has.property("gender", "female")
            expect(res.body).has.property("status", "active")
            expect(res.body.id).to.not.be.null

            let id = res.body.id

            cy.request({

                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {

                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                }

            })
                .then((res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body).has.property("name", "AB Test 01")
                    expect(res.body).has.property("gender", "female")
                    expect(res.body).has.property("status", "active")
                    expect(res.body.id).to.not.be.null

                })


        })
    })

    //negative testing#######################
    it(' POST CALL - Negative Case with Wrong header ', () => {
        payload.email = generateRandomEmail()
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer'
            },
            body: payload,
            failOnStatusCode: false

        }).then((res) => {
            expect(res.status).to.equal(401)
        })
    })

    it(' POST CALL - Negative Case with Wrong Data ', () => {
        payload.email = null
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: payload,
            failOnStatusCode: false

        }).then((res) => {
            expect(res.status).to.equal(422)

        })
    })

    it(' POST CALL - Negative Case with Duplicate Data ', () => {
        payload.email = "abtest01@dispostable.com"
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {

                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: payload,
            failOnStatusCode: false

        }).then((res) => {
            expect(res.status).to.equal(422)

        })
    })
})