export const handleWindowResizeForPanels = (setIsSmallScreen) => {
    // Update the state of the window width and height
    if (window.innerWidth > 1024) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(true);
    }
  }