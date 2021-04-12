export default {
  type: "object",
  properties: {
    org: { type: 'string' },
    location: { type: 'string' },
    type: { type: 'string'}
  },
  required: ['org', 'location']
} as const;
