/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KpiData {
  label: string;
  value: string;
  change: number;
  data: number[];
  color: string;
}

export interface RoadmapItem {
  year: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned' | 'future';
}

export interface ExecutiveAction {
  id: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
}
