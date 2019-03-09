describe('Showing some info on the page', () => {
    it('Displays some info coming from the backend', () => {
        cy.server({ force404: true });
        cy.route('**/api/someInfo', { content: 'stuff' });

        cy.visit('http://localhost:3000');

        cy.get('p').contains('stuff');
    });

    it('Displays some other info if I change the stub', () => {
        cy.server({ force404: true });
        cy.route('**/api/someInfo', { content: 'things!' });

        cy.visit('http://localhost:3000');

        cy.get('p').contains('things!');
    });

    it('something', (done) => {
        // cy.stub();

        setTimeout(() => {
            done();
        }, 30000);
    });
});
