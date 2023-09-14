import { HttpHeader } from '../enums/httpHeaders';
import { ApiRequest, NumberParameter, StringParameter } from '../support/apiRequests';
import { AccountAuth } from '../support/models/accountAuth';
import { Booking } from '../support/models/bookingModel';
import * as mime from 'mime-types';

export function getTokenRequest(account: AccountAuth): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('endpoints').auth,
    form: true,
    body: {
      grant_type: 'password',
      username: account.username,
      password: account.password,
    },
  };
}

export function getAccountRequest(token: StringParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('endpoints').account,
    authHeader: token,
  };
}

export function getBookings(): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('booking'),
  };
}

export function getBookingById(bookingId: NumberParameter): ApiRequest {
  return {
    method: 'GET',
    url: Cypress.env('booking') + '/' + bookingId,
    headers: {
      [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
    },
  };
}

export function postBooking(bookingPayload: Booking): ApiRequest {
  return {
    method: 'POST',
    url: Cypress.env('booking'),
    body: bookingPayload,
    headers: {
      [HttpHeader.CONTENT_TYPE]: mime.lookup('json'),
    },
  };
}

