'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  List,
  message,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';

import type { BookingRequest, BookingStatus } from '@/data/bookingRequests';
import type { HostedListing } from '@/data/hostedListings';
import {
  calculateDaysBookedThisYear,
  calculateProfitThisYear,
  calculateStayLength,
  formatOnlineDuration,
} from '@/utils/bookingMetrics';

type ListingBookingDashboardProps = {
  listing: HostedListing;
  initialRequests: BookingRequest[];
};

const statusTag = (status: BookingStatus) => {
  switch (status) {
    case 'accepted':
      return <Tag color="green">Accepted</Tag>;
    case 'denied':
      return <Tag color="red">Denied</Tag>;
    default:
      return <Tag color="gold">Pending</Tag>;
  }
};

const statusIcon = (status: BookingStatus) => {
  switch (status) {
    case 'accepted':
      return <CheckCircleTwoTone twoToneColor="#52c41a" />;
    case 'denied':
      return <CloseCircleTwoTone twoToneColor="#ff4d4f" />;
    default:
      return <ClockCircleTwoTone twoToneColor="#faad14" />;
  }
};

const ListingBookingDashboard = ({
  listing,
  initialRequests,
}: ListingBookingDashboardProps) => {
  const [requests, setRequests] = useState<BookingRequest[]>(() =>
    [...initialRequests].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  const [api, contextHolder] = message.useMessage();

  const acceptedThisYear = useMemo(
    () => calculateDaysBookedThisYear(requests),
    [requests]
  );

  const profitThisYear = useMemo(
    () => calculateProfitThisYear(requests),
    [requests]
  );

  const pendingRequests = useMemo(
    () => requests.filter((req) => req.status === 'pending').length,
    [requests]
  );

  const updateStatus = (id: string, nextStatus: BookingStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: nextStatus } : request
      )
    );
    api.success(
      nextStatus === 'accepted'
        ? 'Booking has been accepted.'
        : 'Booking has been denied.'
    );
  };

  const getStatisticCard = (
    title: string,
    value: number,
    options?: {
      suffix?: string;
      precision?: number;
      prefix?: ReactNode;
    }
  ) => (
    <Card bordered={false} style={{ borderRadius: 18, height: '100%' }}>
      <Statistic
        title={title}
        value={value}
        suffix={options?.suffix}
        precision={options?.precision}
        prefix={options?.prefix}
        valueStyle={{ fontSize: 28, fontWeight: 700 }}
      />
    </Card>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {contextHolder}
      <Link href="/host/listings">
        <Button type="link" icon={<ArrowLeftOutlined />}>
          Back to hosted listings
        </Button>
      </Link>

      <Card
        bordered={false}
        style={{
          borderRadius: 18,
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={16}>
            <Typography.Title level={2} style={{ marginBottom: 8 }}>
              {listing.title}
            </Typography.Title>
            <Space direction="vertical" size={4}>
              <Typography.Text>{listing.location}</Typography.Text>
              <Typography.Text type="secondary">
                Online for {formatOnlineDuration(listing)}
              </Typography.Text>
              <Typography.Text>
                Nightly rate:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(listing.pricePerNight)}
              </Typography.Text>
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Descriptions column={1} title="Listing overview" layout="vertical">
              <Descriptions.Item label="Category">
                <Tag color="blue">{listing.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={listing.availability ? 'success' : 'error'}
                  text={listing.availability ? 'Available to book' : 'Temporarily paused'}
                />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          {getStatisticCard('Days booked this year', acceptedThisYear, { suffix: 'd' })}
        </Col>
        <Col xs={24} md={8}>
          {getStatisticCard('Profit this year', profitThisYear, {
            precision: 2,
            prefix: '$',
          })}
        </Col>
        <Col xs={24} md={8}>
          {getStatisticCard('Pending requests', pendingRequests)}
        </Col>
      </Row>

      <Card
        title="Booking requests"
        bordered={false}
        style={{ borderRadius: 18, boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)' }}
      >
        {requests.length === 0 ? (
          <Empty description="No booking requests yet" />
        ) : (
          <List
            dataSource={requests}
            itemLayout="vertical"
            renderItem={(request) => {
              const stayLength = calculateStayLength(request.checkIn, request.checkOut);
              return (
                <List.Item
                  key={request.id}
                  extra={
                    <Space direction="vertical" align="end">
                      <Typography.Text strong>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(request.totalPrice)}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {stayLength} night{stayLength === 1 ? '' : 's'}
                      </Typography.Text>
                    </Space>
                  }
                  actions={[
                    <Button
                      key="accept"
                      type="primary"
                      onClick={() => updateStatus(request.id, 'accepted')}
                      disabled={request.status === 'accepted'}
                    >
                      Accept
                    </Button>,
                    <Button
                      key="deny"
                      danger
                      onClick={() => updateStatus(request.id, 'denied')}
                      disabled={request.status === 'denied'}
                    >
                      Deny
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={statusIcon(request.status)}
                    title={
                      <Space size="middle" align="center">
                        <Typography.Text strong>{request.guestName}</Typography.Text>
                        {statusTag(request.status)}
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={2}>
                        <Typography.Text type="secondary">
                          Requested on{' '}
                          {new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          }).format(new Date(request.createdAt))}
                        </Typography.Text>
                        <Typography.Text>
                          Stay: {request.checkIn} → {request.checkOut} · {request.guests}{' '}
                          guest{request.guests === 1 ? '' : 's'}
                        </Typography.Text>
                        {request.message ? (
                          <Alert
                            message="Guest note"
                            description={request.message}
                            type="info"
                            showIcon
                          />
                        ) : null}
                      </Space>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Card>

      <Card
        title="Booking request history"
        bordered={false}
        style={{ borderRadius: 18 }}
      >
        {requests.length === 0 ? (
          <Empty description="No history yet" />
        ) : (
          <List
            dataSource={[...requests].sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )}
            renderItem={(request) => (
              <List.Item key={`history-${request.id}`}>
                <Space direction="vertical">
                  <Typography.Text strong>{request.guestName}</Typography.Text>
                  <Space wrap>
                    {statusTag(request.status)}
                    <Tag>
                      {request.checkIn} → {request.checkOut}
                    </Tag>
                    <Tag>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(request.totalPrice)}
                    </Tag>
                  </Space>
                </Space>
                <Typography.Text type="secondary">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(request.createdAt))}
                </Typography.Text>
              </List.Item>
            )}
          />
        )}
      </Card>
    </Space>
  );
};

export default ListingBookingDashboard;
