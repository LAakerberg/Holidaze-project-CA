describe('Login function for Holidaze project', () => {
  it('can login to the holidaze as venue manager', () => {
    cy.visit('/');
    cy.clearLocalStorage();
    cy.wait(1000);
    cy.get('li').contains('Login').click();
    cy.get('#login_user').contains('Login').click();
    cy.wait(500);
    cy.get('input[name="email"]').type('michael.mcdesert@stud.noroff.no');
    cy.get('input[name="password"]').type('Administration123');
    cy.wait(500);
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.get('#open_manage_venue').click();
    cy.get('#open_venue_form').click();
    cy.get('#create-venue-form input[name="name"]').type('Cypress Venue Test');
    cy.get('#create-venue-form input[name="description"]').type(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquet diam eget tortor pharetra mattis. Nulla quis neque sodales, commodo massa a, maximus leo. Nulla.'
    );
    cy.get('#create-venue-form input[name="media"]').type(
      'https://edc.h-cdn.co/assets/16/50/1024x644/truckee.jpg'
    );
    cy.get('#create-venue-form input[name="price"]').type(2500);
    cy.get('#create-venue-form input[name="maxGuests"]').type(15);
    cy.get('#create-venue-form input[name="rating"]').type(4);
    cy.get('#create-venue-form input[name="meta.wifi"]').click();
    cy.get('#create-venue-form input[name="meta.parking"]').click();
    cy.get('#create-venue-form input[name="meta.breakfast"]').click();
    cy.get('#create-venue-form input[name="meta.pets"]').click();
    cy.get('#create-venue-form input[name="address"]').type(
      'Cypress winter street 5th'
    );
    cy.get('#create-venue-form input[name="city"]').type('Cypress moon');
    cy.get('#create-venue-form input[name="zip"]').type(20500);
    cy.get('#create-venue-form input[name="country"]').type('Spain');
    cy.get('#create-venue-form input[name="continent"]').type('South');
    cy.get('#create-venue-form button[type="submit"]').type('South');
    cy.wait(5000);
    cy.visit('/');
    cy.get('li').contains('Profile').click();
    cy.get('#open_manage_venue').click();
    cy.get('#delete_button').click();
    cy.get('li').contains('Logout').click();
  });
});
