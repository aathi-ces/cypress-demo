import { ObjectMapper } from 'jackson-js';
import { HttpHeader } from '../enums/httpHeaders';
import { BookingId } from '../support/models/bookingIdsModel';
import { Booking, BookingDates, BookingNo } from '../support/models/bookingModel';
import { booking as bookingPayload } from '../support/data/bookingDetails';
import { BookingHelper } from '../helper/booking';
import * as arrayUtils from '../utils/arrayUtils';
import * as mime from 'mime-types';
import { Parse } from '../utils/objectMapperUtils';
import { ApiResponse } from '../support/apiRequests';
import { getBookings } from '../controller/booking';



describe('Validate Booking APIs', () => {

  const bookingHelper = new BookingHelper();

  it('/GET Get all booking ids', () => {
    bookingHelper.getBookings().then((response: ApiResponse['body']) => {
      expect(response.body).to.be.a('array')
    });
  });

  it('/GET Get booking id', () => {
    bookingHelper.getBookings().then((response: ApiResponse['body']) => {
      expect(response.body).to.be.a('array')
      let bookingIds = response.body as BookingId[];
      let randomBookingId = arrayUtils.pickRandomItems(bookingIds, 1)[0].bookingid;
      bookingHelper.getBookingById(randomBookingId);
    });
  });

  it('/POST Should create a new booking', () => {
    bookingHelper.postBooking(bookingPayload).then((response: ApiResponse['body']) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.have.property('totalprice', 200);
      const bookingId = response.body.bookingid;
      bookingHelper.getBookingById(bookingId).then((resp: ApiResponse['body']) => {
        expect(Parse<Booking>(resp.body)).to.deep.equal(Parse<Booking>(response.body.booking));
      });
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
