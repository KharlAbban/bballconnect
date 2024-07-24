import { useState, useRef, useEffect } from "react"
import {PanelGroup, Panel, PanelResizeHandle} from "react-resizable-panels"
import { handleWindowResizeForPanels } from "../utils/helperFunctions";

const ExplorePage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  
  useEffect(() => {
    handleWindowResizeForPanels(setIsSmallScreen);

    // Add event listener for window resize event
    window.addEventListener("resize", () => handleWindowResizeForPanels(setIsSmallScreen));

    return () => window.removeEventListener("resize", () => handleWindowResizeForPanels(setIsSmallScreen));
  }, []);
  
  return (
    <PanelGroup autoSaveId="persistentPanels" direction={isSmallScreen ? 'vertical' : 'horizontal'}>
      <Panel className="bg-pageLightColor">Hello there</Panel>
      <PanelResizeHandle className="lg:w-1 max-lg:h-1 bg-pageDarkColor dark:bg-gray-200" title="Drag to resize" />
      <Panel collapsible={true} collapsedSize={10} defaultSize={35} minSize={30} maxSize={40} className="bg-teal-600">Hello there</Panel>
    </PanelGroup>
  )
}

export default ExplorePage

// function App() {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const panelRef = useRef(null);

//   const handlePanelCollapse = () => setIsExpanded(false)
//   const handlePanelEXpand = () => setIsExpanded(true);
//   const collapsePanel = () => panelRef.current.expand();

//   return (
//       <div className="drawer h-screen w-screen text-gray-950">
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         {/* Page content here */}
//         <PanelGroup autoSaveId="persistence" className="" direction="horizontal">
//           {/* Collapsible Sidebar Here */}
//           <CollapsibleSideBar handlePanelEXpand={handlePanelEXpand} panelRef={panelRef} handlePanelCollapse={handlePanelCollapse} />

//           <PanelResizeHandle title="Drag around to resize panes" className="add-hover-resizer" />

//           <WorkSpace isExpanded={isExpanded} collapsePanel={collapsePanel} />

//         </PanelGroup>
//       </div> 
//       <div className="drawer-side">
//         <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
//         <FullWidthSideBar />
//       </div>
//     </div>
//   )
// }