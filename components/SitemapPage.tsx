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
        { label: 'Performance Ads', page: 'service-detail', serviceId: 'performance-ads' },
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

  const defaultColor = "bg-white border-2 border-brandDark/10 text-brandDark hover:border-brandYellow hover:shadow-md";
  const nodeColor = node.color || defaultColor;

  return (
    <li>
      <button 
        onClick={handleClick}
        className={`inline-block px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 shadow-sm relative z-10 ${nodeColor} ${!node.page ? 'cursor-default' : 'cursor-pointer'}`}
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
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark overflow-x-hidden">
      <style>{`
        .tree ul {
          padding-top: 20px; 
          position: relative;
          transition: all 0.5s;
          display: flex;
          justify-content: center;
        }

        .tree li {
          float: left; text-align: center;
          list-style-type: none;
          position: relative;
          padding: 20px 5px 0 5px;
          transition: all 0.5s;
        }

        /* Connectors */
        .tree li::before, .tree li::after {
          content: '';
          position: absolute; top: 0; right: 50%;
          border-top: 1px solid #ccc;
          width: 50%; height: 20px;
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
          width: 0; height: 20px;
        }
      `}</style>

      {/* Header */}
      <section className="bg-brandDark pt-32 pb-10 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Directory</span>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8">
            Sitemap
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Visual map of our ecosystem.
          </p>
        </div>
      </section>

      {/* Tree Diagram */}
      <div className="w-full overflow-x-auto py-20 px-6">
        <div className="tree min-w-max flex justify-center">
          <ul>
            <TreeNode node={treeData} onNavigate={onNavigate} />
          </ul>
        </div>
      </div>

      <Footer onNavigate={onNavigate} onBookAudit={() => onNavigate('contact')} />
    </div>
  );
};