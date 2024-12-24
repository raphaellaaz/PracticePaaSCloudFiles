import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

interface FileData {
  id: number;
  name: string;
}

const Home = () => {
  const auth = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState<FileData[]>([]);
  const [fileId, setFileId] = useState(1);

  if (!auth?.isLoggedIn) {
    router.push("/login");
    return null;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles((prev) => [...prev, { id: fileId, name: file.name }]);
      setFileId((prev) => prev + 1);
    }
  };

  const handleDownload = (fileName: string) => {
    alert(`Download triggered for ${fileName}`);
  };

  const handleDelete = (fileId: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">File Manager</h1>
        <button
          onClick={() => {
            auth.logout();
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <input
          type="file"
          onChange={handleFileUpload}
          className="mb-4 border p-2"
        />
        <ul>
          {files.map((file) => (
            <li key={file.id} className="flex justify-between items-center mb-2">
              <span>{file.name}</span>
              <div>
                <button
                  onClick={() => handleDownload(file.name)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

