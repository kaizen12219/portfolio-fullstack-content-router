export function selectProjects(projects, { variant, accent = "", limit = 3 }) {
  return projects
    .map(project => ({
      ...project,
      score: scoreProject(project, variant, accent),
      reasons: reasonsFor(project, variant, accent)
    }))
    .filter(project => project.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit);
}

function scoreProject(project, variant, accent) {
  let score = project.proofDepth;

  if (project.variants.includes(variant)) {
    score += 10;
  }

  if (accent && project.accents.includes(accent)) {
    score += 4;
  }

  if (!project.variants.includes(variant) && !(accent && project.accents.includes(accent))) {
    return 0;
  }

  return score;
}

function reasonsFor(project, variant, accent) {
  const reasons = [];
  if (project.variants.includes(variant)) {
    reasons.push(`matches ${variant}`);
  }
  if (accent && project.accents.includes(accent)) {
    reasons.push(`supports ${accent}`);
  }
  reasons.push(`${project.proofDepth}/5 proof depth`);
  return reasons;
}
