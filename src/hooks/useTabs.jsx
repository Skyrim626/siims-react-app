import { useState } from "react";

/**
 * @hook useTabs
 * @description Custom hook to manage tab state, providing an active tab and a method to update it.
 * @param {Array} initialTabs - An array of tab objects to initialize the state.
 * @returns {Object} - An object containing the active tab, setter function, and helper utilities.
 */
const useTabs = (initialTabs) => {
  const [activeTab, setActiveTab] = useState(initialTabs[0]);

  /**
   * Switches to a new active tab.
   * @param {Object} tab - The tab object to set as active.
   */
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    setActiveTab: switchTab,
  };
};

export default useTabs;
