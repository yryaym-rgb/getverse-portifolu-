'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Database, Table, Search, 
  ChevronRight, Users, FileText, BarChart3,
  Settings, Key, Link as LinkIcon, Eye,
  Code, Layers, Grid, List, Filter,
  Copy, Download, Zap, Shield,
  Clock, Server, HardDrive
} from 'lucide-react'

interface TableData {
  columns: string[]
  rows: number
  description: string
  icon: React.ReactNode
  primaryKey?: string
  foreignKeys?: string[]
  indexes?: string[]
  sampleData?: Record<string, any>[]
  size?: string
}

const tables: Record<string, TableData> = {
  users: {
    columns: [
      'id (UUID) 🔑',
      'email (VARCHAR) 📧',
      'name (VARCHAR) 👤',
      'role (ENUM) 🎯',
      'created_at (TIMESTAMP) 📅',
      'last_login (TIMESTAMP) 🕐',
      'is_active (BOOLEAN) ✅'
    ],
    rows: 1247,
    description: 'User accounts and authentication',
    icon: <Users size={16} />,
    primaryKey: 'id',
    foreignKeys: ['role'],
    indexes: ['email', 'created_at'],
    size: '156 MB',
    sampleData: [
      { id: 'uuid-1', email: 'admin@example.com', name: 'Admin User', role: 'admin', created_at: '2024-01-15' },
      { id: 'uuid-2', email: 'user@example.com', name: 'Regular User', role: 'user', created_at: '2024-02-20' }
    ]
  },
  projects: {
    columns: [
      'id (UUID) 🔑',
      'user_id (UUID) 👤',
      'title (VARCHAR) 📝',
      'description (TEXT) 📄',
      'status (ENUM) 📊',
      'created_at (TIMESTAMP) 📅',
      'updated_at (TIMESTAMP) 🔄'
    ],
    rows: 342,
    description: 'Project management and tracking',
    icon: <FileText size={16} />,
    primaryKey: 'id',
    foreignKeys: ['user_id'],
    indexes: ['user_id', 'status', 'created_at'],
    size: '42 MB',
    sampleData: [
      { id: 'uuid-3', user_id: 'uuid-1', title: 'MAONI', status: 'active', created_at: '2024-01-15' },
      { id: 'uuid-4', user_id: 'uuid-2', title: 'ARPTC Tower Map', status: 'active', created_at: '2024-03-22' }
    ]
  },
  analytics: {
    columns: [
      'id (UUID) 🔑',
      'project_id (UUID) 📊',
      'metric (VARCHAR) 📈',
      'value (JSON) 💾',
      'timestamp (TIMESTAMP) 🕐',
      'region (VARCHAR) 🌍'
    ],
    rows: 8923,
    description: 'Analytics and metrics data',
    icon: <BarChart3 size={16} />,
    primaryKey: 'id',
    foreignKeys: ['project_id'],
    indexes: ['project_id', 'metric', 'timestamp'],
    size: '234 MB',
    sampleData: [
      { id: 'uuid-5', project_id: 'uuid-3', metric: 'visitors', value: { count: 457 }, timestamp: '2024-06-10' },
      { id: 'uuid-6', project_id: 'uuid-4', metric: 'towers', value: { total: 3500 }, timestamp: '2024-03-22' }
    ]
  },
  settings: {
    columns: [
      'key (VARCHAR) 🔑',
      'value (JSON) 💾',
      'updated_at (TIMESTAMP) 🔄'
    ],
    rows: 56,
    description: 'Application settings and configuration',
    icon: <Settings size={16} />,
    primaryKey: 'key',
    foreignKeys: [],
    indexes: ['key'],
    size: '2.1 MB',
    sampleData: [
      { key: 'app_name', value: 'AI Engineering Command Center', updated_at: '2024-01-01' },
      { key: 'maintenance_mode', value: false, updated_at: '2024-06-01' }
    ]
  }
}

