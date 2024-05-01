import React from "react";

const LoopMessage = ({ projectType, frequency, iterations }) => (
  <div className="bg-blue-100 p-4 rounded mb-4">
    <p className="text-xl mb-2">
      📺 Your Mission, If You Choose to Accept:
    </p>
    <h2 className="text-2xl font-bold">
      📝 Create {iterations}{" "}
      {projectType === "App"
        ? "📱 App"
        : projectType === "Design"
        ? "🎨 Design"
        : projectType === "Song"
        ? "🎵 Song"
        : projectType === "Writing"
        ? "✍️ Writing"
        : "🤔 What?"}{" "}
      in {iterations}{" "}
      {frequency === "daily"
        ? "🌞 Days"
        : frequency === "weekly"
        ? "🗓 Weeks"
        : frequency === "monthly"
        ? "📆 Months"
        : "⏱️ How long?"}
      .
    </h2>
  </div>
);

export default LoopMessage;