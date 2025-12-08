import { AssessmentDimension, AssessmentOption } from './types';

export const DIMENSIONS: AssessmentDimension[] = [
  {
    id: 'real_time_visibility',
    label: 'Real-time Visibility',
    description: 'Ability to see AI costs as they accumulate.',
    category: 'Visibility',
    question: 'Can you see AI costs as they accumulate, rather than days later?',
  },
  {
    id: 'allocation_capability',
    label: 'Allocation Capability',
    description: 'Tracing costs to specific features or users.',
    category: 'Visibility',
    question: 'Can you trace costs to specific features, users, or workflows?',
  },
  {
    id: 'proxy_infrastructure',
    label: 'Proxy Infrastructure',
    description: 'Middleware for tagging and control.',
    category: 'Control',
    question: 'Do you have a layer (gateway/proxy) between your code and AI providers for tagging?',
  },
  {
    id: 'unit_economics',
    label: 'Unit Economics',
    description: 'Measuring cost per business outcome.',
    category: 'Business Value',
    question: 'Do you measure cost per business outcome, not just cost per service?',
  },
  {
    id: 'continuous_monitoring',
    label: 'Continuous Monitoring',
    description: 'Real-time dashboards vs monthly reports.',
    category: 'Visibility',
    question: 'Are dashboards updated in real-time, rather than monthly or weekly?',
  },
  {
    id: 'alert_configuration',
    label: 'Alert Configuration',
    description: 'Speed of anomaly detection.',
    category: 'Control',
    question: 'Do you get notified of anomalies within minutes, not days?',
  },
  {
    id: 'business_context',
    label: 'Business Context',
    description: 'Explaining costs in business terms.',
    category: 'Business Value',
    question: 'Can you explain AI costs to stakeholders in clear business terms?',
  },
  {
    id: 'optimization_speed',
    label: 'Optimization Speed',
    description: 'Response time to cost issues.',
    category: 'Control',
    question: 'Can engineering respond to cost spikes or issues within hours?',
  },
  {
    id: 'forecast_capability',
    label: 'Forecast Capability',
    description: 'Predicting costs based on usage patterns.',
    category: 'Business Value',
    question: 'Can you predict AI costs based on user behavior patterns?',
  },
  {
    id: 'roi_measurement',
    label: 'ROI Measurement',
    description: 'Connecting spend to value.',
    category: 'Business Value',
    question: 'Do you connect AI spending directly to the business value delivered?',
  },
];

export const OPTIONS: AssessmentOption[] = [
  {
    value: 0,
    label: 'Not Implemented',
    description: 'No visibility or manual, ad-hoc processes.',
  },
  {
    value: 5,
    label: 'Partially Implemented',
    description: 'Some tools or manual reporting exists, but lacks real-time context.',
  },
  {
    value: 10,
    label: 'Fully Optimized',
    description: 'Automated, real-time, and fully integrated into workflows.',
  },
];
