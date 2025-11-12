import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, Layout, Typography } from 'antd';
import hostedListings from '@/data/hostedListings';
import bookingRequests from '@/data/bookingRequests';
import ListingBookingDashboard from '@/components/host/ListingBookingDashboard';

type ListingBookingsPageProps = {
  params: {
    listingId: string;
  };
};

const { Content } = Layout;
const { Title } = Typography;

export async function generateMetadata(
  { params }: ListingBookingsPageProps
): Promise<Metadata> {
  const listing = hostedListings.find((item) => item.id === params.listingId);

  if (!listing) {
    return {
      title: 'Listing not found | Host Dashboard',
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

const ListingBookingsPage = ({ params }: ListingBookingsPageProps) => {
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
            { title: <Link href="/host/listings">Listings</Link> },
            { title: resolvedListing.title },
          ]}
        />
        <Title level={2} style={{ marginTop: 16, marginBottom: 24 }}>
          Booking requests
        </Title>
        <ListingBookingDashboard
          listing={resolvedListing}
          initialRequests={listingRequests}
        />
      </Content>
    </Layout>
  );
};

export default ListingBookingsPage;
