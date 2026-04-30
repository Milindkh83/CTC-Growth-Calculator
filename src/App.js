import { useEffect, useState } from "react";

export default function App() {
  const [currentCTC, setCurrentCTC] = useState(null);
  const [offeredCTC, setOfferedCTC] = useState(null);
  const [deduction, setDeduction] = useState(10);
  const [currentInHand, setCurrentInHand] = useState("");

  const [appraisal, setAppraisal] = useState(0);
  const [monthlyInHand, setMonthlyInHand] = useState(0);

  useEffect(() => {
    if (!currentCTC || !offeredCTC) return;

    const appraisalVal =
      ((offeredCTC - currentCTC) / currentCTC) * 100;

    let finalDeduction = deduction;

    if (currentInHand) {
      const currentMonthly = currentCTC / 12;
      finalDeduction =
        ((currentMonthly - currentInHand) / currentMonthly) * 100;
    }

    const monthlyGross = offeredCTC / 12;
    const inHand = monthlyGross * (1 - finalDeduction / 100);

    setAppraisal(appraisalVal.toFixed(2));
    setMonthlyInHand(Math.round(inHand));
  }, [currentCTC, offeredCTC, deduction, currentInHand]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex items-center justify-center p-4">

      <div className="w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8">
          CTC Growth Calculator
        </h1>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 sm:p-8">

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Input
              label="Current CTC"
              value={currentCTC}
              onChange={setCurrentCTC}
            />

            <Input
              label="Offered CTC"
              value={offeredCTC}
              onChange={setOfferedCTC}
            />

            <Input
              label="Deduction %"
              value={deduction}
              onChange={setDeduction}
            />

            <Input
              label="Current In-Hand (optional)"
              value={currentInHand}
              onChange={setCurrentInHand}
            />

          </div>

          {/* Divider */}
          <div className="my-6 border-t border-white/20" />

          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Appraisal */}
            <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-300">Appraisal</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
                {appraisal}%
              </h2>
            </div>

            {/* In-hand */}
            <div className="bg-gradient-to-r from-blue-400/20 to-indigo-500/20 border border-blue-400/30 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-300">Monthly In-Hand</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">
                ₹ {monthlyInHand.toLocaleString()}
              </h2>
            </div>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          *Estimated values. Actual salary may vary based on taxes & company structure.
        </p>

      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}