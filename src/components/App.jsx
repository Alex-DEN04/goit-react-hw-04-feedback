import { useState } from 'react';

import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import NotificationMessage from './Message/Message';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = event => {
    switch (event) {
      case 'good':
        setGood(good + 1);
        break;

      case 'neutral':
        setNeutral(neutral + 1);
        break;

      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  const countPositiveFeedbackPercentage = () => {
    const positiveFeedback = good;
    const countPositivePercentage = Math.round(
      (positiveFeedback * 100) / countTotalFeedback()
    );
    return positiveFeedback && countPositivePercentage;
  };

  const countTotalFeedback = () => {
    return Object.values({ good, neutral, bad }).reduce(
      (acc, item) => acc + item,
      0
    );
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title={'Statistics'}>
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <NotificationMessage message={'There is no feedback'} />
        )}
      </Section>
    </>
  );
}
