import { useState } from 'react';

import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';

import style from './App.module.css';

const App = () => {
  const [Good, setGood] = useState(0);
  const [Neutral, setNeutral] = useState(0);
  const [Bad, setBad] = useState(0);

  const handleFeedback = option => {
    if (option === 'Good') {
      setGood(prevGood => prevGood + 1);
    } else if (option === 'Neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (option === 'Bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    return Good + Neutral + Bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const percent = total > 0 ? Math.round((Good / total) * 100) : 0;
    return percent;
  };

  const options = ['Good', 'Neutral', 'Bad'];

  const totalFeedback = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();

  return (
    <div className={style.app}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={Good}
            neutral={Neutral}
            bad={Bad}
            total={countTotalFeedback()}
            positiveFeedback={positiveFeedback}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
