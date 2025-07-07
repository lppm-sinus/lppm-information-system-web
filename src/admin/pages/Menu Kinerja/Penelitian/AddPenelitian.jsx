import BtnSubmit from "@/admin/components/atoms/BtnSubmit";
import FormInput from "@/admin/components/atoms/FormInput";
import OptionLeader from "@/admin/components/atoms/OptionLeader";
import TextAreaInput from "@/admin/components/atoms/TextAreaInput";
import AdminPageLayout from "@/admin/components/molecules/AdminPageLayout";
import AuthorOption from "@/admin/components/molecules/AuthorOption";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPenelitian = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState();
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { toast } = useToast();

  const addAuthor = (id, name) => {
    setSelectedAuthors([
      ...selectedAuthors,
      {
        id: id,
        name: name,
      },
    ]);
  };

  const addLeader = (nidn, name) => {
    setSelectedLeader({
      nidn: nidn,
      name: name,
    });
  };

  const deleteAuthor = (id) => {
    setSelectedAuthors(selectedAuthors.filter((author) => author.id !== id));
  };

  const dataAuthors = async () => {
    try {
      const res = await axios.get("/api/authors/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAuthors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    nama_ketua: "",
    nidn_ketua: "",
    afiliasi_ketua: "",
    kd_pt_ketua: "",
    judul: "",
    nama_singkat_skema: "",
    thn_pertama_usulan: "",
    thn_usulan_kegiatan: "",
    thn_pelaksanaan_kegiatan: "",
    lama_kegiatan: "",
    bidang_fokus: "",
    nama_skema: "",
    status_usulan: "",
    dana_disetujui: "",
    afiliasi_sinta_id: "",
    nama_institusi_penerima_dana: "",
    target_tkt: "",
    nama_program_hibah: "",
    kategori_sumber_dana: "",
    negara_sumber_dana: "",
    sumber_dana: "",
    dokumen_pendukung: "",
    author_members: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(formData);

      const res = await axios.post("/api/researches", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //res.data.message
      setError(null);
      setFormData({
        nama_ketua: "",
        nidn_ketua: "",
        afiliasi_ketua: "",
        kd_pt_ketua: "",
        judul: "",
        nama_singkat_skema: "",
        thn_pertama_usulan: "",
        thn_usulan_kegiatan: "",
        thn_pelaksanaan_kegiatan: "",
        lama_kegiatan: "",
        bidang_fokus: "",
        nama_skema: "",
        status_usulan: "",
        dana_disetujui: "",
        afiliasi_sinta_id: "",
        nama_institusi_penerima_dana: "",
        target_tkt: "",
        nama_program_hibah: "",
        kategori_sumber_dana: "",
        negara_sumber_dana: "",
        sumber_dana: "",
        dokumen_pendukung: "",
        author_members: [],
      });
      setSelectedAuthors([]);
      setSelectedLeader(null);
      navigate(-1);
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dataAuthors();
  }, []);

  useEffect(() => {
    const authorsToSend = selectedAuthors.map((author) => author.id);
    setFormData((prev) => ({
      ...prev,
      author_members: authorsToSend,
    }));
  }, [selectedAuthors]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      nidn_ketua: selectedLeader?.nidn,
      nama_ketua: selectedLeader?.name,
    }));
  }, [selectedLeader]);

  return (
    <AdminPageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between  mb-5">
          <h2 className="text-xl font-bold mb-4">Input Data Penelitian</h2>

          <div className="flex gap-5 items-center w-1/6">
            {/* Button */}
            <BtnSubmit name="Simpan" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-lg">
          <OptionLeader authors={authors} onLeaderSelect={addLeader} />
          <FormInput
            isDisabled={selectedLeader !== null}
            disable={true}
            label="NIDN Ketua"
            name="nidn_ketua"
            type="text"
            value={formData.nidn_ketua || ""}
            onChange={handleChange}
            error={error?.nidn_ketua}
          />
          <FormInput
            isDisabled={selectedLeader !== null}
            label="Nama Ketua"
            name="nama_ketua"
            type="text"
            value={formData.nama_ketua || ""}
            onChange={handleChange}
            error={error?.nama_ketua}
          />

          <FormInput
            label="KD PT Ketua"
            name="kd_pt_ketua"
            type="text"
            value={formData.kd_pt_ketua || ""}
            onChange={handleChange}
            error={error?.kd_pt_ketua}
          />
          <FormInput
            label="Afiliasi Ketua"
            name="afiliasi_ketua"
            type="text"
            value={formData.afiliasi_ketua || ""}
            onChange={handleChange}
            error={error?.afiliasi_ketua}
          />
          <FormInput
            label="Afiliasi Sinta Id"
            name="afiliasi_sinta_id"
            type="text"
            value={formData.afiliasi_sinta_id || ""}
            onChange={handleChange}
            error={error?.afiliasi_sinta_id}
          />
          <FormInput
            label="Bidang Fokus"
            name="bidang_fokus"
            type="text"
            value={formData.bidang_fokus || ""}
            onChange={handleChange}
            error={error?.bidang_fokus}
          />
          <FormInput
            label="Dana Disetujui"
            name="dana_disetujui"
            type="text"
            value={formData.dana_disetujui || ""}
            onChange={handleChange}
            error={error?.dana_disetujui}
          />
          <span className="col-span-2">
            <TextAreaInput
              label="Judul"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              error={error?.judul}
            />
          </span>
          <FormInput
            label="Sumber Dana"
            name="sumber_dana"
            type="text"
            value={formData.sumber_dana || ""}
            onChange={handleChange}
            error={error?.sumber_dana}
          />
          <FormInput
            label="Lama Kegiatan"
            name="lama_kegiatan"
            type="text"
            value={formData.lama_kegiatan || ""}
            onChange={handleChange}
            error={error?.lama_kegiatan}
          />
          <span className="col-span-2">
            <FormInput
              label="Nama Institusi Penerima Dana"
              name="nama_institusi_penerima_dana"
              type="text"
              value={formData.nama_institusi_penerima_dana || ""}
              onChange={handleChange}
              error={error?.nama_institusi_penerima_dana}
            />
          </span>
          <FormInput
            label="Nama Program Hibah"
            name="nama_program_hibah"
            type="text"
            value={formData.nama_program_hibah || ""}
            onChange={handleChange}
            error={error?.nama_program_hibah}
          />
          <FormInput
            label="Nama Singkat Skema"
            name="nama_singkat_skema"
            type="text"
            value={formData.nama_singkat_skema || ""}
            onChange={handleChange}
            error={error?.nama_singkat_skema}
          />
          <FormInput
            label="Nama Skema"
            name="nama_skema"
            type="text"
            value={formData.nama_skema || ""}
            onChange={handleChange}
            error={error?.nama_skema}
          />
          <FormInput
            label="Negara Sumber Dana"
            name="negara_sumber_dana"
            type="text"
            value={formData.negara_sumber_dana || ""}
            onChange={handleChange}
            error={error?.negara_sumber_dana}
          />
          <FormInput
            label="Status Usulan"
            name="status_usulan"
            type="text"
            value={formData.status_usulan || ""}
            onChange={handleChange}
            error={error?.status_usulan}
          />
          <FormInput
            label="Kategori Sumber Dana"
            name="kategori_sumber_dana"
            type="text"
            value={formData.kategori_sumber_dana || ""}
            onChange={handleChange}
            error={error?.kategori_sumber_dana}
          />
          <FormInput
            label="Target TKT"
            name="target_tkt"
            type="text"
            value={formData.target_tkt || ""}
            onChange={handleChange}
            error={error?.target_tkt}
          />
          <FormInput
            label="Tahun Pelaksanaan Kegiatan"
            name="thn_pelaksanaan_kegiatan"
            type="text"
            value={formData.thn_pelaksanaan_kegiatan || ""}
            onChange={handleChange}
            error={error?.thn_pelaksanaan_kegiatan}
          />
          <FormInput
            label="Tahun Pertama Usulan"
            name="thn_pertama_usulan"
            type="text"
            value={formData.thn_pertama_usulan || ""}
            onChange={handleChange}
            error={error?.thn_pertama_usulan}
          />
          <FormInput
            label="Tahun Usulan Kegiatan"
            name="thn_usulan_kegiatan"
            type="number"
            value={formData.thn_usulan_kegiatan || ""}
            onChange={handleChange}
            error={error?.thn_usulan_kegiatan}
          />
          <span className="col-span-2">
            <FormInput
              label="Dokumen Pendukung"
              name="dokumen_pendukung"
              type="file"
              value={formData.dokumen_pendukung || ""}
              onChange={handleChange}
              error={error?.dokumen_pendukung}
            />
          </span>
          <span className="col-span-2">
            <AuthorOption
              authors={authors}
              selectedAuthors={selectedAuthors}
              selectedLeader={selectedLeader}
              addAuthor={addAuthor}
              deleteAuthor={deleteAuthor}
              error={error?.authors}
            />
          </span>
        </div>
      </form>
    </AdminPageLayout>
  );
};

export default AddPenelitian;
