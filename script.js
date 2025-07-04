// Script principal para o relatório financeiro

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initializeDate();
    initializeCharts();
    initializePrintFunction();
    initializeAnimations();
    initializeTooltips();
    initializeResponsiveTables();
});

// Função para inicializar a data atual
function initializeDate() {
    const currentDate = new Date().toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;
}

// Função para inicializar gráficos
function initializeCharts() {
    // Gráfico de pizza para composição da carteira
    const portfolioCtx = document.getElementById('portfolioChart');
    if (portfolioCtx) {
        new Chart(portfolioCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ações Brasileiras e Internacionais', 'Renda Fixa', 'Fundos Imobiliários'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        '#3b82f6', // Azul
                        '#10b981', // Verde
                        '#8b5cf6'  // Roxo
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    // Gráfico de linha para performance comparativa
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Carteira',
                        data: [1.2, 1.37, 2.59, 4.81, 6.43, 8.4],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'CDI',
                        data: [1.07, 2.14, 3.21, 4.28, 5.35, 6.4],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'IBOVESPA',
                        data: [2.5, 4.8, 7.2, 9.5, 12.8, 15.4],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }
}

// Função para inicializar funcionalidade de impressão
function initializePrintFunction() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}



// Função para inicializar animações
function initializeAnimations() {
    // Adicionar animações de fade-in aos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os cards e seções
    document.querySelectorAll('.bg-white.rounded-lg').forEach(el => {
        observer.observe(el);
    });
}

// Função para inicializar tooltips
function initializeTooltips() {
    // Adicionar tooltips aos elementos com data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('tooltip-active');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('tooltip-active');
        });
    });
}

// Função para inicializar tabelas responsivas
function initializeResponsiveTables() {
    const tables = document.querySelectorAll('.table-container');
    
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.overflowX = 'auto';
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}

// Função para formatar valores monetários
function formatCurrency(value, currency = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    }).format(value);
}

// Função para formatar percentuais
function formatPercentage(value, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value / 100);
}

// Função para calcular variação percentual
function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
}

// Função para aplicar classes de cor baseadas em valores
function applyValueColor(element, value, threshold = 0) {
    if (value > threshold) {
        element.classList.add('positive-change');
    } else if (value < threshold) {
        element.classList.add('negative-change');
    } else {
        element.classList.add('neutral-change');
    }
}

// Função para criar badges dinâmicos
function createBadge(text, type = 'info') {
    const badge = document.createElement('span');
    badge.className = `badge badge-${type}`;
    badge.textContent = text;
    return badge;
}

// Função para criar alertas dinâmicos
function createAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;
    return alert;
}

// Função para atualizar métricas em tempo real
function updateMetrics() {
    // Exemplo de atualização de métricas
    const metrics = {
        'retorno-acumulado': 8.62,
        'sharpe-ratio': 1.698,
        'volatilidade': 2.45
    };

    Object.keys(metrics).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = formatPercentage(metrics[key]);
        }
    });
}

// Função para exportar dados
function exportData(format = 'csv') {
    const data = {
        periodo: 'Janeiro a Junho de 2025',
        retornoAcumulado: 8.62,
        sharpeRatio: 1.698,
        volatilidade: 2.45,
        composicao: {
            acoes: 45,
            rendaFixa: 30,
            fiis: 25
        }
    };

    if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        downloadFile(blob, 'relatorio-financeiro.json');
    } else if (format === 'csv') {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        downloadFile(blob, 'relatorio-financeiro.csv');
    }
}

// Função auxiliar para download de arquivos
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Função para converter dados para CSV
function convertToCSV(data) {
    const headers = ['Métrica', 'Valor'];
    const rows = [
        ['Período', data.periodo],
        ['Retorno Acumulado (%)', data.retornoAcumulado],
        ['Índice de Sharpe', data.sharpeRatio],
        ['Volatilidade (%)', data.volatilidade],
        ['Composição - Ações (%)', data.composicao.acoes],
        ['Composição - Renda Fixa (%)', data.composicao.rendaFixa],
        ['Composição - FIIs (%)', data.composicao.fiis]
    ];

    return [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
}

// Função para filtrar dados da tabela
function filterTable(tableId, searchTerm) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none';
    });
}

// Função para ordenar tabela
function sortTable(tableId, columnIndex, type = 'string') {
    const table = document.getElementById(tableId);
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;

        if (type === 'number') {
            return parseFloat(aValue) - parseFloat(bValue);
        } else if (type === 'percentage') {
            return parseFloat(aValue.replace('%', '')) - parseFloat(bValue.replace('%', ''));
        } else {
            return aValue.localeCompare(bValue, 'pt-BR');
        }
    });

    // Limpar e reordenar
    rows.forEach(row => tbody.appendChild(row));
}

// Função para toggle de seções
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('hidden');
    }
}

// Função para scroll suave
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event listeners globais
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P para imprimir
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + F para buscar
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        // Implementar busca se necessário
    }
});

// Função para modo escuro (se implementado)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência de modo escuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Função para acessibilidade
function increaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 2) + 'px';
}

function decreaseFontSize() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize - 2) + 'px';
}

// Função para resetar tamanho da fonte
function resetFontSize() {
    document.body.style.fontSize = '';
}

// Exportar funções para uso global
window.FinancialReport = {
    formatCurrency,
    formatPercentage,
    calculatePercentageChange,
    applyValueColor,
    createBadge,
    createAlert,
    updateMetrics,
    exportData,
    filterTable,
    sortTable,
    toggleSection,
    smoothScrollTo,
    toggleDarkMode,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
}; 