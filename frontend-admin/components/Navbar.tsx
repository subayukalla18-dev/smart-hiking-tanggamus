export default function Navbar() {
  return (
    <div className="bg-white shadow px-8 py-4 rounded-2xl mb-8 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Smart Hiking Tanggamus
        </p>
      </div>

      <div className="bg-black text-white px-4 py-2 rounded-xl">
        Admin
      </div>

    </div>
  );
}