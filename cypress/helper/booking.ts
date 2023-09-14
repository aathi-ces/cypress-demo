import { getBookings, getBookingById, postBooking } from '../controller/booking';
import { ApiResponse, NumberParameter, StringParameter } from '../support/apiRequests';
import { Booking } from '../support/models/bookingModel';

export class BookingHelper {
  getBookings = (): ApiResponse['body'] => {
    return cy.apiRequest(getBookings()).then((resp) => {
      expect(resp.status).equal(200);
      // expect(resp.body.Id).equal(bookingId);
    });
  };

  getBookingById = (bookingId: NumberParameter): ApiResponse['body'] => {
    return cy.apiRequest(getBookingById(bookingId)).then((resp) => {
      expect(resp.status).equal(200);
      expect(resp.body).to.include.keys(['additionalneeds', 'bookingdates', 'depositpaid', 'firstname', 'lastname', 'totalprice']);
    });
  };

  postBooking = (bookingPayload: Booking): ApiResponse['body'] => {
    return cy.apiRequest(postBooking(bookingPayload)).then((resp) => {
      expect(resp.status).equal(200);
    });
  };
}
