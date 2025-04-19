import { useMemo, useState, type JSX } from 'react'

export interface Tab {
  id: number;
  label: string;
  value: JSX.Element;
}

export function Tabs({ initialTabs }: { initialTabs: Tab[] }) {
  if (initialTabs === undefined) return <></>

  const [tabs, setTabs] = useState(initialTabs)
  const [visibleId, setVisibleId] = useState(0)
  
  const selectedTab = useMemo(() => tabs.find(tab => tab.id === visibleId), [tabs, visibleId])
  return (
    <div className="tab-wrapper">
      <div role="tablist">
        {tabs.map(tab => <button 
          role="tab" 
          aria-selected={tab.id === visibleId} 
          onClick={() => setVisibleId(tab.id)} 
          className={visibleId === tab.id ? "tab tab-selected" : "tab"} 
          key={tab.id}>{tab.label}
        </button>)}
      </div>
      <div className="tab-content" role="tab-panel">
        {selectedTab ? selectedTab.value : null}
      </div>
    </div>
  );
}
