'use client';

import Link from 'next/link';
import { Button, Card, List, Space, Tag, Typography } from 'antd';
import hostedListings from '@/data/hostedListings';
import { formatOnlineDuration } from '@/utils/bookingMetrics';

const { Text } = Typography;

type HostedListingsOverviewProps = {
  hrefBase?: string;
  cardTitle?: string;
  ctaLabel?: string;
};

const HostedListingsOverview = ({
  hrefBase = '/host/listings',
  cardTitle = 'My Hosted Listings',
  ctaLabel = 'Manage booking requests',
}: HostedListingsOverviewProps) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card
        title={cardTitle}
        bordered={false}
        style={{ borderRadius: 18, boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}
      >
        <List
          itemLayout="vertical"
          dataSource={hostedListings}
          renderItem={(listing) => (
            <List.Item
              key={listing.id}
              actions={[
                <Link key="manage" href={`${hrefBase}/${listing.id}`} passHref>
                  <Button type="primary">{ctaLabel}</Button>
                </Link>,
              ]}
              extra={
                <img
                  src={listing.thumbnail}
                  alt={listing.title}
                  style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 12 }}
                />
              }
            >
              <List.Item.Meta
                title={
                  <Space align="center" size="middle">
                    <Text strong style={{ fontSize: 18 }}>
                      {listing.title}
                    </Text>
                    <Tag color="blue">{listing.category}</Tag>
                    <Tag color={listing.availability ? 'green' : 'red'}>
                      {listing.availability ? 'Available' : 'Currently unavailable'}
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={4}>
                    <Text type="secondary">{listing.location}</Text>
                    <Space split="•">
                      <Text>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }).format(listing.pricePerNight)}{' '}
                        per night
                      </Text>
                      <Text type="secondary">
                        Online {formatOnlineDuration(listing)}
                      </Text>
                    </Space>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
};

export default HostedListingsOverview;
