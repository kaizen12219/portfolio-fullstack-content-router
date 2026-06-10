import test from "node:test";
import assert from "node:assert/strict";

import { projects, seriesProfiles } from "../src/content.js";
import { selectProjects } from "../src/router.js";

test("node full-stack variant leads with router and browser projects", () => {
  const selected = selectProjects(projects, {
    variant: "fullstack-product",
    accent: "node"
  });

  assert.equal(selected[0].id, "portfolio-series-router");
  assert.ok(selected.some(project => project.id === "vanilla-js-lab"));
});

test("backend go variant includes API evidence", () => {
  const selected = selectProjects(projects, {
    variant: "backend-platform",
    accent: "go"
  });

  assert.ok(selected.some(project => project.id === "fast-endpoints-api"));
  assert.ok(selected.every(project => project.score > 0));
});

test("unknown variant returns empty selection", () => {
  assert.deepEqual(selectProjects(projects, { variant: "unknown" }), []);
});

test("series profiles cover the extracted resume set", () => {
  const total = seriesProfiles.reduce((sum, profile) => sum + profile.resumeCount, 0);
  assert.equal(seriesProfiles.length, 5);
  assert.equal(total, 243);
});

test("mobile variant leads with release-quality evidence", () => {
  const selected = selectProjects(projects, {
    variant: "mobile",
    accent: "mobile"
  });

  assert.equal(selected[0].id, "time-trial-cards");
});
