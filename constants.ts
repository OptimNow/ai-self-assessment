/**
 * AI Cost Readiness Assessment - Core Dimensions & Evaluation Criteria
 *
 * @fileoverview This file defines the 10 critical dimensions for evaluating an organization's
 * maturity in managing AI and cloud computing costs. Used by CTOs, VP Engineering, Cloud Architects,
 * and FinOps teams to assess readiness across visibility, control, and business value measurement.
 *
 * @module constants
 * @category Cloud FinOps, AI Cost Management, Cost Governance
 * @keywords AI cost optimization, cloud cost allocation, real-time visibility, unit economics,
 *           cost forecasting, ROI measurement, FinOps maturity, anomaly detection, cost governance
 *
 * Assessment Framework:
 * - 10 dimensions across 4 categories: Visibility (3), Control (3), Business Value (4)
 * - 3-point scoring system: Not Implemented (0), Partially Implemented (5), Fully Optimized (10)
 * - Maximum score: 100 points (10 dimensions × 10 points each)
 * - AI-powered report generation using OpenAI GPT-4o-mini
 *
 * Target Audience: CTOs, VP Engineering, Cloud Architects, FinOps Managers, DevOps Leads
 * Use Cases: AI cost governance, cloud cost optimization, FinOps maturity assessment,
 *            cost allocation strategy, AI workload management
 */

import { AssessmentDimension, AssessmentOption } from './types';

/**
 * Core Assessment Dimensions - 10 Critical Areas for AI Cost Readiness
 *
 * These dimensions evaluate organizational maturity across:
 * 1. VISIBILITY (3 dimensions) - Real-time cost tracking, allocation, monitoring
 * 2. CONTROL (3 dimensions) - Infrastructure, alerts, optimization speed
 * 3. BUSINESS VALUE (4 dimensions) - Context, economics, forecasting, ROI
 *
 * Each dimension includes:
 * - id: Unique identifier for tracking and API communication
 * - label: Human-readable name for the dimension
 * - description: Brief explanation of the dimension's focus
 * - category: Grouping (Visibility, Control, Business Value)
 * - question: Assessment question presented to users
 *
 * @constant {AssessmentDimension[]} DIMENSIONS
 * @exports DIMENSIONS
 */
