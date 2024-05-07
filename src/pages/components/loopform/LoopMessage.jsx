import React from "react";

const LoopMessage = ({ projectType, frequency, iterations }) => (
  <div className="bg-primary-600 p-8 rounded mb-4 text-center">
    <p className="text-xl mb-2 text-left">
      📺 Your Mission, If You Choose to Accept:
    </p>
    <h2 className="text-2xl font-bold">
      📝 Create {iterations}{" "}
      {projectType === "app"
        ? "📱 Apps"
        : projectType === "design"
        ? "🎨 Designs"
        : projectType === "song"
        ? "🎵 Songs"
        : projectType === "writing"
        ? "✍️ Writings"
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