export default function EngineeringDatabasePage() {
  const [selectedTable, setSelectedTable] = useState('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'columns' | 'sample'>('columns')
  const [showRelations, setShowRelations] = useState(false)

  const currentTable = tables[selectedTable as keyof typeof tables]

  const filteredColumns = currentTable.columns.filter(col => 
    col.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getColumnType = (col: string) => {
    const match = col.match(/\(([^)]+)\)/)
    return match ? match[1] : 'unknown'
  }

  const getColumnName = (col: string) => {
    return col.split('(')[0].trim()
  }

  const getColumnIcon = (col: string) => {
    if (col.includes('🔑')) return '🔑'
    if (col.includes('📧')) return '📧'
    if (col.includes('👤')) return '👤'
    if (col.includes('📝')) return '📝'
    if (col.includes('📄')) return '📄'
    if (col.includes('📊')) return '📊'
    if (col.includes('📈')) return '📈'
    if (col.includes('📅')) return '📅'
    if (col.includes('🕐')) return '🕐'
    if (col.includes('✅')) return '✅'
    if (col.includes('🌍')) return '🌍'
    if (col.includes('💾')) return '💾'
    if (col.includes('🔄')) return '🔄'
    return '📋'
  }

  const getColumnColor = (col: string) => {
    const type = getColumnType(col)
    switch (type) {
      case 'UUID': return 'text-[#00f0ff]'
      case 'VARCHAR': return 'text-[#7b2ffc]'
      case 'TEXT': return 'text-[#ff6b35]'
      case 'ENUM': return 'text-yellow-400'
      case 'TIMESTAMP': return 'text-emerald-400'
      case 'BOOLEAN': return 'text-pink-400'
      case 'JSON': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const databaseStats = [
    { label: 'Total Tables', value: Object.keys(tables).length, icon: <Database size={14} />, color: '#00f0ff' },
    { label: 'Total Rows', value: Object.values(tables).reduce((acc, t) => acc + t.rows, 0).toLocaleString(), icon: <HardDrive size={14} />, color: '#7b2ffc' },
    { label: 'Total Size', value: '434 MB', icon: <Server size={14} />, color: '#ff6b35' },
    { label: 'Indexes', value: Object.values(tables).reduce((acc, t) => acc + (t.indexes?.length || 0), 0), icon: <Zap size={14} />, color: '#00f0ff' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/engineering" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Engineering
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Database size={14} />
            Database Explorer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Live <span className="gradient-text">Database</span> Explorer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Explore the schema, relationships, and data structures of PostgreSQL v15.
          </p>
        </div>

        {/* Database Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {databaseStats.map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl text-center border border-white/5">
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 glass p-4 rounded-2xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database size={14} />
              Tables
            </h4>
            <div className="space-y-1">
              {Object.keys(tables).map((table) => (
                <button
                  key={table}
                  onClick={() => setSelectedTable(table)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    selectedTable === table
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tables[table].icon}
                  {table}
                  <span className="ml-auto text-xs text-gray-500">{tables[table].rows}</span>
                </button>
              ))}
            </div>

            {/* Table Stats */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Primary Key:</span>
                  <span className="text-[#00f0ff]">{currentTable.primaryKey || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Foreign Keys:</span>
                  <span className="text-[#7b2ffc]">{currentTable.foreignKeys?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Indexes:</span>
                  <span className="text-[#ff6b35]">{currentTable.indexes?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-gray-400">{currentTable.size || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 glass p-6 rounded-2xl border border-white/5">
            {/* Table Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  {currentTable.icon}
                  <h4 className="text-xl font-bold text-white">{selectedTable}</h4>
                  <span className="text-xs text-gray-500">({currentTable.rows.toLocaleString()} rows)</span>
                </div>
                <p className="text-gray-400 text-sm">{currentTable.description}</p>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('columns')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    viewMode === 'columns'
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid size={12} className="inline mr-1" />
                  Columns
                </button>
                <button
                  onClick={() => setViewMode('sample')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    viewMode === 'sample'
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={12} className="inline mr-1" />
                  Sample Data
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search columns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-gray-700 text-white text-sm placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
              />
            </div>

            {/* Columns View */}
            {viewMode === 'columns' && (
              <div className="space-y-1.5">
                {filteredColumns.map((col, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-[#00f0ff]/20 transition group">
                    <span className="text-lg">{getColumnIcon(col)}</span>
                    <span className={`text-sm font-mono ${getColumnColor(col)}`}>
                      {getColumnName(col)}
                    </span>
                    <span className="text-xs text-gray-500">({getColumnType(col)})</span>
                    {col.includes('🔑') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">PK</span>
                    )}
                    {currentTable.foreignKeys?.includes(getColumnName(col)) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7b2ffc]/20 text-[#7b2ffc]">FK</span>
                    )}
                    {currentTable.indexes?.includes(getColumnName(col)) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff]">IDX</span>
                    )}
                    <button className="ml-auto text-gray-500 hover:text-white transition opacity-0 group-hover:opacity-100">
                      <Copy size={12} />
                    </button>
                  </div>
                ))}
                {filteredColumns.length === 0 && (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No columns found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            {/* Sample Data View */}
            {viewMode === 'sample' && currentTable.sampleData && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      {Object.keys(currentTable.sampleData[0]).map((key) => (
                        <th key={key} className="text-left py-2 px-3 text-gray-400 font-medium text-xs uppercase tracking-wider">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTable.sampleData.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="py-2 px-3 text-gray-300 font-mono text-xs">
                            {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Relations */}
            <div className="mt-4 p-3 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/10 flex flex-wrap items-center gap-4 text-xs">
              <span className="text-gray-400">🔗 Relations:</span>
              {currentTable.foreignKeys && currentTable.foreignKeys.length > 0 ? (
                currentTable.foreignKeys.map((fk, i) => (
                  <span key={i} className="text-[#00f0ff]">{fk} → {fk.replace('_id', 's')}</span>
                ))
              ) : (
                <span className="text-gray-500">No foreign keys</span>
              )}
              <span className="ml-auto text-gray-500">PostgreSQL • v15 • {currentTable.rows.toLocaleString()} rows</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}