module.exports = {
  mySidebar: [
    {
      type: 'link',
      label: 'OpCon MFT',
      href: '/',
    },
    'release-notes',
    'overview',
    {
      type: 'category',
      label: 'MFT Agent',
      collapsed: true,
      link: { type: 'doc', id: 'agent-overview' },
      items: [
        'agent-system-requirements',
        'agent-installation',
        'agent-endpoint-definitions',
        'agent-encryption-definitions',
        'agent-group-definitions',
        'agent-task-definitions',
      ],
    },
    {
      type: 'category',
      label: 'MFT Server',
      collapsed: true,
      link: { type: 'doc', id: 'server-overview' },
      items: [
        'server-system-requirements',
        'server-installation',
        'server-triggers',
        'server-file-sharing',
        'server-virtual-folders',
      ],
    },
    'architecture',
    'security',
    'trouble-shooting',
    'faqs',
  ],
};
