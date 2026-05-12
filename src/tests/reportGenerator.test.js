import { describe, it, expect } from "vitest";
import { generateAuditReport } from "../utils/reportGenerator";

describe("Report Generator", () => {
  it("creates valid report metadata", () => {
    const report = generateAuditReport({
      processedTools: [],
    });

    expect(report.metadata).toBeDefined();
  });

  it("adds organization name", () => {
    const report = generateAuditReport(
      {
        processedTools: [],
      },
      "Acme Corp"
    );

    expect(report.metadata.organizationName).toBe("Acme Corp");
  });
});