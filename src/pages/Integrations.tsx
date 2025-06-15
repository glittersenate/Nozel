
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

// Official colored SVG code snippets for each brand
const integrationOptions = [
  {
    name: "Slack",
    description:
      "Get real-time notifications, automate HR workflows, and improve team communication by connecting to Slack.",
    icon: (
      <span className="w-10 h-10 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <g>
            <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
            <g>
              <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
              <g>
                <path d="M13.767 25.037c0 1.158-.942 2.1-2.1 2.1-1.158 0-2.1-.942-2.1-2.1 0-1.158.941-2.1 2.1-2.1h2.1v2.1zm1.05 0c0-1.158.941-2.1 2.1-2.1 1.158 0 2.1.941 2.1 2.1v5.249c0 1.158-.942 2.1-2.1 2.1-1.158 0-2.1-.941-2.1-2.1v-5.249z" fill="#ECB22E"/>
                <path d="M14.817 13.764c-1.158 0-2.1-.941-2.1-2.1 0-1.158.941-2.1 2.1-2.1 1.158 0 2.1.941 2.1 2.1v2.1h-2.1zm0 1.05c1.158 0 2.1.942 2.1 2.1 0 1.158-.942 2.1-2.1 2.1H9.568c-1.158 0-2.1-.942-2.1-2.1 0-1.158.941-2.1 2.1-2.1h5.249z" fill="#2EB67D"/>
                <path d="M26.234 14.814c0-1.158.941-2.1 2.1-2.1 1.158 0 2.1.941 2.1 2.1 0 1.158-.941 2.1-2.1 2.1h-2.1v-2.1zm-1.05 0c0 1.158-.941 2.1-2.1 2.1-1.158 0-2.1-.942-2.1-2.1V9.565c0-1.158.941-2.1 2.1-2.1 1.158 0 2.1.941 2.1 2.1v5.249z" fill="#E01E5A"/>
                <path d="M25.182 26.237c1.158 0 2.1.941 2.1 2.099 0 1.158-.941 2.1-2.1 2.1-1.158 0-2.1-.942-2.1-2.1v-2.099h2.1zm0-1.05c-1.158 0-2.1-.941-2.1-2.1 0-1.158.941-2.1 2.1-2.1h5.25c1.158 0 2.1.941 2.1 2.1 0 1.158-.941 2.1-2.1 2.1h-5.25z" fill="#36C5F0"/>
              </g>
            </g>
          </g>
        </svg>
      </span>
    ),
    comingSoon: true,
  },
  {
    name: "Microsoft Teams",
    description:
      "Enable seamless HR collaboration in MS Teams. Push important alerts and updates directly to your channels.",
    icon: (
      <span className="w-10 h-10 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <g>
            <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
            <g>
              <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
              <g>
                <path d="M16.497 12.094a1.933 1.933 0 0 1 1.925-1.926h6.646A1.933 1.933 0 0 1 27 12.094v15.813A1.933 1.933 0 0 1 25.068 29.84h-6.646a1.933 1.933 0 0 1-1.925-1.933V12.094z" fill="#5059C9"/>
                <rect x="9.999" y="16.147" width="3.725" height="9.853" rx="1.863" fill="#7B83EB"/>
                <rect x="11.618" y="14.05" width="3.724" height="3.725" rx="1.862" fill="#7B83EB"/>
              </g>
            </g>
          </g>
        </svg>
      </span>
    ),
    comingSoon: true,
  },
  {
    name: "Zapier",
    description:
      "Automate complex HR tasks and connect with 5000+ other apps using Zapier integrations.",
    icon: (
      <span className="w-10 h-10 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <g>
            <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
            <g>
              <rect width="40" height="40" rx="8" fill="white" fillOpacity="0" />
              <g>
                <path d="M29.449 21.377v-2.442l-5.796-.594.966-1.971 5.184 2.206.879-2.262-5.653-1.249 1.68-1.681 4.184 4.185 1.868-1.869-4.185-4.184 1.681-1.68 1.249 5.653 2.262-.879-2.206-5.185 1.97-.967.594 5.797 2.442-.001-.594-5.796-1.97.967 2.205 5.184-1.25-5.654-1.68 1.68 4.185 4.185-1.68-1.681-4.185-4.184-1.681 1.68 5.654 1.25-5.185-2.205.967-1.97 5.797.594-.001-2.443-5.796-.594-.967 1.97 5.185 2.205-1.25-5.654-1.68 1.68-4.184 4.185 1.869-1.868 4.184-4.185 1.681 1.681-1.249 5.653 2.262-.879-2.205-5.185.967-1.97-.594 5.797-2.443.001.594-5.797 1.971.967 5.185-2.205-1.25 5.654-1.68-1.68-4.185-4.185-1.681 1.681 5.654 1.249-5.185 2.205-.967-1.97 5.796-.594V9.62l-5.796.594-.967-1.97 5.185-2.206-.879-2.262-5.654 1.249 1.681 1.681 4.185-4.184-1.868-1.868-4.184 4.185-1.681-1.68 1.249-5.654-2.262.879 2.206 5.184-1.97.967-.594-5.796-2.442.001.594 5.797 1.97-.967-2.206-5.184 1.25 5.654 1.68-1.68-4.185-4.185 1.68 1.681 4.185 4.184 1.68-1.68-5.654-1.25 5.185-2.205-.967-1.97-5.797.594V9.62l5.796-.594.967 1.97-5.185 2.206.879 2.262 5.654-1.249-1.681-1.681-4.185 4.185 1.868 1.868 4.185-4.185 1.681 1.68-1.249 5.654 2.262-.879-2.205-5.185.967-1.97.594 5.797 2.443-.001-.594-5.796-1.971.967-5.185-2.206 1.25 5.654 1.68-1.681 4.185-4.185-1.68 1.681-4.185-4.184-1.681 1.681 5.654 1.25-5.185 2.206.967 1.97-5.797-.594V9.619l5.796-.594.967 1.97-5.185 2.206.879 2.262 5.654-1.249-1.681-1.681-4.185 4.184 1.868 1.869 4.185-4.185 1.681 1.68-1.249 5.653 2.262-.879-2.206-5.185.967-1.97.594 5.797 2.443-.001-.594-5.797-1.971.967 2.206 5.185z" fill="#FF4F1F" />
              </g>
            </g>
          </g>
        </svg>
      </span>
    ),
    comingSoon: true,
  },
];

