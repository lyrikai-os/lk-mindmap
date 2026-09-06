/** Branch placement is document-space only; never derive it from viewport pixels. */
export function branchPlacement(elements: readonly any[], selected: any, sibling: boolean) {
  const parentId = sibling ? selected.customData?.parentId : selected.id;
  const parent = elements.find(e => !e.isDeleted && e.id === parentId && e.customData?.mindmap);
  if (!parent) return null;
  const children = elements.filter(e => !e.isDeleted && e.customData?.parentId === parent.id && e.customData?.mindmap);
  const x = parent.x + parent.width + 110;
  let y = parent.y;
  while (elements.some(e => !e.isDeleted && e.customData?.mindmap && x < e.x + e.width + 24 && x + 190 + 24 > e.x && y < e.y + e.height + 24 && y + 76 + 24 > e.y)) y += 110;
  return { parent, x, y, childCount: children.length };
}
