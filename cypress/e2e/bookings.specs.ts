import { ObjectMapper } from 'jackson-js';
import { HttpHeader } from '../enums/httpHeaders';
import { BookingId } from '../support/models/bookingIdsModel';
import { Booking, BookingDates } from '../support/models/bookingModel';
import { booking as bookingPayload } from '../support/data/bookingDetails';
import * as arrayUtils from '../utils/arrayUtils';
import * as mime from 'mime-types';
import { Parse } from '../utils/objectMapperUtils';



describe('Create Booking API Test', () => {
  it('/POST Should create a new booking', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: bookingPayload,
      headers: {
        [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.have.property('totalprice', 200);
      const bookingId = response.body.bookingid;
      cy.log(bookingId);
    });
  });

  it('/PUT Should verify the update booking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
      },
    }).then(response => {
      let bookingIds = response.body as BookingId[];
      let randomBookingId = arrayUtils.pickRandomItems(bookingIds, 1)[0].bookingid;

      cy.request({
        method: 'PATCH',
        url: `https://restful-booker.herokuapp.com/booking/${randomBookingId}`,
        body: bookingPayload,
        auth: {
          username: 'admin',
          password: 'password123',
        },
        headers: {
          [HttpHeader.ACCEPT]: mime.lookup('json'),
          [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('firstname', bookingPayload.firstname);
        expect(response.body).to.have.property('totalprice', bookingPayload.totalprice);
        expect(Parse(response.body)).to.deep.equal(bookingPayload);
      });
    });
  });

  it('/PATCH Should verify the partial update booking', () => {
    cy.request({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
      headers: {
        [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
      },
    }).then(response => {
      let bookingIds = response.body as BookingId[];
      let randomBookingId = arrayUtils.pickRandomItems(bookingIds, 1)[0].bookingid;

      cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${randomBookingId}`,
        headers: {
          [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
        },
      }).then(response => {
        let bookingDetails = response.body as Booking;

        const bookingDatesPayload = {
          checkin: new Date('2023-09-15'),
          checkout: new Date('2023-09-20'),
        };

        type PartialBookingPayload = Partial<Booking>;
        const partialBookingPayload : PartialBookingPayload= {
          firstname: 'Aathiraja',
          lastname: 'Doe',
          totalprice: 2000,
        };

        cy.request({
          method: 'PATCH',
          url: `https://restful-booker.herokuapp.com/booking/${randomBookingId}`,
          body: partialBookingPayload,
          auth: {
            username: 'admin',
            password: 'password123',
          },
          headers: {
            [HttpHeader.ACCEPT]: mime.lookup('json'),
            [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('firstname', 'Aathiraja');
          expect(response.body).to.have.property('totalprice', 2000);
          expect(Parse(response.body)).to.deep.equal({...Parse(bookingDetails), ...partialBookingPayload});
        });
      });
    });
  });
});
