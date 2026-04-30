import { useEffect, useState } from "react";

export default function App() {
  const [currentCTC, setCurrentCTC] = useState("");
  const [offeredCTC, setOfferedCTC] = useState("");
  const [deduction, setDeduction] = useState(10);
  const [currentInHand, setCurrentInHand] = useState("");
  const [hike, setHike] = useState("");

  const [appraisal, setAppraisal] = useState(0);
  const [monthlyInHand, setMonthlyInHand] = useState(0);
  const [finalCTC, setFinalCTC] = useState(0);

  useEffect(() => {
    const curr = Number(currentCTC);
    const off = Number(offeredCTC);
    const hikeVal = Number(hike);
    const currInHandVal = Number(currentInHand);

    if (!curr) return;

    let newCTC = 0;

    // Priority: Hike % > Offered CTC
    if (hikeVal) {
      newCTC = curr * (1 + hikeVal / 100);
    } else if (off) {
      newCTC = off;
    } else {
      return;
    }

    // Appraisal %
    const appraisalVal = ((newCTC - curr) / curr) * 100;

    // Deduction
    let finalDeduction = Number(deduction);

    if (currInHandVal) {
      const currentMonthly = curr / 12;
      finalDeduction =
        ((currentMonthly - currInHandVal) / currentMonthly) * 100;
    }

    // Monthly In-Hand
    const monthlyGross = newCTC / 12;
    const inHand = monthlyGross * (1 - finalDeduction / 100);

    setAppraisal(appraisalVal.toFixed(2));
    setMonthlyInHand(Math.round(inHand));
    setFinalCTC(Math.round(newCTC));
  }, [currentCTC, offeredCTC, deduction, currentInHand, hike]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">

        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8">
          CTC Growth Calculator
        </h1>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8">

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Input label="Current CTC" value={currentCTC} onChange={setCurrentCTC} />

            <Input
              label="Offered CTC"
              value={offeredCTC}
              onChange={setOfferedCTC}
              disabled={hike}
            />

            <Input label="Hike % (optional)" value={hike} onChange={setHike} />

            <Input label="Deduction %" value={deduction} onChange={setDeduction} />

            <Input
              label="Current In-Hand (optional)"
              value={currentInHand}
              onChange={setCurrentInHand}
            />

          </div>

          <div className="my-6 border-t border-white/20" />

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <Card title="New CTC" value={`₹ ${finalCTC.toLocaleString()}`} color="blue" />

            <Card title="Appraisal" value={`${appraisal}%`} color="green" />

            <Card
              title="Monthly In-Hand"
              value={`₹ ${monthlyInHand.toLocaleString()}`}
              color="indigo"
            />

          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          *Estimated values. Actual salary may vary based on taxes & company structure.
        </p>
      </div>
    </div>
  );
}

/* Input Component */
function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
      />
    </div>
  );
}

/* Result Card */
function Card({ title, value, color }) {
  const colors = {
    blue: "from-blue-400/20 to-indigo-500/20 border-blue-400/30 text-blue-400",
    green: "from-green-400/20 to-emerald-500/20 border-green-400/30 text-green-400",
    indigo: "from-indigo-400/20 to-purple-500/20 border-indigo-400/30 text-indigo-400",
  };

  return (
    <div className={`bg-gradient-to-r ${colors[color]} border rounded-xl p-5 text-center`}>
      <p className="text-sm text-gray-300">{title}</p>
      <h2 className="text-xl sm:text-2xl font-bold">{value}</h2>
    </div>
  );
}