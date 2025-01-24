import { useEffect, useState } from "react";
import ActionPages from "../components/molecules/ActionPages";
import axios from "axios";
import AdminPageLayout from "../components/molecules/AdminPageLayout";
import DeleteModal from "../components/molecules/DeleteModal";
import { Pagination } from "../components/molecules/Pagination";
import { useToast } from "@/hooks/use-toast";
import Table from "../components/molecules/Table";
import Loader from "../components/atoms/Loader";

const BASE_URL = import.meta.env.VITE_API_URL;
const MUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterItem, setFilterItem] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [links, setLinks] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const { toast } = useToast();

  const fetchData = async (url = `/api/users`, q = "", filter = "") => {
    try {
      const response = await axios.get(url + q + filter, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.data.data);
      setLinks(response.data.data.links);
      setPaginationLinks(url);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching data:", err);
      setError(err);
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`/api/users/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedId(null);
      setShowDeleteModal(false);
      fetchData();
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });

      setLoading(false);
    } catch (err) {
      setError(err);
      console.log("Error deleting data: " + err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(`/api/users?q=${search}`);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handlePageChange = (url) => {
    if (url) {
      fetchData(url, `&q=${search}`);
    }
  };

  if (loading) {
    return (
      <div className=" min-h-screen pt-20 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AdminPageLayout>
        <ActionPages
          search={true}
          value={search}
          setValue={setSearch}
          link={"/admin/manajemen-user/action-user"}
        />
        <Table
          pages={false}
          dataUser={users}
          editPage={"/admin/manajemen-user/edit-user/"}
          setShowDeleteModal={setShowDeleteModal}
          selectedId={setSelectedId}
        />
        {links?.length > 3 && (
          <div className="mt-2">
            <Pagination
              data={links}
              onClick={(url) => {
                handlePageChange(url);
              }}
            />
          </div>
        )}
      </AdminPageLayout>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        itemId={selectedId}
      />
    </>
  );
};

export default MUser;
