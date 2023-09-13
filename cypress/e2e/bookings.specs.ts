import { HttpHeader } from '../enums/httpHeaders';
import { BookingId } from '../support/models/bookingIdsModel';
import { Booking, Bookingdates } from '../support/models/bookingModel';
import * as arrayUtils from '../utils/arrayUtils';
import * as mime from 'mime-types';



describe('Create Booking API Test', () => {
  it('Should create a new booking', () => {
    const bookingDatesPayload: Bookingdates = {
      checkin: new Date('2023-09-15'),
      checkout: new Date('2023-09-20'),
    };
    const bookingPayload: Booking = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 200,
      depositpaid: true,
      bookingdates: bookingDatesPayload,
      additionalneeds: 'Breakfast',
    };

    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: bookingPayload,
      headers: {
        [HttpHeader.CONTENT_TYPE] : mime.lookup('json'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.have.property('totalprice', 200);
      const bookingId = response.body.bookingid;
      cy.log(bookingId);
    });
  });

  it.only('Should verify the update booking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        [HttpHeader.CONTENT_TYPE] : mime.lookup('json'),
      },
    }).then(response => {
      let bookingIds = response.body as BookingId[];
      let randomBookingId = arrayUtils.pickRandomItems(bookingIds, 1)[0].bookingid;
      
      cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${randomBookingId}`,
        headers: {
          [HttpHeader.CONTENT_TYPE] : mime.lookup('json'),
        },
      }).then(response => {
        let bookingDetails = response.body as Booking;
        // cy.log(bookingDetails.firstname);


        // const bookingPartialPayload: Partial<Booking> = {
        //   firstname: 'Aathi',
        //   lastname: 'Raja',
        //   totalprice: 1234,
        // };

        const bookingDatesPayload: Bookingdates = {
          checkin: new Date('2023-09-15'),
          checkout: new Date('2023-09-20'),
        };

        const bookingPayload: Booking = {
          firstname: 'John',
          lastname: 'Doe',
          totalprice: 200,
          depositpaid: true,
          bookingdates: bookingDatesPayload,
          additionalneeds: 'Breakfast',
        };
    
        cy.log(bookingPayload.toString());
        cy.request({
          method: 'PUT',
          url: `https://restful-booker.herokuapp.com/booking/${randomBookingId}`,
          body: bookingPayload,
          auth: {
            username: 'admin',
            password: 'password123',
          },
          headers: {
            [HttpHeader.ACCEPT] : mime.lookup('json'),
            [HttpHeader.CONTENT_TYPE] : mime.lookup('json'),
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.booking).to.have.property('totalprice', 200);
          const bookingId = response.body.bookingid;
          // cy.log(bookingId);
        });
      });
    });
  });
});
