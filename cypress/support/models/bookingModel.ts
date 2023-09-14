import { JsonClassType, JsonProperty, ObjectMapper, JsonSerialize, JsonDeserialize } from 'jackson-js';

class DateSerializer {
  static serializeDate(date:any, context:any) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      formatted: date.toLocaleDateString()
    };
  }
  static deserializeDate(dateObj : Date, context: any): Date {
    return new Date(dateObj);
  }
}

export class BookingDates {
  @JsonProperty() @JsonClassType({type: () => [Date]})
  @JsonSerialize({using: DateSerializer.serializeDate})
  @JsonDeserialize({using: DateSerializer.deserializeDate})
  checkin: Date = new Date();

  @JsonProperty() @JsonClassType({type: () => [Date]})
  @JsonSerialize({using: DateSerializer.serializeDate})
  @JsonDeserialize({using: DateSerializer.deserializeDate})
  checkout: Date = new Date();
}

export class Booking {

  @JsonProperty() @JsonClassType({type: () => [String]})
  firstname: string = '';

  @JsonProperty() @JsonClassType({type: () => [String]})
  lastname: string = '';

  @JsonProperty() @JsonClassType({type: () => [Number]})
  totalprice: number | null = null;

  @JsonProperty() @JsonClassType({type: () => [String]})
  additionalneeds?: string = void 0;

  @JsonProperty() @JsonClassType({type: () => [Boolean]})
  depositpaid?: boolean = void 0;

  @JsonProperty() @JsonClassType({type: () => [BookingDates]})
  bookingdates?: BookingDates;
}

export class BookingNo {
  @JsonProperty() @JsonClassType({type: () => [Number]})
  bookingid: number | null = null;

  @JsonProperty() @JsonClassType({type: () => [Booking]})
  booking?: Booking;
}
