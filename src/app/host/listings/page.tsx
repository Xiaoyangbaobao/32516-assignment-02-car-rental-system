import type { Metadata } from 'next';
import { Breadcrumb, Card, Layout, Space, Typography } from 'antd';
import HostedListingsOverview from '@/components/host/HostedListingsOverview';
import bookingRequests from '@/data/bookingRequests';
import { calculateDailyRevenueSeries } from '@/utils/bookingMetrics';
import ProfitTrendChart from '@/components/host/ProfitTrendChart';

export const metadata: Metadata = {
  title: 'Hosted Listings | Host Dashboard',
};

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const profitSeries = calculateDailyRevenueSeries(bookingRequests, 30);

const HostedListingsPage = () => (
  <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
    <Content style={{ padding: '32px 48px' }}>
      <Breadcrumb
        items={[
          { title: 'Host Dashboard' },
          { title: 'Listings' },
        ]}
      />
      <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 16 }}>
        <div>
          <Title level={2} style={{ marginBottom: 12 }}>
            Hosted Listings
          </Title>
          <Paragraph type="secondary" style={{ maxWidth: 640, marginBottom: 0 }}>
            Review your live listings and jump into booking requests to respond to guests
            quickly. Select a listing below to manage incoming requests.
          </Paragraph>
        </div>
        <Card
          title="Profit trend (last 30 days)"
          bordered={false}
          style={{
            borderRadius: 18,
            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
          }}
          extra={<Paragraph style={{ margin: 0 }}>Sum of accepted bookings</Paragraph>}
        >
          <ProfitTrendChart data={profitSeries} />
        </Card>
        <HostedListingsOverview />
      </Space>
    </Content>
  </Layout>
);

export default HostedListingsPage;
