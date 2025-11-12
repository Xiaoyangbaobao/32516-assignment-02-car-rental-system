import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, Layout, Typography } from 'antd';
import hostedListings from '@/data/hostedListings';
import bookingRequests from '@/data/bookingRequests';
import ListingBookingDashboard from '@/components/host/ListingBookingDashboard';

type BookingDetailsPageProps = {
  params: {
    listingId: string;
  };
};

const { Content } = Layout;
const { Title } = Typography;

export async function generateMetadata(
  { params }: BookingDetailsPageProps
): Promise<Metadata> {
  const listing = hostedListings.find((item) => item.id === params.listingId);

  if (!listing) {
    return {
      title: 'Listing not found | Booking Requests',
    };
  }

  return {
    title: `${listing.title} | Booking Requests`,
  };
}

export async function generateStaticParams() {
  return hostedListings.map((listing) => ({
    listingId: listing.id,
  }));
}

const BookingDetailsPage = ({ params }: BookingDetailsPageProps) => {
  const listing = hostedListings.find((item) => item.id === params.listingId);

  if (!listing) {
    notFound();
  }

  const resolvedListing = listing!;

  const listingRequests = bookingRequests.filter(
    (request) => request.listingId === params.listingId
  );

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ padding: '32px 48px' }}>
        <Breadcrumb
          items={[
            { title: 'Host Dashboard' },
            { title: <Link href="/booking">Booking Requests</Link> },
            { title: resolvedListing.title },
          ]}
        />
        <Title level={2} style={{ marginTop: 16, marginBottom: 24 }}>
          Booking requests
        </Title>
        <ListingBookingDashboard
          listing={resolvedListing}
          initialRequests={listingRequests}
          returnHref="/booking"
          returnLabel="Back to booking overview"
        />
      </Content>
    </Layout>
  );
};

export default BookingDetailsPage;
