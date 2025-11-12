import type { Metadata } from 'next';
import { Breadcrumb, Layout, Typography } from 'antd';
import HostedListingsOverview from '@/components/host/HostedListingsOverview';

export const metadata: Metadata = {
  title: 'Hosted Listings | Host Dashboard',
};

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HostedListingsPage = () => (
  <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
    <Content style={{ padding: '32px 48px' }}>
      <Breadcrumb
        items={[
          { title: 'Host Dashboard' },
          { title: 'Listings' },
        ]}
      />
      <Title level={2} style={{ marginTop: 16 }}>
        Hosted Listings
      </Title>
      <Paragraph type="secondary" style={{ maxWidth: 640 }}>
        Review your live listings and jump into booking requests to respond to guests
        quickly. Select a listing below to manage incoming requests.
      </Paragraph>
      <HostedListingsOverview />
    </Content>
  </Layout>
);

export default HostedListingsPage;
