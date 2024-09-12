import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Dokumen from "./pages/Dokumen";
import Kinerja from "./pages/Kinerja";
import Layanan from "./pages/Layanan";
import KHak from "./pages/MenuKinerja/KHak";
import KKekayaanInt from "./pages/MenuKinerja/KKekayaanInt";
import KPenelitian from "./pages/MenuKinerja/KPenelitian";
import KPengabdian from "./pages/MenuKinerja/KPengabdian";
import KPublikasi from "./pages/MenuKinerja/KPublikasi";
import LKerjasama from "./pages/MenuLayanan/LKerjasama";
import LPenelitian from "./pages/MenuLayanan/LPenelitian";
import LPengabdian from "./pages/MenuLayanan/LPengabdian";
import JurnalJIS from "./pages/MenuPublikasi/JurnalJIS";
import JurnalTKS from "./pages/MenuPublikasi/JurnalTKS";
import ProKeb from "./pages/MenuTentang/ProKeb";
import Sejarah from "./pages/MenuTentang/Sejarah";
import Struktur from "./pages/MenuTentang/Struktur";
import ViMi from "./pages/MenuTentang/ViMi";
import Publikasi from "./pages/Publikasi";
import PusatStdy from "./pages/PusatStdy";
import Tentang from "./pages/Tentang";

function App() {
  return (
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
        <Route path="/publikasi/jurnaljis" element={<JurnalJIS />} />
        <Route path="/publikasi/jurnaltikomsin" element={<JurnalTKS />} />
        <Route path="/kinerja" element={<Kinerja />} />
        <Route path="/kinerja/kinerja-penelitian" element={<KPenelitian />} />
        <Route path="/kinerja/kinerja-pengabdian" element={<KPengabdian />} />
        <Route path="/kinerja/kinerja-publikasi" element={<KPublikasi />} />
        <Route
          path="/kinerja/kekayaan-intelektual"
          element={<KKekayaanInt />}
        />
        <Route path="/kinerja/hak-cipta" element={<KHak />} />
        <Route path="/dokumen" element={<Dokumen />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
