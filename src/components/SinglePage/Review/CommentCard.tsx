import { Rate, Tag, Typography } from 'antd';
import type { FormValues } from '@/components/SinglePage/Review/ReviewForm';
import { CardHeader, RatingWrapper, StyledCard } from './CommentCard.styles';

const { Paragraph, Text, Title } = Typography;

export type CommentCardType = FormValues;

type CommentCardProps = {
  review: CommentCardType;
};

const clampRating = (value: CommentCardType['ratings']): number => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  const clamped = Math.min(Math.max(parsed, 0), 5);
  return Math.round(clamped * 2) / 2;
};

const CommentCard = ({ review }: CommentCardProps) => {
  const { reviewName, ratings, reviewTitle, reviewDetails } = review;
  const ratingValue = clampRating(ratings);
  const ratingLabel =
    ratingValue % 1 === 0 ? ratingValue.toFixed(0) : ratingValue.toFixed(1);

  return (
    <StyledCard
      bordered={false}
      hoverable
      role="article"
      aria-label={`Review written by ${reviewName}`}
    >
      <CardHeader>
        <div className="title-block">
          <Text className="reviewer-name" aria-label="Reviewer name">
            {reviewName}
          </Text>
          <Title level={4} className="review-title">
            {reviewTitle}
          </Title>
        </div>
        <RatingWrapper>
          <Rate
            disabled
            allowHalf
            value={ratingValue}
            aria-label={`Rated ${ratingLabel} out of 5`}
          />
          <Tag className="rating-pill">{ratingLabel}</Tag>
        </RatingWrapper>
      </CardHeader>
      <Paragraph className="review-details">{reviewDetails}</Paragraph>
    </StyledCard>
  );
};

export default CommentCard;
