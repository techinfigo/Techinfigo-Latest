import React from 'react';
import { Footer } from './Footer';

interface SitemapPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

interface TreeNodeData {
  label: string;
  page?: string;
  serviceId?: string;
  children?: TreeNodeData[];
  color?: string;
}

const treeData: TreeNodeData = {
  label: 'HomePage',
  page: 'home',
  color: 'bg-brandDark text-white hover:bg-brandDark/90',
  children: [
    {
      label: 'Services',
      page: 'services',
      color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80',
      children: [
        { label: 'Ads', page: 'service-detail', serviceId: 'performance-ads' },
        { label: 'CRO', page: 'service-detail', serviceId: 'cro' },
        { label: 'SEO', page: 'service-detail', serviceId: 'seo' },
        { label: 'Retention', page: 'service-detail', serviceId: 'retention' },
        { label: 'Automation', page: 'service-detail', serviceId: 'automation' },
        { label: 'Creative', page: 'service-detail', serviceId: 'creative' },
        { label: 'Influencer', page: 'service-detail', serviceId: 'influencer' },
      ]
    },
    { label: 'About', page: 'about', color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80' },
    { label: 'System', page: 'system', color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80' },
    { label: 'Careers', page: 'careers', color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80' },
    { label: 'Contact', page: 'contact', color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80' },
    {
      label: 'Legal',
      color: 'bg-brandYellow text-brandDark hover:bg-brandYellow/80',
      children: [
        { label: 'Privacy', page: 'privacy' },
        { label: 'Terms', page: 'terms' },
      ]
    }
  ]
};

const TreeNode: React.FC<{ node: TreeNodeData; onNavigate: (page: string, serviceId?: string) => void }> = ({ node, onNavigate }) => {
  const handleClick = () => {
    if (node.page) {
      onNavigate(node.page, node.serviceId);
    }
  };

  const defaultColor = "bg-white border border-brandDark/10 text-brandDark hover:border-brandYellow hover:shadow-sm";
  const nodeColor = node.color || defaultColor;

  return (
    <li>
      <button 
        onClick={handleClick}
        className={`inline-block px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all duration-300 shadow-sm relative z-10 whitespace-nowrap ${nodeColor} ${!node.page ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {node.label}
      </button>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark overflow-hidden flex flex-col">
      <style>{`
        .tree ul {
          padding-top: 15px; 
          position: relative;
          transition: all 0.5s;
          display: flex;
          justify-content: center;
        }

        .tree li {
          float: left; text-align: center;
          list-style-type: none;
          position: relative;
          padding: 15px 4px 0 4px;
          transition: all 0.5s;
        }

        /* Connectors */
        .tree li::before, .tree li::after {
          content: '';
          position: absolute; top: 0; right: 50%;
          border-top: 1px solid #ccc;
          width: 50%; height: 15px;
        }
        .tree li::after {
          right: auto; left: 50%;
          border-left: 1px solid #ccc;
        }

        /* Remove connectors from single children */
        .tree li:only-child::after, .tree li:only-child::before {
          display: none;
        }
        .tree li:only-child { padding-top: 0; }

        /* Remove left connector from first child and right connector from last child */
        .tree li:first-child::before, .tree li:last-child::after {
          border: 0 none;
        }
        
        /* Add back vertical connector to last nodes */
        .tree li:last-child::before {
          border-right: 1px solid #ccc;
          border-radius: 0 5px 0 0;
        }
        .tree li:first-child::after {
          border-radius: 5px 0 0 0;
        }

        /* Downward connectors from parents */
        .tree ul ul::before {
          content: '';
          position: absolute; top: 0; left: 50%;
          border-left: 1px solid #ccc;
          width: 0; height: 15px;
        }
      `}</style>

      {/* Compact Header */}
      <section className="bg-brandDark py-4 px-6 relative shrink-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-white tracking-tighter">
              Sitemap
            </h1>
            <span className="text-brandYellow text-[10px] font-bold tracking-[0.2em] uppercase">Directory</span>
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="text-white/60 hover:text-brandYellow text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Close
          </button>
        </div>
      </section>

      {/* Tree Diagram Container */}
      <div className="flex-grow flex items-center justify-center overflow-auto p-4 bg-brandBg">
        <div className="tree transform scale-90 origin-top-center">
          <ul>
            <TreeNode node={treeData} onNavigate={onNavigate} />
          </ul>
        </div>
      </div>
    </div>
  );
};