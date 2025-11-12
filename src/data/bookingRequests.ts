export type BookingStatus = 'pending' | 'accepted' | 'denied';

export type BookingRequest = {
  id: string;
  listingId: string;
  guestName: string;
  guests: number;
  createdAt: string;
  checkIn: string;
  checkOut: string;
  nightlyRate: number;
  totalPrice: number;
  status: BookingStatus;
  message?: string;
};

const bookingRequests: BookingRequest[] = [
  {
    id: 'req-1001',
    listingId: '1',
    guestName: 'Alice Ng',
    guests: 2,
    createdAt: '2025-10-25T09:05:00.000Z',
    checkIn: '2025-12-12',
    checkOut: '2025-12-16',
    nightlyRate: 120,
    totalPrice: 480,
    status: 'pending',
    message: 'Visiting for the local tech conference.',
  },
  {
    id: 'req-1002',
    listingId: '1',
    guestName: 'Chen Wei',
    guests: 4,
    createdAt: '2025-08-02T14:32:00.000Z',
    checkIn: '2025-08-20',
    checkOut: '2025-08-25',
    nightlyRate: 120,
    totalPrice: 600,
    status: 'accepted',
  },
  {
    id: 'req-1003',
    listingId: '1',
    guestName: 'Grace Hopper',
    guests: 1,
    createdAt: '2025-05-05T11:10:00.000Z',
    checkIn: '2025-05-12',
    checkOut: '2025-05-15',
    nightlyRate: 120,
    totalPrice: 360,
    status: 'denied',
    message: 'Needed wheelchair accessibility information.',
  },
  {
    id: 'req-2001',
    listingId: '2',
    guestName: 'Liam Smith',
    guests: 5,
    createdAt: '2025-09-15T17:45:00.000Z',
    checkIn: '2025-11-01',
    checkOut: '2025-11-10',
    nightlyRate: 180,
    totalPrice: 1620,
    status: 'pending',
  },
  {
    id: 'req-2002',
    listingId: '2',
    guestName: 'Emma Wilson',
    guests: 6,
    createdAt: '2025-01-08T08:20:00.000Z',
    checkIn: '2025-02-01',
    checkOut: '2025-02-05',
    nightlyRate: 180,
    totalPrice: 720,
    status: 'accepted',
  },
  {
    id: 'req-2003',
    listingId: '2',
    guestName: 'Noah Brown',
    guests: 3,
    createdAt: '2024-12-19T20:15:00.000Z',
    checkIn: '2025-01-03',
    checkOut: '2025-01-06',
    nightlyRate: 180,
    totalPrice: 540,
    status: 'accepted',
  },
  {
    id: 'req-3001',
    listingId: '3',
    guestName: 'Olivia Johnson',
    guests: 2,
    createdAt: '2025-03-12T10:05:00.000Z',
    checkIn: '2025-03-28',
    checkOut: '2025-04-02',
    nightlyRate: 150,
    totalPrice: 750,
    status: 'accepted',
  },
  {
    id: 'req-3002',
    listingId: '3',
    guestName: 'William Davis',
    guests: 2,
    createdAt: '2025-06-18T19:25:00.000Z',
    checkIn: '2025-07-04',
    checkOut: '2025-07-07',
    nightlyRate: 150,
    totalPrice: 450,
    status: 'pending',
    message: 'Bringing a small dog, please confirm pet policy.',
  },
  {
    id: 'req-4001',
    listingId: '4',
    guestName: 'Sophia Martinez',
    guests: 3,
    createdAt: '2025-04-22T13:30:00.000Z',
    checkIn: '2025-05-10',
    checkOut: '2025-05-14',
    nightlyRate: 180,
    totalPrice: 720,
    status: 'denied',
  },
  {
    id: 'req-4002',
    listingId: '4',
    guestName: 'James Anderson',
    guests: 4,
    createdAt: '2025-07-03T09:40:00.000Z',
    checkIn: '2025-07-18',
    checkOut: '2025-07-22',
    nightlyRate: 180,
    totalPrice: 720,
    status: 'accepted',
  },
];

export default bookingRequests;
