export default function ProfilePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-zinc-900">Profil</h1>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow ring-1 ring-black/5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-zinc-200 text-zinc-700 text-xl font-bold">
            ADM
          </div>

          <div>
            <div className="text-lg font-semibold text-zinc-900">
              Admin
            </div>
            <div className="text-sm text-zinc-500">
              Role: Administrator
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <button
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
