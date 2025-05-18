import Card from "@/app/lib/components/Card";
import config from "@/app/lib/config";

const {
  onboarding: {
    pages: {
      choosePlan: { title, description },
    },
  },
} = config;

// TODO: Replace with actual plans from the database
const mockPlans = [
  {
    id: 1,
    name: "Free",
    description: "For users looking to try out the app.",
    price: 0,
    features: [
      "1000 credits",
      "1000 photos",
      "1000 videos",
      "1000 audio",
      "1000 text",
    ],
  },
  {
    id: 2,
    name: "Pro",
    description: "For users looking to get more out of the app.",
    price: 10,
    features: [
      "1000 credits",
      "1000 photos",
      "1000 videos",
      "1000 audio",
      "1000 text",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    description: "For users looking to get the most out of the app.",
    price: 100,
    features: [
      "1000 credits",
      "1000 photos",
      "1000 videos",
      "1000 audio",
      "1000 text",
    ],
  },
];

export default function Plans() {
  return (
    // TODO: Fix bottom margin on mobile
    <div className="flex flex-col w-full h-full max-w-[90dvh] justify-start md:justify-center items-center gap-4">
      <div id="plans-header" className="flex flex-col w-full items-start p-4 mt-12 ml-4 md:p-0 md:ml-0 md:mt-0">
        <h1 className="text-2xl font-mono font-bold">{title}</h1>
        <p className="text-sm font-sans">{description}</p>
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-3 gap-4">
        {mockPlans.map((plan) => (
          <Card
            key={plan.id}
            title={{ text: plan.name, className: "font-mono" }}
            description={{
              text: plan.description,
              className: "font-sans",
            }}
            className="p-4 bg-background-alt"
          >
            <ul className="flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-sm font-sans">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
