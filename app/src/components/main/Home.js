import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Login from "../accounts/Login";

export default function Home() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />
    </main>
  );
}
