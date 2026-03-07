import { WishItem } from '../types';

const PRIORITY_LABELS = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };
const OCCASION_LABELS = { birthday: '🎂 Birthday', christmas: '🎄 Christmas', any: '' };

interface Props {
  item: WishItem;
  onToggleBought: () => void;
  onDelete: () => void;
}

export default function WishItemCard({ item, onToggleBought, onDelete }: Props) {
  const addedDate = new Date(item.addedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  function handleAmazonSearch() {
    window.open(
      `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  function handleDelete() {
    if (window.confirm(`Remove "${item.name}" from the list?`)) {
      onDelete();
    }
  }

  return (
    <div className={`wi-card${item.bought ? ' bought' : ''}`}>
      {item.photo ? (
        <img className="wi-photo" src={item.photo} alt={item.name} />
      ) : (
        <div className="wi-photo-placeholder">🎁</div>
      )}

      <div className="wi-body">
        <div className="wi-badges">
          <span className={`badge badge--${item.priority}`}>
            {PRIORITY_LABELS[item.priority]}
          </span>
          {item.occasion !== 'any' && (
            <span className={`badge badge--${item.occasion}`}>
              {OCCASION_LABELS[item.occasion]}
            </span>
          )}
        </div>

        <div className="wi-name">{item.name}</div>

        {item.notes && <div className="wi-notes">{item.notes}</div>}

        <div className="wi-date">Added {addedDate}</div>
      </div>

      <div className="wi-actions">
        <button className="wi-action wi-action--amazon" onClick={handleAmazonSearch} title="Search Amazon">
          🛒 Amazon
        </button>
        <button
          className={`wi-action wi-action--bought${item.bought ? ' is-bought' : ''}`}
          onClick={onToggleBought}
          title={item.bought ? 'Mark as not bought' : 'Mark as bought'}
        >
          {item.bought ? '✓ Bought' : '○ Buy'}
        </button>
        <button className="wi-action wi-action--delete" onClick={handleDelete} title="Delete">
          🗑
        </button>
      </div>
    </div>
  );
}
