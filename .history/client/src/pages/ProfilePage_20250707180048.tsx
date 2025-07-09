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

  // Fetch profile on mount
  useEffect(() => {
    axios.get("/auth/profile").then((res) => {
      const { name, bio, linkedin, skills, wallet } = res.data;
      setForm({
        name: name || "",
        bio: bio || "",
        linkedin: linkedin || "",
        skills: skills?.join(", ") || "",
        wallet: wallet || "",
      });
      setLoading(false);
    }).catch((err) => {
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

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-10 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            name="wallet"
            value={form.wallet}
            onChange={handleChange}
            placeholder="Wallet address"
            className="flex-1 border p-2 rounded"
          />
          <button type="button" onClick={connectWallet} className="bg-purple-600 text-white px-3 py-2 rounded">
            Connect Wallet
          </button>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Save Profile
        </button>
        {saved && <p className="text-green-500 text-sm mt-2">Profile saved!</p>}
      </form>
    </div>
  );
}