export const DIMENSIONS: AssessmentDimension[] = [
  // VISIBILITY CATEGORY (Dimensions 1-3): Assessing real-time cost tracking and monitoring capabilities
  {
    // Dimension 1: Real-time cost visibility for AI workloads and cloud infrastructure
    id: 'real_time_visibility',
    label: 'Real-time Visibility',
    description: 'Ability to see AI costs as they accumulate.',
    category: 'Visibility',
    question: 'Can you see AI costs as they accumulate, rather than days later?',
    // Keywords: real-time monitoring, cost tracking, AI spending visibility, cloud cost dashboards
  },
  {
    // Dimension 2: Cost allocation and attribution to features, users, and workflows
    id: 'allocation_capability',
    label: 'Allocation Capability',
    description: 'Tracing costs to specific features or users.',
    category: 'Visibility',
    question: 'Can you trace costs to specific features, users, or workflows?',
    // Keywords: cost allocation, feature attribution, user-level costs, workflow tracking, tagging strategy
  },
  {
    // Dimension 3: Continuous monitoring infrastructure for real-time cost awareness
    id: 'continuous_monitoring',
    label: 'Continuous Monitoring',
    description: 'Real-time dashboards vs monthly reports.',
    category: 'Visibility',
    question: 'Are dashboards updated in real-time, rather than monthly or weekly?',
    // Keywords: continuous monitoring, real-time dashboards, cost observability, live metrics
  },

  // CONTROL CATEGORY (Dimensions 4-6): Evaluating infrastructure, alerts, and optimization capabilities
  {
    // Dimension 4: Proxy/gateway infrastructure for cost tagging and control
    id: 'proxy_infrastructure',
    label: 'Proxy Infrastructure',
    description: 'Middleware for tagging and control.',
    category: 'Control',
    question: 'Do you have a layer (gateway/proxy) between your code and AI providers for tagging?',
    // Keywords: proxy infrastructure, API gateway, middleware, cost tagging, infrastructure control
  },
  {
    // Dimension 5: Alert configuration for anomaly detection and cost spike notification
    id: 'alert_configuration',
    label: 'Alert Configuration',
    description: 'Speed of anomaly detection.',
    category: 'Control',
    question: 'Do you get notified of anomalies within minutes, not days?',
    // Keywords: anomaly detection, cost alerts, real-time notifications, spike detection, alerting system
  },
  {
    // Dimension 6: Optimization speed and engineering response time to cost issues
    id: 'optimization_speed',
    label: 'Optimization Speed',
    description: 'Response time to cost issues.',
    category: 'Control',
    question: 'Can engineering respond to cost spikes or issues within hours?',
    // Keywords: optimization speed, incident response, cost issue resolution, engineering agility
  },

  // BUSINESS VALUE CATEGORY (Dimensions 7-10): Measuring business impact and ROI of AI investments
  {
    // Dimension 7: Business context and stakeholder communication about AI costs
    id: 'business_context',
    label: 'Business Context',
    description: 'Explaining costs in business terms.',
    category: 'Business Value',
    question: 'Can you explain AI costs to stakeholders in clear business terms?',
    // Keywords: business context, stakeholder communication, cost narrative, business alignment
  },
  {
    // Dimension 8: Unit economics for measuring cost per business outcome
    id: 'unit_economics',
    label: 'Unit Economics',
    description: 'Measuring cost per business outcome.',
    category: 'Business Value',
    question: 'Do you measure cost per business outcome, not just cost per service?',
    // Keywords: unit economics, cost per outcome, business metrics, outcome-based costing, value metrics
  },
  {
    // Dimension 9: Forecast capability for predicting AI costs based on usage patterns
    id: 'forecast_capability',
    label: 'Forecast Capability',
    description: 'Predicting costs based on usage patterns.',
    category: 'Business Value',
    question: 'Can you predict AI costs based on user behavior patterns?',
    // Keywords: cost forecasting, predictive analytics, usage patterns, cost prediction, planning
  },
  {
    // Dimension 10: ROI measurement connecting AI spending to delivered business value
    id: 'roi_measurement',
    label: 'ROI Measurement',
    description: 'Connecting spend to value.',
    category: 'Business Value',
    question: 'Do you connect AI spending directly to the business value delivered?',
    // Keywords: ROI measurement, return on investment, value attribution, business impact, spend-to-value
  },
];

/**
 * Assessment Scoring Options - 3-Point Maturity Scale
 *
 * Scoring system for evaluating organizational maturity in each dimension:
 * - 0 points: Not Implemented - Manual, ad-hoc processes with no automation
 * - 5 points: Partially Implemented - Some tools exist but lack integration
 * - 10 points: Fully Optimized - Automated, real-time, fully integrated
 *
 * @constant {AssessmentOption[]} OPTIONS
 * @exports OPTIONS
 */
export const OPTIONS: AssessmentOption[] = [
  {
    // Score 0: Baseline maturity - manual processes, no automation
    value: 0,
    label: 'Not Implemented',
    description: 'No visibility or manual, ad-hoc processes.',
    // Indicates: Lack of tooling, manual spreadsheets, delayed reporting, reactive approach
  },
  {
    // Score 5: Intermediate maturity - some tooling but not real-time or integrated
    value: 5,
    label: 'Partially Implemented',
    description: 'Some tools or manual reporting exists, but lacks real-time context.',
    // Indicates: Basic dashboards, periodic reports, limited automation, siloed data
  },
  {
    // Score 10: Advanced maturity - fully automated, integrated, real-time capabilities
    value: 10,
    label: 'Fully Optimized',
    description: 'Automated, real-time, and fully integrated into workflows.',
    // Indicates: Advanced tooling, real-time visibility, proactive optimization, integrated systems
  },
];
