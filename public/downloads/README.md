# Downloads Folder

This folder contains downloadable resources for the AgentMastery.ai resources page.

## File Structure

- **AI Strategy**
  - `ai-strategy-blueprint.pdf` - Comprehensive AI strategy development guide
  - `ai-budget-planner.xlsx` - Budget planning worksheet

- **Implementation**
  - `90-day-ai-implementation-checklist.pdf` - Step-by-step implementation guide
  - `ai-security-privacy-checklist.pdf` - Security and privacy considerations

- **Tool Selection**
  - `ai-vendor-comparison-template.xlsx` - Vendor evaluation template

- **Team Training**
  - `team-ai-training-kit.pdf` - Complete training materials

## File Naming Convention

Files should follow this format:
- Use lowercase with hyphens
- Include file type in name when helpful
- Keep names descriptive but concise

## Plausible Tracking

All downloads are tracked via Plausible Analytics with the following event:
```javascript
plausible('Download', {
  props: {
    resource: 'resource-id',
    type: 'internal|external|affiliate'
  }
})
```

## Maintenance

- Update this README when adding new files
- Ensure all files are optimized for web delivery
- Check file sizes regularly to maintain fast download speeds