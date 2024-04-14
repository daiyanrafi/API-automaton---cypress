describe(' Delete API Automation In Cypress', () => {

    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@gmail.com"
        return email
    }

    it(' delete user', () => {
        let emailAddress = generateRandomEmail()
        let payload = {
            "name": "Rafi GG",
            "email": emailAddress,
            "gender": "male",
            "status": "active"
        }

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
            },
            body: payload
        }).then((res) => {
            const userId = res.body.id

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v2/users/' + userId,
                headers: {
                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                }
            })
                .then((res) => {

                    expect(res.status).to.be.equal(204)
                })
            cy.request({

                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + userId,
                headers: {
                    Authorization: 'Bearer 6f3837e06786e898121d9c4abf9f79485ee813abce205304f9aa69a5e3356d9e'
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.be.equal(404)
            })
        })
    })
})