const Integrations: React.FC = () => (
  <div className="pt-8 pb-12 px-4 lg:pl-16 lg:pr-0 w-full">
    <div className="flex items-center gap-3 mb-6">
      <Settings className="w-7 h-7 text-blue-400" />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        Integrations
      </h1>
    </div>
    <p className="mb-7 text-blue-200 text-base">
      Connect NozelPay to the tools your team already loves.<br />
      <span className="text-blue-400/80">More integrations are coming soon. Let us know what you want to connect.</span>
    </p>
    <div className="grid sm:grid-cols-2 gap-7 max-w-4xl">
      {integrationOptions.map((opt) => (
        <Card
          key={opt.name}
          className="bg-[#182243]/80 border border-blue-800/30 p-6 rounded-xl shadow-lg flex flex-col items-center gap-3"
        >
          <div className="flex items-center justify-center mb-2">{opt.icon}</div>
          <h2 className="text-lg font-bold text-blue-100">{opt.name}</h2>
          <div className="text-blue-300/80 text-[15px] mb-3 text-center">{opt.description}</div>
          <Button disabled variant="secondary" className="opacity-90 pointer-events-none">
            {opt.comingSoon ? "Coming Soon" : "Connect"}
          </Button>
        </Card>
      ))}
    </div>
    <div className="text-xs text-blue-300 mt-8 text-center opacity-70">
      Want another integration? Reach out to our team!
    </div>
  </div>
);

export default Integrations;
