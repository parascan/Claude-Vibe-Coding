import { WishItem } from './types';

const key = (kidId: string) => `wishlist_${kidId}`;

export function loadItems(kidId: string): WishItem[] {
  const raw = localStorage.getItem(key(kidId));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as WishItem[];
  } catch {
    return [];
  }
}

export function saveItems(kidId: string, items: WishItem[]): void {
  localStorage.setItem(key(kidId), JSON.stringify(items));
}
