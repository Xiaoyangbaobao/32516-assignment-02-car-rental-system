import carsData from '../../cars.json';

export type HostedListing = {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  location: string;
  pricePerNight: number;
  listedAt: string;
  thumbnail: string;
  availability: boolean;
};

const LISTED_AT_LOOKUP: Record<string, string> = {
  '1': '2024-01-12T08:00:00.000Z',
  '2': '2023-11-03T10:30:00.000Z',
  '3': '2024-05-18T14:45:00.000Z',
  '4': '2024-03-22T09:15:00.000Z',
  '5': '2023-09-09T11:00:00.000Z',
  '6': '2024-02-08T16:20:00.000Z',
  '7': '2023-12-01T12:00:00.000Z',
};

const FALLBACK_DATE = '2024-01-01T00:00:00.000Z';

const hostedListings: HostedListing[] = carsData.cars.map((car) => ({
  id: car.id,
  ownerId: 'host-001',
  title: `${car.brand} ${car.model}`,
  category: car.category,
  location: car.location,
  pricePerNight: car.price_per_day,
  listedAt: LISTED_AT_LOOKUP[car.id] ?? FALLBACK_DATE,
  thumbnail: `/assets/img/product/product-01.png`,
  availability: Boolean(car.availability),
}));

export default hostedListings;
