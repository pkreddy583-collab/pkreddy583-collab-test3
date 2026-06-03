/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple API route for dashboard data (could be extended)
  app.get('/test', (req, res) => {
    res.send('SERVER IS RESPONDING');
  });

  app.get('/health', (req, res) => {
    res.send('Server is up and running');
  });

  app.get('/api/stats', (req, res) => {
    res.json({
      stabilityScore: 87,
      isUp: true,
      lastRefresh: new Date().toISOString()
    });
  });

  // Operations Mock API Endpoints
  const mockOperations = {
    summary: {
      kpis: [
        { label: 'SLA Health', value: '98.4%', trend: 'up', change: 2.3 },
        { label: 'Incident Velocity', value: 'Low', trend: 'down', change: 12 },
        { label: 'Backlog Health', value: 'Critical', trend: 'up', change: 5.1 },
        { label: 'Auto-Recovery', value: '72%', trend: 'up', change: 15 }
      ]
    },
    slaCommand: {
      kpis: [
        { label: 'Ack %', value: '99.2%' },
        { label: 'Res %', value: '94.5%' },
        { label: 'Breached', value: '14' },
        { label: 'Near Breach', value: '28' },
        { label: 'Recovery', value: '88%' }
      ],
      trend: [
        { name: 'Mon', sla: 98 }, { name: 'Tue', sla: 97 }, { name: 'Wed', sla: 99 },
        { name: 'Thu', sla: 98.4 }, { name: 'Fri', sla: 98.6 }
      ],
      table: [
        { id: 'TKT-101', app: 'FinFlow', sev: 'P1', timeToBreach: '12m', status: 'Near Breach' },
        { id: 'TKT-105', app: 'AuthStore', sev: 'P2', timeToBreach: '45m', status: 'Warning' }
      ]
    },
    incidentCommand: {
      kpis: [
        { label: 'Open', value: '154' }, { label: 'Resolved', value: '1,204' },
        { label: 'Sev1', value: '2' }, { label: 'Sev2', value: '8' },
        { label: 'Sev3', value: '144' }, { label: 'Aging >24h', value: '18' }
      ],
      table: [
        { id: 'INC00124', app: 'Nexus', status: 'Assigned', age: '14h', sev: 'P2' },
        { id: 'INC00130', app: 'CoreData', status: 'Work in Progress', age: '22h', sev: 'P3' }
      ]
    }
    // ... other endpoints will be similar, adding enough for UI demonstration
  };

  app.get('/api/operations/summary', (req, res) => res.json(mockOperations.summary));
  app.get('/api/operations/sla-command', (req, res) => res.json(mockOperations.slaCommand));
  app.get('/api/operations/incident-command', (req, res) => res.json(mockOperations.incidentCommand));
  app.get('/api/operations/backlog-management', (req, res) => res.json({
    kpis: [{ label: 'Total', value: '3,450' }, { label: 'Aging >72h', value: '142' }, { label: 'Reduction', value: '12%' }],
    table: [{ app: 'CRM', backlog: 120, risk: 'High' }]
  }));
  app.get('/api/operations/major-incident-center', (req, res) => res.json({
    kpis: [{ label: 'Current MI', value: '1' }, { label: 'MTTR', value: '45m' }],
    timeline: [{ event: 'Bridge Start', time: '14:20' }]
  }));
  app.get('/api/operations/transfer-analytics', (req, res) => res.json({
    kpis: [{ label: 'Rate', value: '14%' }, { label: 'Zero Transfer %', value: '62%' }]
  }));
  app.get('/api/operations/sre-coverage', (req, res) => res.json({
    kpis: [{ label: 'Onboarded', value: '450' }, { label: 'Coverage %', value: '88%' }]
  }));
  app.get('/api/operations/one-shot-intelligence', (req, res) => res.json({
    kpis: [{ label: 'Tickets', value: '1,200' }, { label: 'Reduction %', value: '22%' }]
  }));
  app.get('/api/operations/insights', (req, res) => res.json({
    kpis: [{ label: 'AI Generated', value: '42' }, { label: 'Risk Predictions', value: '8' }]
  }));
  app.get('/api/operations/action-center', (req, res) => res.json({
    kpis: [{ label: 'Open', value: '24' }, { label: 'Overdue', value: '3' }]
  }));

  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Vite middleware
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TiOps Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
