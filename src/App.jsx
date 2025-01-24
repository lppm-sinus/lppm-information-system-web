import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ABeranda from "./admin/pages/ABeranda";
import ADokumen from "./admin/pages/ADokumen";
import ALayanan from "./admin/pages/ALayanan";
import APublikasi from "./admin/pages/APublikasi";
import APusatStudi from "./admin/pages/APusatStudi";
import ATentang from "./admin/pages/ATentang";
import Dashboard from "./admin/pages/Dashboard";
import AddDokumen from "./admin/pages/Menu Dokumen/AddDokumen";
import AKBuku from "./admin/pages/Menu Kinerja/Buku/AKBuku";
import AKHKI from "./admin/pages/Menu Kinerja/HKI/AKHKI";
import AKPenelitian from "./admin/pages/Menu Kinerja/Penelitian/AKPenelitian";
import AKPengabdian from "./admin/pages/Menu Kinerja/Pengabdian/AKPengabdian";
import AKPublikasi from "./admin/pages/Menu Kinerja/Publikasi/AKPublikasi";
import AddJurnal from "./admin/pages/Menu Publikasi/AddJurnal";
import AddTentang from "./admin/pages/Menu Tentang/AddTentang";
import MUser from "./admin/pages/MUser";
import Layout from "./components/Layout";
import Beranda from "./pages/Beranda";
import Dokumen from "./pages/Dokumen";
import ErrorPage from "./pages/ErrorPage";
import Layanan from "./pages/Layanan";
import LoginPage from "./pages/LoginPage";
import Buku from "./pages/MenuKinerja/KBuku";
import KKekayaanInt from "./pages/MenuKinerja/KKekayaanInt";
import KPenelitian from "./pages/MenuKinerja/KPenelitian";
import KPengabdian from "./pages/MenuKinerja/KPengabdian";
import KPublikasi from "./pages/MenuKinerja/KPublikasi";
import LHaki from "./pages/MenuLayanan/LHaki";
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
import AddPusatStudi from "./admin/pages/Menu Pusat Studi/AddPusatStudi";
import EditTentang from "./admin/pages/Menu Tentang/EditTentang";
import AddSejarah from "./admin/pages/Menu Tentang/ASejarah/AddSejarah";
import AddVisiMisi from "./admin/pages/Menu Tentang/AVisiMisi/AddVisiMisi";
import AddProKeb from "./admin/pages/Menu Tentang/AProKeb/AddProKeb";
import AddStruktur from "./admin/pages/Menu Tentang/AStruktur/AddStruktur";
import AddUser from "./admin/pages/Menu Manajemen User/AddUser";
import EditUser from "./admin/pages/Menu Manajemen User/EditUser";
import ASettingAccount from "./admin/pages/ASettingAccount";
import { UserProvider } from "./context/UserContext";
import EditDokumen from "./admin/pages/Menu Dokumen/EditDokumen";
import EditJurnal from "./admin/pages/Menu Publikasi/EditJurnal";
import AddLPenelitian from "./admin/pages/Menu Layanan/Penelitian/AddLPenelitian";
import AddLPengabdian from "./admin/pages/Menu Layanan/Pengabdian/AddLPengabdian";
import AddLKerjsama from "./admin/pages/Menu Layanan/Kerjasama/AddLKerjsama";
import AddLHKI from "./admin/pages/Menu Layanan/HKI/AddLHKI";
import EditLayanan from "./admin/pages/Menu Layanan/EditLayanan";
import AddPenelitian from "./admin/pages/Menu Kinerja/Penelitian/AddPenelitian";
import EditPenelitian from "./admin/pages/Menu Kinerja/Penelitian/EditPenelitian";
import AddPengabdian from "./admin/pages/Menu Kinerja/Pengabdian/AddPengabdian";
import EditPengabdian from "./admin/pages/Menu Kinerja/Pengabdian/EditPengabdian";
import AddHKI from "./admin/pages/Menu Kinerja/HKI/AddHKI";
import EditHKI from "./admin/pages/Menu Kinerja/HKI/EditHKI";
import AddBuku from "./admin/pages/Menu Kinerja/Buku/AddBuku";
import EditBuku from "./admin/pages/Menu Kinerja/Buku/EditBuku";
import AddCarousel from "./admin/pages/Menu Beranda/Carousel/AddCarousel";
import AddKegiatan from "./admin/pages/Menu Beranda/KegiatanLPPM/AddKegiatan";
import AddBerita from "./admin/pages/Menu Beranda/BeritaLPPM/AddBerita";
import AAuthor from "./admin/pages/AAuthor";
import AddAuthor from "./admin/pages/Menu Author/AddAuthor";
import EditAuthor from "./admin/pages/Menu Author/EditAuthor";
import AProgramStudi from "./admin/pages/AProgramStudi";
import AddProdi from "./admin/pages/Menu Program Studi/AddProdi";
import EditProdi from "./admin/pages/Menu Program Studi/EditProdi";
import AddPubGoogle from "./admin/pages/Menu Kinerja/Publikasi/Google/AddPubGoogle";
import EditPubGoogle from "./admin/pages/Menu Kinerja/Publikasi/Google/EditPubGoogle";
import AddPubScopus from "./admin/pages/Menu Kinerja/Publikasi/Scopus/AddPubScopus";
import EditPubScopus from "./admin/pages/Menu Kinerja/Publikasi/Scopus/EditPubScopus";
import EditPusatStudi from "./admin/pages/Menu Pusat Studi/EditPusatStudi";
import EditBeranda from "./admin/pages/Menu Beranda/EditBeranda";
import PDFViewer from "./admin/components/atoms/PDFViewer";
import ASetting from "./admin/pages/ASetting";
import AddAddress from "./admin/pages/Menu Setting/Address/AddAddress";
import AddContact from "./admin/pages/Menu Setting/Contact/AddContact";
import AddLogo from "./admin/pages/Menu Setting/Logo/AddLogoFooter";
import AddSocialMedia from "./admin/pages/Menu Setting/Social Media/AddSocialMedia";
import ProtectedRoute from "./components/molecules/ProtectedRoute";
import EditSetting from "./admin/pages/Menu Setting/EditSetting";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import AddLogoFooter from "./admin/pages/Menu Setting/Logo/AddLogoFooter";
import AddLogoHeader from "./admin/pages/Menu Setting/Logo/AddLogoHeader";

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
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Beranda />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/tentang/sejarah" element={<Sejarah />} />
          <Route path="/tentang/program&kebijakan" element={<ProKeb />} />
          <Route path="/tentang/visi-misi" element={<ViMi />} />
          <Route path="/tentang/struktur" element={<Struktur />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/layanan/layanan-penelitian" element={<LPenelitian />} />
          <Route path="/layanan/layanan-pengabdian" element={<LPengabdian />} />
          <Route path="/layanan/kerjasama" element={<LKerjasama />} />
          <Route path="/layanan/haki" element={<LHaki />} />
          <Route path="/pusat-studi" element={<PusatStdy />} />
          <Route path="/publikasi" element={<Publikasi />} />
          <Route path="/kinerja-penelitian" element={<KPenelitian />} />
          <Route path="/kinerja-pengabdian" element={<KPengabdian />} />
          <Route path="/kinerja-publikasi" element={<KPublikasi />} />
          <Route path="/kekayaan-intelektual" element={<KKekayaanInt />} />
          <Route path="/kinerja-buku" element={<Buku />} />
          <Route path="/dokumen" element={<Dokumen />} />
          <Route path="/pdf" element={<PDFViewer />} />

          <Route path="/admin" element={<LoginPage />} />
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <UserProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/setting-account"
                    element={
                      <ProtectedRoute>
                        <ASettingAccount />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-user"
                    element={
                      <ProtectedRoute>
                        <MUser />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-user/action-user"
                    element={
                      <ProtectedRoute>
                        <AddUser />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-user/edit-user/:id"
                    element={
                      <ProtectedRoute>
                        <EditUser />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting"
                    element={
                      <ProtectedRoute>
                        <ASetting />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/edit-settings/:id"
                    element={
                      <ProtectedRoute>
                        <EditSetting />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/action-address"
                    element={
                      <ProtectedRoute>
                        <AddAddress />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/action-contact"
                    element={
                      <ProtectedRoute>
                        <AddContact />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/action-logo-footer"
                    element={
                      <ProtectedRoute>
                        <AddLogoFooter />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/action-logo-header"
                    element={
                      <ProtectedRoute>
                        <AddLogoHeader />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-setting/action-social-media"
                    element={
                      <ProtectedRoute>
                        <AddSocialMedia />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-author"
                    element={
                      <ProtectedRoute>
                        <AAuthor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-author/action-author"
                    element={
                      <ProtectedRoute>
                        <AddAuthor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-author/edit-author/:id"
                    element={
                      <ProtectedRoute>
                        <EditAuthor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-prodi"
                    element={
                      <ProtectedRoute>
                        <AProgramStudi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-prodi/action-prodi"
                    element={
                      <ProtectedRoute>
                        <AddProdi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manajemen-prodi/edit-prodi/:id"
                    element={
                      <ProtectedRoute>
                        <EditProdi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-beranda"
                    element={
                      <ProtectedRoute>
                        <ABeranda />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-beranda/edit-beranda/:id"
                    element={
                      <ProtectedRoute>
                        <EditBeranda />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-beranda/action-carousel"
                    element={
                      <ProtectedRoute>
                        <AddCarousel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-beranda/action-kegiatan"
                    element={
                      <ProtectedRoute>
                        <AddKegiatan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-beranda/action-berita"
                    element={
                      <ProtectedRoute>
                        <AddBerita />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang"
                    element={
                      <ProtectedRoute>
                        <ATentang />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/action-tentang"
                    element={
                      <ProtectedRoute>
                        <AddTentang />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/edit-tentang/:id"
                    element={
                      <ProtectedRoute>
                        <EditTentang />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/action-sejarah"
                    element={
                      <ProtectedRoute>
                        <AddSejarah />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/action-visimisi"
                    element={
                      <ProtectedRoute>
                        <AddVisiMisi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/action-prokeb"
                    element={
                      <ProtectedRoute>
                        <AddProKeb />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-tentang/action-struktur"
                    element={
                      <ProtectedRoute>
                        <AddStruktur />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan"
                    element={
                      <ProtectedRoute>
                        <ALayanan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan/edit-layanan/:id"
                    element={
                      <ProtectedRoute>
                        <EditLayanan />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan/action-layananpenelitian"
                    element={
                      <ProtectedRoute>
                        <AddLPenelitian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan/action-layananpengabdian"
                    element={
                      <ProtectedRoute>
                        <AddLPengabdian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan/action-layanankerjasama"
                    element={
                      <ProtectedRoute>
                        <AddLKerjsama />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-layanan/action-layananhki"
                    element={
                      <ProtectedRoute>
                        <AddLHKI />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-pusat-studi"
                    element={
                      <ProtectedRoute>
                        <APusatStudi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-pusat-studi/add-pusat-studi"
                    element={
                      <ProtectedRoute>
                        <AddPusatStudi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-pusat-studi/edit-pusat-studi/:id"
                    element={
                      <ProtectedRoute>
                        <EditPusatStudi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-publikasi"
                    element={
                      <ProtectedRoute>
                        <APublikasi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-publikasi/add-publikasi"
                    element={
                      <ProtectedRoute>
                        <AddJurnal />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-publikasi/edit-publikasi/:id"
                    element={
                      <ProtectedRoute>
                        <EditJurnal />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/penelitian"
                    element={
                      <ProtectedRoute>
                        <AKPenelitian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/add-penelitian"
                    element={
                      <ProtectedRoute>
                        <AddPenelitian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/edit-penelitian/:id"
                    element={
                      <ProtectedRoute>
                        <EditPenelitian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/pengabdian"
                    element={
                      <ProtectedRoute>
                        <AKPengabdian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/add-pengabdian"
                    element={
                      <ProtectedRoute>
                        <AddPengabdian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/edit-pengabdian/:id"
                    element={
                      <ProtectedRoute>
                        <EditPengabdian />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/publikasi"
                    element={
                      <ProtectedRoute>
                        <AKPublikasi />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/publikasi/action-pubication-google"
                    element={
                      <ProtectedRoute>
                        <AddPubGoogle />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/publikasi/edit-pubication-google/:id"
                    element={
                      <ProtectedRoute>
                        <EditPubGoogle />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/publikasi/action-pubication-scopus"
                    element={
                      <ProtectedRoute>
                        <AddPubScopus />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/publikasi/edit-pubication-scopus/:id"
                    element={
                      <ProtectedRoute>
                        <EditPubScopus />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/hki"
                    element={
                      <ProtectedRoute>
                        <AKHKI />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/add-hki"
                    element={
                      <ProtectedRoute>
                        <AddHKI />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/edit-hki/:id"
                    element={
                      <ProtectedRoute>
                        <EditHKI />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/buku"
                    element={
                      <ProtectedRoute>
                        <AKBuku />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/add-buku"
                    element={
                      <ProtectedRoute>
                        <AddBuku />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-kinerja/edit-buku/:id"
                    element={
                      <ProtectedRoute>
                        <EditBuku />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-dokumen"
                    element={
                      <ProtectedRoute>
                        <ADokumen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-dokumen/add-dokumen"
                    element={
                      <ProtectedRoute>
                        <AddDokumen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pages-dokumen/edit-dokumen/:id"
                    element={
                      <ProtectedRoute>
                        <EditDokumen />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route
                    path="/pages-dokumen/detail-dokumen/:id"
                    element={
                      <ProtectedRoute>
                        <DetailDokumen />
                      </ProtectedRoute>
                    }
                  /> */}
                </Routes>
              </UserProvider>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}
export default App;
