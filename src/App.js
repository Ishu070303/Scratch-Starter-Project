import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import ControlPanel from "./components/ControlPanel";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "./redux/store";
import { DndProvider } from "react-dnd";

export default function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="font-sans">
          <div className="h-screen overflow-hidden flex flex-col">
            <div className="flex-1 h-full flex flex-row">
              <Sidebar />
              <MidArea />
              <PreviewArea />
            </div>
            <ControlPanel />
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
}
