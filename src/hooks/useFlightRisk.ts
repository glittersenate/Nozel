
import { useEmployees } from "@/hooks/useEmployees";

// Simulated algorithm: flag highest paid + recent hires as higher risk; rest as low
export function useFlightRisk() {
  const { employees } = useEmployees();

  // Simulate a simple risk score
  const riskRanked = [...employees].map((emp) => {
    let score = 0;
    // Recent hire = higher risk
    const monthsSinceStart =
      (new Date().getTime() - new Date(emp.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsSinceStart < 6) score += 3;
    if (monthsSinceStart < 1.5) score += 5;
    // High salary = high risk (simulated)
    if (emp.salary > 120000) score += 4;
    else if (emp.salary > 90000) score += 2;
    // Inactive = not at risk
    if (emp.status !== "active") score = 0;
    // Add more "AI" logic here if desired
    return {
      ...emp,
      riskScore: score,
      riskLevel:
        score >= 7 ? "High" : score >= 4 ? "Medium" : "Low"
    } as typeof emp & { riskScore: number; riskLevel: "Low" | "Medium" | "High" };
  });

  // Show only active employees, sorted by risk desc
  const activeRisks = riskRanked
    .filter((e) => e.status === "active")
    .sort((a, b) => b.riskScore - a.riskScore);

  const topRisks = activeRisks.filter((emp) => emp.riskLevel !== "Low").slice(0, 5);

  const overallRisk =
    activeRisks.find((e) => e.riskLevel === "High")
      ? "High"
      : activeRisks.find((e) => e.riskLevel === "Medium")
        ? "Medium"
        : "Low";
  const summary = {
    overallRisk,
    message:
      overallRisk === "High"
        ? "Urgent action needed: Some key employees may leave soon."
        : overallRisk === "Medium"
          ? "Some employees show signs of disengagement. Consider targeted engagement."
          : "Talent risk is low. Keep up the good work!"
  };

  return {
    employees: riskRanked,
    summary,
    topRisks
  };
}
