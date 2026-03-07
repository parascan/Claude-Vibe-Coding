import { useState } from 'react';
import { Kid, NewWishItem, Occasion, Priority, WishItem } from '../types';
import WishItemCard from './WishItemCard';
import AddItemModal from './AddItemModal';

type OccasionFilter = Occasion | 'all';
type PriorityFilter = Priority | 'all';

interface Props {
  kid: Kid;
  items: WishItem[];
  onItemsChange: (items: WishItem[]) => void;
  onBack: () => void;
}

export default function WishList({ kid, items, onItemsChange, onBack }: Props) {
  const [filterOccasion, setFilterOccasion] = useState<OccasionFilter>('all');
  const [filterPriority, setFilterPriority] = useState<PriorityFilter>('all');
  const [showBought, setShowBought] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = items.filter(item => {
    if (!showBought && item.bought) return false;
    if (filterOccasion !== 'all' && item.occasion !== filterOccasion) return false;
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false;
    return true;
  });

  function handleAdd(data: NewWishItem) {
    const newItem: WishItem = {
      ...data,
      id: crypto.randomUUID(),
      bought: false,
      addedAt: new Date().toISOString(),
    };
    onItemsChange([newItem, ...items]);
  }

  function handleToggleBought(id: string) {
    onItemsChange(items.map(i => i.id === id ? { ...i, bought: !i.bought } : i));
  }

  function handleDelete(id: string) {
    onItemsChange(items.filter(i => i.id !== id));
  }

  const boughtCount = items.filter(i => i.bought).length;

  return (
    <div
      className="wl-page"
      style={{ '--kid-color': kid.color } as React.CSSProperties}
    >
      <header className="wl-header">
        <button className="wl-header__back" onClick={onBack}>← Back</button>
        <span className="wl-header__title">{kid.emoji} {kid.name}'s List</span>
        <button className="wl-header__add" onClick={() => setShowAdd(true)}>+ Add</button>
      </header>

      <div className="wl-filters">
        <div className="filter-group">
          {(['all', 'birthday', 'christmas'] as const).map(v => (
            <button
              key={v}
              className={`filter-btn${filterOccasion === v ? ' active' : ''}`}
              onClick={() => setFilterOccasion(v)}
            >
              {v === 'all' ? 'All' : v === 'birthday' ? '🎂 Birthday' : '🎄 Christmas'}
            </button>
          ))}
        </div>

        <div className="filter-divider" />

        <div className="filter-group">
          {(['all', 'high', 'medium', 'low'] as const).map(v => (
            <button
              key={v}
              className={`filter-btn${filterPriority === v ? ' active' : ''}`}
              onClick={() => setFilterPriority(v)}
            >
              {v === 'all' ? 'All' : v === 'high' ? '🔴' : v === 'medium' ? '🟡' : '🟢'}
            </button>
          ))}
        </div>

        {boughtCount > 0 && (
          <button
            className={`filter-toggle${showBought ? ' active' : ''}`}
            onClick={() => setShowBought(v => !v)}
          >
            {showBought ? `✓ Hiding bought` : `Show bought (${boughtCount})`}
          </button>
        )}
      </div>

      <div className="wl-content">
        {filtered.length === 0 ? (
          <div className="wl-empty">
            <span className="empty-icon">
              {items.length === 0 ? '🎁' : '🔍'}
            </span>
            <p>
              {items.length === 0
                ? `${kid.name}'s list is empty`
                : 'No items match these filters'}
            </p>
            {items.length === 0 && (
              <p className="empty-hint">
                Tap "+ Add" to start adding things they want
              </p>
            )}
          </div>
        ) : (
          <div className="wl-grid">
            {filtered.map(item => (
              <WishItemCard
                key={item.id}
                item={item}
                onToggleBought={() => handleToggleBought(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <AddItemModal
          kidColor={kid.color}
          onSave={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
