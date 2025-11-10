import React, { useState } from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import All from "./pages/All";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Uncompleted from "./pages/Uncompleted";
import Main from "./pages/Main";
import Secondary from "./pages/Secondary";
import Navbar from "./components/Navbar";
import EditDirectoryModal from "./components/EditDirectoryModal";
import {useSelector} from "react-redux"
import CreateNewDirectoryModal from "./components/CreateNewDirectoryModal";
import DeleteTaskModal from "./components/DeleteTaskModal";
import SecondSideBar from "./components/SecondSideBar";
import CardModal from "./components/CardModal";


function App() {
  const isEditDirectoryModalOpen = useSelector((store) => store.modal.editDirectoryModal);
  const isNewDirectoryModalOpen = useSelector((store) => store.modal.newDirectoryModal);
  const isDeleteTaskModalOpen = useSelector((store) => store.modal.deleteTaskModal);
  const isCardModalOpen = useSelector((store) => store.modal.cardModal.isOpen);

  return (
  
    <BrowserRouter>
      <div data-theme="light" className="bg-gray-200 flex justify-center">
        <SideBar className="w-2/10"/>
        <SecondSideBar />
        <div className="w-full  lg:w-19/30 px-4 sm:px-5 md:pl-53 lg:pl-15 pt-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<All />} />
            <Route path="/important" element={<Important />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/uncompleted" element={<Uncompleted />} />
            <Route path="/main" element={<Main />} />
            <Route path="/secondary" element={<Secondary />} />
          </Routes>
        </div>
      </div>
      {isEditDirectoryModalOpen && <EditDirectoryModal />}
      {isNewDirectoryModalOpen && <CreateNewDirectoryModal />}
      {isDeleteTaskModalOpen && <DeleteTaskModal />}
      {isCardModalOpen && <CardModal />}
    </BrowserRouter>
  );
}

export default App;
