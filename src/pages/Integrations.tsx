
import React from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const integrationOptions = [
  {
    name: "Slack",
    description: "Get real-time notifications, automate HR workflows, and improve team communication by connecting to Slack.",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" alt="Slack" className="w-10 h-10" />
    ),
    comingSoon: true,
  },
  {
    name: "Microsoft Teams",
    description: "Enable seamless HR collaboration in MS Teams. Push important alerts and updates directly to your channels.",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftteams.svg" alt="Teams" className="w-10 h-10" />
    ),
    comingSoon: true,
  },
  {
    name: "Zapier",
    description: "Automate complex HR tasks and connect with 5000+ other apps using Zapier integrations.",
    icon: (
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg" alt="Zapier" className="w-10 h-10" />
    ),
    comingSoon: true,
  }
];

const Integrations: React.FC = () => (
  <Layout>
    <div className="container mx-auto pt-8 pb-12 px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-7 h-7 text-blue-400" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Integrations</h1>
      </div>
      <p className="mb-7 text-blue-200 text-base">
        Connect NozelPay to the tools your team already loves.<br />
        <span className="text-blue-400/80">More integrations are coming soon. Let us know what you want to connect.</span>
      </p>
      <div className="grid sm:grid-cols-2 gap-7">
        {integrationOptions.map(opt => (
          <Card key={opt.name} className="bg-[#182243]/80 border border-blue-800/30 p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
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
  </Layout>
);

export default Integrations;
