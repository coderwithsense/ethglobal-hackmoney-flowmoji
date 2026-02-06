const steps = [
  { id: 1, label: "Platforms" },
  { id: 2, label: "Tipping Rules" },
  { id: 3, label: "ENS Sync" },
  { id: 4, label: "Yellow Session" },
];

export default function SetupStepper({ current }: { current: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
              step.id === current
                ? "border-strong bg-ink-900 text-white"
                : "border-soft bg-white/70 text-ink-500"
            }`}
          >
            {step.id}
          </div>
          <span
            className={`text-xs font-semibold ${
              step.id === current ? "text-ink-900" : "text-ink-500"
            }`}
          >
            {step.label}
          </span>
          {step.id < steps.length && (
            <span className="hidden h-px w-6 bg-sand-200 md:inline-block" />
          )}
        </div>
      ))}
    </div>
  );
}
