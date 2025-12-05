import styles from './WarningText.module.scss';

export default function WarningText({ messages = [], speed = 50 }) {
  return (
    <div className={styles.newsTicker}>
      <div
        className={styles.tickerTrack}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* first copy */}
        <div className={styles.tickerGroup}>
          {messages.map((msg, i) => (
            <span key={`a-${i}`} className={styles.tickerItem}>
              {msg}
            </span>
          ))}
        </div>

        {/* second copy for seamless looping */}
        <div className={styles.tickerGroup}>
          {messages.map((msg, i) => (
            <span key={`b-${i}`} className={styles.tickerItem}>
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
