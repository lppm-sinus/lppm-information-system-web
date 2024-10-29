import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Dokumen from "./pages/Dokumen";
import Layanan from "./pages/Layanan";
import Buku from "./pages/MenuKinerja/KBuku";
import KKekayaanInt from "./pages/MenuKinerja/KKekayaanInt";
import KPenelitian from "./pages/MenuKinerja/KPenelitian";
import KPengabdian from "./pages/MenuKinerja/KPengabdian";
import KPublikasi from "./pages/MenuKinerja/KPublikasi";
import LKerjasama from "./pages/MenuLayanan/LKerjasama";
import LPenelitian from "./pages/MenuLayanan/LPenelitian";
import LPengabdian from "./pages/MenuLayanan/LPengabdian";
import ProKeb from "./pages/MenuTentang/ProKeb";
import Sejarah from "./pages/MenuTentang/Sejarah";
import Struktur from "./pages/MenuTentang/Struktur";
import ViMi from "./pages/MenuTentang/ViMi";
import Publikasi from "./pages/Publikasi";
import PusatStdy from "./pages/PusatStdy";
import Tentang from "./pages/Tentang";

function ResetScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="scroll-smooth">
      <ResetScroll />
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/tentang/sejarah" element={<Sejarah />} />
          <Route path="/tentang/program&kebijakan" element={<ProKeb />} />
          <Route path="/tentang/visi-misi" element={<ViMi />} />
          <Route path="/tentang/struktur" element={<Struktur />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/layanan/layanan-penelitian" element={<LPenelitian />} />
          <Route path="/layanan/layanan-pengabdian" element={<LPengabdian />} />
          <Route path="/layanan/kerjasama" element={<LKerjasama />} />
          <Route path="/pusat-studi" element={<PusatStdy />} />
          <Route path="/publikasi" element={<Publikasi />} />
          <Route path="/kinerja-penelitian" element={<KPenelitian />} />
          <Route path="/kinerja-pengabdian" element={<KPengabdian />} />
          <Route path="/kinerja-publikasi" element={<KPublikasi />} />
          <Route path="/kekayaan-intelektual" element={<KKekayaanInt />} />
          <Route path="/kinerja-buku" element={<Buku />} />
          <Route path="/dokumen" element={<Dokumen />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
