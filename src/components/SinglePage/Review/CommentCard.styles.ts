import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  border-radius: 18px;
  border: 1px solid var(--ant-color-border, #e5e7eb);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, #ffffff 100%);
  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 28px 60px rgba(15, 23, 42, 0.12);
  }

  .ant-card-body {
    padding: 24px;
  }

  .title-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 220px;
  }

  .reviewer-name {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ant-color-text-secondary, #667085);
  }

  .review-title {
    margin: 0 !important;
    color: var(--ant-color-text, #1f2937);
    font-weight: 700;
    font-size: 20px !important;
    line-height: 1.3;
  }

  .review-details {
    margin: 18px 0 0;
    color: var(--ant-color-text-secondary, #475467);
    line-height: 1.7;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    .ant-card-body {
      padding: 18px;
    }

    .review-title {
      font-size: 18px !important;
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;

  .title-block {
    flex: 1 1 260px;
  }
`;

export const RatingWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(250, 173, 20, 0.12);
  border: 1px solid rgba(250, 173, 20, 0.35);

  .ant-rate {
    color: var(--ant-color-warning, #faad14);
    font-size: 18px;
  }

  .rating-pill {
    padding: 2px 10px;
    border-radius: 999px;
    background: rgba(250, 173, 20, 0.18);
    border: none;
    color: var(--ant-color-warning-text-hover, #b7791f);
    font-weight: 600;
  }
`;
