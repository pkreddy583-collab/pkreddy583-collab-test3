/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { OperationsSubNav } from './components/OperationsSubNav';
import OperationsHome from './pages/OperationsHome';
import ReliabilitySpace from './pages/ReliabilitySpace';
import AIAutomation from './pages/AIAutomation';
import ExecutiveReport from './pages/ExecutiveReport';
import { OperationsDrillPage } from './components/OperationsDrillPage';
import { cn } from './lib/utils';

import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const location = useLocation();
  const { themeColor, setThemeColor, isDarkMode } = useTheme();
  const isOperationsPath = location.pathname.startsWith('/operations');

  // Update base theme when route changes
  React.useEffect(() => {
    if (isDarkMode) {
      setThemeColor('#020617'); // Unified dark mode background
    } else {
      if (location.pathname.startsWith('/operations')) {
        setThemeColor('#F0F9FF');
      } else if (location.pathname.startsWith('/reliability')) {
        setThemeColor('#F0FDFA');
      } else if (location.pathname.startsWith('/ai-automation')) {
        setThemeColor('#FAF5FF');
      } else if (location.pathname.startsWith('/governance')) {
        setThemeColor('#F0FDF4');
      } else {
        setThemeColor('#F8FAFC');
      }
    }
  }, [location.pathname, setThemeColor, isDarkMode]);

  return (
    <div 
      className={cn(
        "min-h-screen w-full font-sans selection:bg-blue-100 transition-all duration-700 overflow-x-hidden",
        isDarkMode ? "text-white selection:bg-blue-900" : "text-slate-900"
      )}
      style={{ backgroundColor: themeColor }}
    >
      <Header />
      
      {isOperationsPath && <OperationsSubNav />}

      <main className="w-full max-w-[1600px] mx-auto px-8 py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/operations" replace />} />
          
          <Route path="/operations" element={<OperationsHome />} />
          <Route path="/operations/sla-command" element={
            <OperationsDrillPage 
              title="SLA Command" 
              endpoint="/api/operations/sla-command" 
              purpose="Track contractual SLA performance including acknowledgement and resolution rates across all towers."
            />
          } />
          <Route path="/operations/incident-command" element={
            <OperationsDrillPage 
              title="Incident Command" 
              endpoint="/api/operations/incident-command" 
              purpose="Track live incident operations, monitoring severity distribution and aging risk in real-time."
            />
          } />
          <Route path="/operations/backlog-management" element={
            <OperationsDrillPage 
              title="Backlog Management" 
              endpoint="/api/operations/backlog-management" 
              purpose="Track backlog volume and aging risk, identifying applications with critical accumulation."
            />
          } />
          <Route path="/operations/major-incident-center" element={
            <OperationsDrillPage 
              title="Major Incident Center" 
              endpoint="/api/operations/major-incident-center" 
              purpose="Track major incidents and recovery stats, including MTTR and Bridge duration metrics."
            />
          } />
          <Route path="/operations/transfer-analytics" element={
            <OperationsDrillPage 
              title="Transfer Analytics" 
              endpoint="/api/operations/transfer-analytics" 
              purpose="Monitor SR group transfers and reduction progress to optimize routing efficiency."
            />
          } />
          <Route path="/operations/sre-coverage" element={
            <OperationsDrillPage 
              title="SRE Coverage" 
              endpoint="/api/operations/sre-coverage" 
              purpose="Track applications onboarded into SRE and identify priority gaps in coverage."
            />
          } />
          <Route path="/operations/one-shot-intelligence" element={
            <OperationsDrillPage 
              title="One-Shot Intelligence" 
              endpoint="/api/operations/one-shot-intelligence" 
              purpose="Track one-shot tickets and identify automation candidates for demand reduction."
            />
          } />
          <Route path="/operations/insights" element={
            <OperationsDrillPage 
              title="Operations Insights" 
              endpoint="/api/operations/insights" 
              purpose="Display AI-generated operational intelligence and predicted SLA/Backlog risks."
            />
          } />
          <Route path="/operations/action-center" element={
            <OperationsDrillPage 
              title="Action Center" 
              endpoint="/api/operations/action-center" 
              purpose="Convert insights into trackable actions with owner tracking and impact assessment."
            />
          } />

          <Route path="/executive-report" element={<ExecutiveReport />} />

          <Route path="/reliability" element={<ReliabilitySpace />} />
          <Route path="/ai-automation" element={<AIAutomation />} />
          <Route path="/governance" element={<div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest">Policy Engine Node Offline</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
