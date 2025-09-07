import { useToast } from "@/hooks/use-toast";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TableResearchAndService = (props) => {
  const { toast } = useToast();
  return (
    <div className="max-w-screen relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 ">
          <tr className="text-xs">
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              No
            </th>
            <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
              Afiliasi
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Bidang Fokus
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Dana Disetujui
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Judul
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Sumber Dana
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              KD PT Ketua
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Lama Kegiatan (tahun)
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Istitusi Penerima Dana
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Nama Ketua
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Nama Program Hibah
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Nama Singkat Skema
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Nama Skema
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Negara Sumber Dana
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              NIDN Ketua
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Status Usulan
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Sumber Dana
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Target TKT
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Tahun Pelaksanaan
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Tahun Pertama Usulan
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Tahun Usulan Kegiatan
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}>
              Author
            </th>
            <th scope="col" className="px-6 py-3" rowSpan={2}></th>
          </tr>
          <tr className="text-xs">
            <th scope="col" className="px-6 py-3">
              Ketua
            </th>
            <th scope="col" className="px-6 py-3 min-w-24">
              Sinta Id
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item, index) => (
            <tr
              key={item.id}
              className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3 min-w-40">{item.afiliasi_ketua}</td>
              <td className="px-6 py-3">{item.afiliasi_sinta_id}</td>
              <td className="px-6 py-3 min-w-48">{item.bidang_fokus}</td>
              <td className="px-6 py-3">{item.dana_disetujui}</td>
              <td className="px-6 py-3 min-w-[40rem]">{item.judul}</td>
              <td className="px-6 py-3">{item.kategori_sumber_dana}</td>
              <td className="px-6 py-3">{item.kd_pt_ketua}</td>
              <td className="px-6 py-3">{item.lama_kegiatan}</td>
              <td className="px-6 py-3 min-w-80">
                {item.nama_institusi_penerima_dana}
              </td>
              <td className="px-6 py-3">{item.nama_ketua}</td>
              <td className="px-6 py-3">{item.nama_program_hibah}</td>
              <td className="px-6 py-3">{item.nama_singkat_skema}</td>
              <td className="px-6 py-3">{item.nama_skema}</td>
              <td className="px-6 py-3">{item.negara_sumber_dana}</td>
              <td className="px-6 py-3">{item.nidn_ketua}</td>
              <td className="px-6 py-3">{item.status_usulan}</td>
              <td className="px-6 py-3">{item.sumber_dana}</td>
              <td className="px-6 py-3">{item.target_tkt}</td>
              <td className="px-6 py-3">{item.thn_pelaksanaan_kegiatan}</td>
              <td className="px-6 py-3">{item.thn_pertama_usulan}</td>
              <td className="px-6 py-3">{item.thn_usulan_kegiatan}</td>
              <td className="px-6 py-3 min-w-[30rem] text-start">
                {item.authors?.map((author, index) => (
                  <p key={author.id}>
                    {index + 1}. ({author.sinta_id}){" "}
                    {author.title_prefix ? author.title_prefix + ". " : null}
                    {author.name}, {author.title_suffix}
                  </p>
                ))}
              </td>
              <td className="px-6 py-3 flex gap-2">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    props.setShowDoc(true);

                    item.file_path.length > 0
                      ? props.setSelectedFile(item.file_path)
                      : toast({
                          variant: "destructive",
                          description: `Dokumen tidak ditemukan`,
                        });
                  }}
                >
                  <button
                    className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-lppm_premier hover:bg-lppm_premier/90 text-white"
                    onClick={() => {
                      props.setShowPreviewDoc(true);
                      props.setSelectedFile(item.file_path);
                    }}
                  >
                    <FaEye />
                    <span>Dokumen</span>
                  </button>
                </span>
                <Link to={`${props.editPage}${item.id}`}>
                  <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-[#127d91] hover:bg-[#127d91]/90 text-white">
                    <FaRegEdit />
                    <span>Sunting</span>
                  </button>
                </Link>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    props.setSelectedId(item.id);
                    props.setShowDeleteModal(true);
                  }}
                >
                  <button className="px-2 py-1.5 text-xs rounded-md flex items-center space-x-1 bg-rose-500 hover:bg-rose-600 text-white">
                    <FaTrash />
                    <span>Hapus</span>
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResearchAndService;
