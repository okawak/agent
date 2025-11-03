import { describe, test } from "bun:test";
import { strict as assert } from "node:assert";
import {
  playgroundSections,
  playgroundStatusMeta,
} from "../app/playground/data";

describe("playground sections", () => {
  test("sections are defined", () => {
    assert.ok(playgroundSections.length > 0, "sections should not be empty");
  });

  test("every item status has metadata", () => {
    for (const section of playgroundSections) {
      for (const item of section.items) {
        assert.ok(
          playgroundStatusMeta[item.status],
          `missing metadata for status: ${item.status}`,
        );
      }
    }
  });

  test("item ids remain unique", () => {
    const seen = new Set<string>();
    for (const section of playgroundSections) {
      for (const item of section.items) {
        assert.ok(!seen.has(item.id), `duplicate item id detected: ${item.id}`);
        seen.add(item.id);
      }
    }
  });
});
