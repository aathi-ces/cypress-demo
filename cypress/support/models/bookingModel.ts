export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: Bookingdates;
  additionalneeds: string;
}

export interface Bookingdates {
  checkin: Date;
  checkout: Date;
}
