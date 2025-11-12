import type { Metadata } from 'next';
import { Breadcrumb, Layout, Typography } from 'antd';
import HostedListingsOverview from '@/components/host/HostedListingsOverview';

export const metadata: Metadata = {
  title: 'Booking Requests | Host Dashboard',
};

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const BookingPage = () => (
  <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
    <Content style={{ padding: '32px 48px' }}>
      <Breadcrumb
        items={[
          { title: 'Host Dashboard' },
          { title: 'Booking Requests' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16 }}>
        Booking Requests
      </Title>
      <Paragraph type="secondary" style={{ maxWidth: 640 }}>
        Choose a listing to view and respond to its booking requests. You can accept or
        deny guests and review historical performance for each listing.
      </Paragraph>
      <HostedListingsOverview
        hrefBase="/booking"
        cardTitle="Select a Listing"
        ctaLabel="Review booking requests"
      />
    </Content>
  </Layout>
);

export default BookingPage;
