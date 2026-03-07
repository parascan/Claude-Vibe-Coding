import { useState } from 'react';
import { KidId, WishItem } from './types';
import { KIDS } from './data/kids';
import { loadItems, saveItems } from './storage';
import KidSelect from './components/KidSelect';
import WishList from './components/WishList';
import './App.css';

type ItemsByKid = Record<KidId, WishItem[]>;

export default function App() {
  const [selectedKidId, setSelectedKidId] = useState<KidId | null>(null);
  const [itemsByKid, setItemsByKid] = useState<ItemsByKid>(() => ({
    mason: loadItems('mason'),
    caden: loadItems('caden'),
    felix: loadItems('felix'),
  }));

  const selectedKid = selectedKidId ? KIDS.find(k => k.id === selectedKidId)! : null;

  function updateItems(kidId: KidId, items: WishItem[]) {
    setItemsByKid(prev => ({ ...prev, [kidId]: items }));
    saveItems(kidId, items);
  }

  if (!selectedKid) {
    return (
      <KidSelect
        kids={KIDS}
        itemsByKid={itemsByKid}
        onSelect={setSelectedKidId}
      />
    );
  }

  return (
    <WishList
      kid={selectedKid}
      items={itemsByKid[selectedKid.id]}
      onItemsChange={items => updateItems(selectedKid.id, items)}
      onBack={() => setSelectedKidId(null)}
    />
  );
}
