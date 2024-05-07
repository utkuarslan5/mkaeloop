const LoopBuilder = ({
  projectType,
  frequency,
  iterations,
  setIterations,
  setProjectType,
  setFrequency,
}) => (
  <div className="flex flex-col items-start gap-4 mb-4">
    <div className="flex items-center gap-2">
      <span>I'll make</span>
      <IterationsInput value={iterations} onChange={setIterations} />
      <ProjectTypeSelect
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
      />
      
      <span>in</span>
      <IterationsOutput iterations={iterations} />
      <FrequencySelect
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
    </div>
  </div>
);

const ProjectTypeSelect = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={onChange}
  >
    <option value="">🤔 What?</option>
    <option value="app">📱 App</option>
    <option value="design">🎨 Design</option>
    <option value="song">🎵 Song</option>
    <option value="writing">✍️ Writing</option>
  </select>
);

const FrequencySelect = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={onChange}
  >
    <option value="">⏱️ How long?</option>
    <option value="daily">🌞 Days</option>
    <option value="weekly">🗓️ Weeks</option>
    <option value="monthly">📆 Months</option>
  </select>
);

const IterationsInput = ({ value, onChange }) => (
  <input
    type="number"
    min="1"
    placeholder="X"
    className="border rounded px-1 py-1 w-16"
    value={value || ""}
    onChange={(e) => onChange(parseInt(e.target.value, 10))}
  />
);

const IterationsOutput = ({ iterations }) => (
  <div className="flex gap-2">
    { iterations }
  </div>
);



export default LoopBuilder;
