import type { BookingRequest } from '@/data/bookingRequests';
import type { HostedListing } from '@/data/hostedListings';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateStayLength = (checkIn: string, checkOut: string): number => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.max(end.getTime() - start.getTime(), 0);
  return Math.ceil(diff / MS_PER_DAY);
};

export const extractAcceptedBookingsForYear = (
  bookings: BookingRequest[],
  year = new Date().getFullYear()
) =>
  bookings.filter(
    (booking) =>
      booking.status === 'accepted' &&
      new Date(booking.checkIn).getFullYear() === year
  );

export const calculateDaysBookedThisYear = (
  bookings: BookingRequest[],
  year = new Date().getFullYear()
) =>
  extractAcceptedBookingsForYear(bookings, year).reduce(
    (acc, booking) => acc + calculateStayLength(booking.checkIn, booking.checkOut),
    0
  );

export const calculateProfitThisYear = (
  bookings: BookingRequest[],
  year = new Date().getFullYear()
) =>
  extractAcceptedBookingsForYear(bookings, year).reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );

export const formatOnlineDuration = (listing: HostedListing): string => {
  const listedAt = new Date(listing.listedAt);
  const now = new Date();
  const diffDays = Math.max(
    Math.floor((now.getTime() - listedAt.getTime()) / MS_PER_DAY),
    0
  );

  if (diffDays < 1) {
    return 'Less than a day';
  }

  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'}`;
  }

  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  if (months < 12) {
    return remainingDays
      ? `${months} mo ${remainingDays} day${remainingDays === 1 ? '' : 's'}`
      : `${months} month${months === 1 ? '' : 's'}`;
  }

  const years = Math.floor(months / 12);
  const leftoverMonths = months % 12;
  const yearPart = `${years} year${years === 1 ? '' : 's'}`;

  if (!leftoverMonths && !remainingDays) {
    return yearPart;
  }

  const monthPart = leftoverMonths
    ? `${leftoverMonths} month${leftoverMonths === 1 ? '' : 's'}`
    : '';
  const dayPart = remainingDays
    ? `${remainingDays} day${remainingDays === 1 ? '' : 's'}`
    : '';

  return [yearPart, monthPart, dayPart].filter(Boolean).join(' ');
};
