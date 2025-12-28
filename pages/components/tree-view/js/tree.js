        const treeData = [
            {
                id: 'projects',
                label: 'Projects',
                icon: '📂',
                children: [
                    {
                        id: 'web-app',
                        label: 'Web Application',
                        icon: '🌐',
                        children: [
                            {
                                id: 'src',
                                label: 'src',
                                icon: '📁',
                                children: [
                                    { id: 'components', label: 'components', icon: '📁', badge: 12 },
                                    { id: 'styles', label: 'styles', icon: '📁', badge: 5 },
                                    { id: 'utils', label: 'utils', icon: '📁', badge: 8 },
                                    { id: 'app.js', label: 'app.js', icon: '📄' },
                                    { id: 'index.html', label: 'index.html', icon: '📄' }
                                ]
                            },
                            {
                                id: 'public',
                                label: 'public',
                                icon: '📁',
                                children: [
                                    { id: 'images', label: 'images', icon: '🖼️', badge: 24 },
                                    { id: 'fonts', label: 'fonts', icon: '🔤' }
                                ]
                            },
                            { id: 'package.json', label: 'package.json', icon: '📦' },
                            { id: 'readme.md', label: 'README.md', icon: '📝' }
                        ]
                    },
                    {
                        id: 'mobile-app',
                        label: 'Mobile Application',
                        icon: '📱',
                        children: [
                            { id: 'android', label: 'android', icon: '🤖' },
                            { id: 'ios', label: 'ios', icon: '🍎' },
                            { id: 'shared', label: 'shared', icon: '🔄', badge: 3 }
                        ]
                    }
                ]
            },
            {
                id: 'documents',
                label: 'Documents',
                icon: '📄',
                children: [
                    { id: 'specs', label: 'Specifications', icon: '📋', badge: 7 },
                    { id: 'designs', label: 'Designs', icon: '🎨', badge: 15 },
                    { id: 'notes', label: 'Meeting Notes', icon: '📝', badge: 23 }
                ]
            },
            {
                id: 'resources',
                label: 'Resources',
                icon: '💼',
                children: [
                    { id: 'tutorials', label: 'Tutorials', icon: '📚' },
                    { id: 'references', label: 'References', icon: '🔗' },
                    { id: 'tools', label: 'Tools', icon: '🛠️', badge: 5 }
                ]
            },
            {
                id: 'settings',
                label: 'Settings',
                icon: '⚙️',
                children: [
                    { id: 'general', label: 'General', icon: '🔧' },
                    { id: 'security', label: 'Security', icon: '🔒' },
                    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 2 }
                ]
            }
        ];

        // ============================================
        // TREE RENDERING FUNCTIONS
        // ============================================
        
        let activeNodeId = null;
        const expandedNodes = new Set();

        function createTreeNode(node, level = 0) {
            const li = document.createElement('li');
            li.className = 'tree-node';
            li.dataset.nodeId = node.id;

            const hasChildren = node.children && node.children.length > 0;
            const isExpanded = expandedNodes.has(node.id);

            const item = document.createElement('div');
            item.className = 'tree-item';
            if (activeNodeId === node.id) {
                item.classList.add('active');
            }

            // Toggle button
            const toggle = document.createElement('span');
            toggle.className = `tree-toggle ${isExpanded ? 'expanded' : ''} ${!hasChildren ? 'empty' : ''}`;
            toggle.innerHTML = '▶';
            toggle.onclick = (e) => {
                e.stopPropagation();
                toggleNode(node.id);
            };

            // Icon
            const icon = document.createElement('span');
            icon.className = 'tree-icon';
            icon.innerHTML = node.icon || '📄';

            // Label
            const label = document.createElement('span');
            label.className = 'tree-label';
            label.textContent = node.label;

            // Badge (optional)
            let badge = null;
            if (node.badge) {
                badge = document.createElement('span');
                badge.className = 'tree-badge';
                badge.textContent = node.badge;
            }

            item.appendChild(toggle);
            item.appendChild(icon);
            item.appendChild(label);
            if (badge) item.appendChild(badge);

            item.onclick = (e) => {
                e.stopPropagation();
                selectNode(node.id, node);
            };

            li.appendChild(item);

            // Children
            if (hasChildren) {
                const childrenUl = document.createElement('ul');
                childrenUl.className = `tree-children ${isExpanded ? 'expanded' : ''}`;
                
                node.children.forEach(child => {
                    childrenUl.appendChild(createTreeNode(child, level + 1));
                });

                li.appendChild(childrenUl);
            }

            return li;
        }

        function renderTree() {
            const container = document.getElementById('treeview');
            container.innerHTML = '';
            
            treeData.forEach(node => {
                container.appendChild(createTreeNode(node));
            });
        }

        function toggleNode(nodeId) {
            if (expandedNodes.has(nodeId)) {
                expandedNodes.delete(nodeId);
            } else {
                expandedNodes.add(nodeId);
            }
            renderTree();
        }

        function selectNode(nodeId, node) {
            activeNodeId = nodeId;
            renderTree();
            console.log('Selected node:', node);
            
            // Update main content title based on selection
            const contentTitle = document.querySelector('.content-title');
            contentTitle.textContent = `Selected: ${node.label}`;
        }

        // ============================================
        // SIDEBAR TOGGLE (MOBILE)
        // ============================================
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.querySelector('.sidebar-toggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });

        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            renderTree();
            
            // Optionally expand some nodes by default
            expandedNodes.add('projects');
            expandedNodes.add('web-app');
            renderTree();
        });

        // ============================================
        // UTILITY FUNCTIONS (BONUS)
        // ============================================
        
        // Function to find a node by ID
        function findNode(nodes, targetId) {
            for (const node of nodes) {
                if (node.id === targetId) return node;
                if (node.children) {
                    const found = findNode(node.children, targetId);
                    if (found) return found;
                }
            }
            return null;
        }

        // Function to expand all parent nodes of a specific node
        function expandToNode(nodeId) {
            function findPath(nodes, targetId, path = []) {
                for (const node of nodes) {
                    const currentPath = [...path, node.id];
                    if (node.id === targetId) return currentPath;
                    if (node.children) {
                        const found = findPath(node.children, targetId, currentPath);
                        if (found) return found;
                    }
                }
                return null;
            }

            const path = findPath(treeData, nodeId);
            if (path) {
                path.forEach(id => expandedNodes.add(id));
                activeNodeId = nodeId;
                renderTree();
            }
        }

        // Example: Expand to a specific file
        // expandToNode('app.js');