import { useEffect, useState } from "react";
import axios from "@/api/axios";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    linkedin: "",
    skills: "",
    wallet: "",
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get("/auth/profile")
      .then((res) => {
        const { name, bio, linkedin, skills, wallet } = res.data;
        setForm({
          name: name || "",
          bio: bio || "",
          linkedin: linkedin || "",
          skills: skills?.join(", ") || "",
          wallet: wallet || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile load failed", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    await axios.put("/auth/profile", updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setForm({ ...form, wallet: accounts[0] });
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600 text-lg">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white shadow-xl rounded-3xl border border-blue-100">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Edit Your Profile
      </h2>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourname"
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="JavaScript, React, Node.js"
            className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name="wallet"
              value={form.wallet}
              onChange={handleChange}
              placeholder="0x..."
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={connectWallet}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Connect Wallet
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!form.wallet}
          className={`w-full py-3 text-white font-semibold rounded-xl transition ${
            form.wallet
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Profile
        </button>

        {saved && (
          <p className="text-green-600 text-center mt-3 font-medium">
            ✅ Profile saved successfully!
          </p>
        )}
      </form>
    </div>
  );
}
